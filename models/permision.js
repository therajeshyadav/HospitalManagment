const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['Doctor', 'Patient', 'Nurse', 'Administrator']
  },
  permissions: {
    type: [String], // e.g., ["view:records", "edit:records"]
    default: []
  }
});

module.exports = mongoose.model('Permission', permissionSchema);
