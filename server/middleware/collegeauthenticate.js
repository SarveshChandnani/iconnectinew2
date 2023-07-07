const jwt = require('jsonwebtoken');
const College = require('../DB/collegeSchema');

const collegeAuthenticate = async(req , res , next) =>{
    try {
        
        const token = req.cookies.collegetoken;
        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);
        const colleguser = await College.findOne({_id:verifyToken._id , "tokens.tokens": token});

        req.token = token;
        req.collegeuser = collegeuser;
        req.userID = collegeuser._id;
        next();

    } catch (error) {
        console.log(error);
    }
}

modules.exports = collegeAuthenticate;