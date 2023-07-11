const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  companyspocemail: String,
  password: String,
  confirmPassword: String,
  companyname: String,
  companyspocname: String,
  companyspocphone: Number,
  logo: String,
  deactivate: {
    type: String,
    default: "YES",
  },
  loggedin : {
    type: String,
    default: "NO",
  },
  count : {
    type: Number,
    default: 0,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
  }
  next();
});

//token genetation

userSchema.methods.generateAuthToken = async function () {
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

const User = mongoose.model("users", userSchema);
module.exports = User;
