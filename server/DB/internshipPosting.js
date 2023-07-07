const mongoose = require('mongoose');

const postingSchema = new mongoose.Schema({
    areaofwork: String,
    startdate:String,
    enddate:String,
    stipend:String,
    hoursweek:Number,
    locationofwork : String,
    typeofengagement:String,
    vacancy:Number,
    userID: String,
    uniqueID:String,
    skills:String,
    jobdescription:String,
    postdate:String,
    
});


const Posting = mongoose.model('internshipPosting' ,postingSchema);

module.exports = Posting;