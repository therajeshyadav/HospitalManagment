const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth"); // Signup & Login
const userRoutes = require("./routes/user"); // User Profile
const dashboard = require("./routes/dashboard"); //  protected route
const recordRoute = require("./routes/record"); // Record Route


// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();
app.use(cookieParser());

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes); // POST /signup, POST /login
app.use("/users", userRoutes); // GET /dashboard (Admin only)
app.use("/records", recordRoute); // GET /dashboard (Admin only)

// Root route
app.get("/", (req, res) => {
  res.send("Hospital Management API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
