const mongoose = require("mongoose");

const activationSchema = new mongoose.Schema({
  websiteinfo: String,
  industrytype: String,
  areaofwork: String,
  registeredoffice: String,
  companyregno: String,
  currentlocation: String,
  locationofwork: String,
  employeecount: Number,
  internshipposting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posting",
  },
  compdescription : String,
  email:String
});

const Activation = mongoose.model("activationdata", activationSchema);

module.exports = Activation;
