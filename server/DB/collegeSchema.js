const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const collegeSchema = new mongoose.Schema({
  collegespocemail: String,
  password: String,
  confirmPassword: String,
  collegename: String,
  collegeaddress: String,
  collegespocname: String,
  collegespocphone: Number,
  collegeregid: String,
  degreeoffered: String,
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

collegeSchema.pre("save", async function (next) {
  console.log("hiiiiiiiiiiiii");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
  }
  next();
});

collegeSchema.methods.generateAuthToken = async function () {
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

const College = mongoose.model("collegeuser", collegeSchema);

module.exports = College;
