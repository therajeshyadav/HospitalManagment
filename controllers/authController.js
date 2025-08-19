//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const rolePermissions = {
  Patient: ["view_records"],
  Nurse: ["view_records", "update_status"],
  Doctor: ["view_records", "update_status", "prescribe_medication"],
  Administrator: ["manage_users"],
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      sub: user._id,
      role: user.role,
      permissions: rolePermissions[user.role],
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ access_token: token, expires_in: 3600 });
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
};

exports.postSignup = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const userExist = await User.findOne({ username });

    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    // const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.postLogout = async (req, res) => {
 
//   res.status(200).json({ message: "Logged out successfully" });
// };
