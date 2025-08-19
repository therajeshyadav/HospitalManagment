const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddelware");
const rbac = require("../middleware/rbacMiddleware");
const {
  getRecords,
  updateStatus,
  addPrescription,
} = require("../controllers/recordController");

router.get("/:patient_id", auth,rbac(["Patient", "Nurse","Doctor"], ["view_Records"]), getRecords);

router.patch("/:patient_id/status", auth,rbac([ "Nurse","Doctor"], ["update_status"]), updateStatus);

router.post("/patient_id/prescription", auth,rbac(["Doctor"], ["add_prescription"]), addPrescription);


module.exports = router;