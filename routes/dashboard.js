// routes/dashboard.js (or add to auth.js if you're keeping all auth-related things there)
const express = require("express");
// const protect = require("../middleware/protect");
const rbac = require("../middleware/rbacMiddleware");

const router = express.Router();

router.get("/dashboard", rbac(), (req, res) => {
  const { role } = req.user;

  if (role === "Administrator") {
    return res.json({ message: "Welcome Admin, here's your dashboard" });
  } else if (role === "Doctor") {
    return res.json({ message: "Welcome Doctor, here are your appointments" });
  } else if (role === "Nurse") {
    return res.json({ message: "Welcome Nurse, here are your tasks" });
  } else if (role === "Patient") {
    return res.json({ message: "Welcome Patient, here is your health data" });
  } else {
    return res.status(403).json({ message: "Unauthorized role" });
  }
});

module.exports = router;
