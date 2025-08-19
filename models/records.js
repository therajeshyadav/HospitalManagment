const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  data: String,
  status: { type: String, default: "stable" },
  prescriptions: [
    {
      medication: String,
      dosage: String,
      createdAt: { type: Date, default: Date.now },
    }
  ],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Record", recordSchema);
