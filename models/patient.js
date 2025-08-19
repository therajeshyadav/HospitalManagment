const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref: 'User'},
    age :  Number,
    gender :  String,
    address :  String,
    medicalhistory :[String]
})

module.exports = mongoose.model("Patient", patientSchema);