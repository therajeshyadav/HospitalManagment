const express = require("express");
const router = express.Router();
const {createUser} = require("../controllers/userController");
const auth = require("../middleware/authMiddelware");
const rbac = require("../middleware/rbacMiddleware");

router.post("/", auth, rbac(["Administrator"], ["manage_users"]), createUser);
 module.exports = router;