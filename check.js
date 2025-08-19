const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json());

const PORT = 5000;
const JWT_SECRET = "myverysecretkey";
const DB_URI = "mongodb://127.0.0.1:27017/Hospital";

// Role permissions
const ROLE_PERMISSIONS = {
  Patient: ["view_records"],
  Nurse: ["view_records", "update_status"],
  Doctor: ["view_records", "update_status", "prescribe_medication"],
  Administrator: ["manage_users"]
};

// MongoDB schemas
const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  role: { type: String, enum: ["Patient", "Nurse", "Doctor", "Administrator"] },
});

const recordSchema = new mongoose.Schema({
  patientId: mongoose.Schema.Types.ObjectId,
  data: Object,
  status: String,
  prescriptions: [{ medication: String, dosage: String }],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Record = mongoose.model("Record", recordSchema);

// Middleware: JWT auth
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Missing token");

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).send("Invalid token");
  }
}

function authorize(roles, permission) {
  return (req, res, next) => {
    const { role, permissions } = req.user;
    if (!roles.includes(role)) return res.status(403).send("Access denied");
    if (permission && !permissions.includes(permission)) return res.status(403).send("Permission denied");
    next();
  };
}

// Public Signup (Patient)
app.post("/auth/signup", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).send("Username already exists");

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, passwordHash, role: "Patient" });
  await newUser.save();

  res.status(201).send("Signup successful. You can now login.");
});

// Login
app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).send("User not found");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).send("Invalid password");

  const token = jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role]
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ access_token: token, expires_in: 3600 });
});

// Admin-only: Create user (Doctor/Nurse/Admin)
app.post(
  "/users",
  authenticate,
  authorize(["Administrator"], "manage_users"),
  async (req, res) => {
    const { username, password, role } = req.body;
    if (!["Patient", "Nurse", "Doctor", "Administrator"].includes(role)) {
      return res.status(400).send("Invalid role");
    }

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).send("Username already exists");

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash, role });
    await newUser.save();

    res.status(201).send("User created successfully");
  }
);

// View medical records
app.get(
  "/records/:patient_id",
  authenticate,
  authorize(["Patient", "Nurse", "Doctor"], "view_records"),
  async (req, res) => {
    const { patient_id } = req.params;
    if (req.user.role === "Patient" && req.user.sub !== patient_id) {
      return res.status(403).send("Access denied to other patients' records");
    }

    const records = await Record.find({ patientId: patient_id });
    res.json({ patient_id, records });
  }
);

// Update patient status
app.patch(
  "/records/:patient_id/status",
  authenticate,
  authorize(["Nurse", "Doctor"], "update_status"),
  async (req, res) => {
    const { status } = req.body;
    await Record.updateMany({ patientId: req.params.patient_id }, { status });
    res.sendStatus(204);
  }
);

// Prescribe medication
app.post(
  "/records/:patient_id/prescriptions",
  authenticate,
  authorize(["Doctor"], "prescribe_medication"),
  async (req, res) => {
    const { medication, dosage } = req.body;
    const record = await Record.findOne({ patientId: req.params.patient_id });
    if (!record) return res.status(404).send("Record not found");

    record.prescriptions.push({ medication, dosage });
    await record.save();
    res.sendStatus(201);
  }
);

// Auto-create admin (once)
const seedAdmin = async () => {
  const exists = await User.findOne({ username: "admin" });
  if (!exists) {
    const hash = await bcrypt.hash("admin123", 10);
    const admin = new User({ username: "admin", passwordHash: hash, role: "Administrator" });
    await admin.save();
    console.log("🔐 Admin created => username: admin | password: admin123");
  }
};

// Connect DB & start server
mongoose.connect(DB_URI).then(async () => {
  console.log("✅ MongoDB Connected");
  await seedAdmin();
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
});
