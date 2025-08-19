const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username : {type : String, unique: true, required: true},
    password : {type : String , required : true},
    role : {
        type : String,
        enum : ['Doctor', 'Patient','Nurse', 'Administrator'],
        required : true
    },
    Permissions : [String],
    createdAt : {type : Date, default : Date.now },

})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.comparePassword =  function(plainpassword) {
    return bcrypt.compare(plainpassword, this.password);
}






module.exports = mongoose.model("User", userSchema);
