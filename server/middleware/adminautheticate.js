const jwt = require('jsonwebtoken');
const Admin = require('../DB/adminSchema');


const adminAuthenticate = async (req,res ,next)=>{
    console.log(req);
  try {
    
    const token = req.cookies.admin;
    
    const verifyToken = jwt.verify(token ,process.env.SECRET_KEY);
    const rootUser = await Admin.findOne({_id: verifyToken._id , "tokens.token": token});

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();

  } catch (error) {
    res.status(401).send('Unauthorized: No token provided');
     console.log(error); 
  }
}

module.exports = adminAuthenticate;