
const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignedWard: String
});

module.exports = mongoose.model("Nurse", nurseSchema);
