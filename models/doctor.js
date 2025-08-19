
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: String,
  yearsOfExperience: Number,
  availableSlots: [String]  
});

module.exports = mongoose.model("Doctor", doctorSchema);

