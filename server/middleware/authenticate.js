const jwt = require('jsonwebtoken');
const User = require('../DB/schema');


const Authenticate = async (req,res ,next)=>{
    
  try {
    
    const token = req.cookies.jwtoken;
    
    const verifyToken = jwt.verify(token ,process.env.SECRET_KEY);
    const rootUser = await User.findOne({_id: verifyToken._id , "tokens.token": token});

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();

  } catch (error) {
    res.status(401).send('Unauthorized: No token provided');
     console.log(error); 
  }
}

module.exports = Authenticate;