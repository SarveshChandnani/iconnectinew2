const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// adminSchema.pre('save' , async function(next){
//     console.log("hiiiiiiiiiiiii");
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 12);
//         this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
//     }
//     next();
// });

//token genetation

adminSchema.methods.generateAuthToken = async function () {
  console.log(this._id);
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
