
const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  diagnosis: String,
  treatment: String,
  date: { type: Date, default: Date.now },
  comments: String
});

module.exports = mongoose.model("MedicalRecord", recordSchema);
