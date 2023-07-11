const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../DB/conn");
const User = require("../DB/schema");
const Admin = require("../DB/adminSchema");
const College = require("../DB/collegeSchema");
const authenticate = require("../middleware/authenticate");
const adminauthenticate = require("../middleware/adminautheticate");
const multer = require("multer");
const Activation = require("../DB/activationSchema");
const Posting = require("../DB/internshipPosting");
const UserOtp = require("../DB/userOtp");
const nodemailer = require("nodemailer");
const twilio = require("twilio");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("Hello router");
});

//using promises
// router.post('/register' , (req ,res )=>{

//     const {username , password , confirmPassword , companyname ,companyspocname ,companyspocemail , companyspocphone} = req.body;
//            console.log(confirmPassword);
//            console.log(companyspocphone);

//            User.findOne({companyspocemail : companyspocemail})
//            .then((userExist) =>{
//             if(userExist){
//                 return res.status(422).json({error : "Email already Exists"});
//             }
//            const user = new User({username , password , confirmPassword , companyname ,companyspocname ,companyspocemail , companyspocphone});

//            user.save()
//            .then(()=>{
//             res.status(201).json({message : "user registered successfully"});
//            }).catch((err)=>{
//             res.status(500).json({error : "Failed to register"})
//            })
//            }).catch(err => {console.log(err);});
//     //  console.log(req.body);

// });
router.post(
  "/signup",
  upload.single("logo"),
  async (req, res) => {
    try {
      console.log(req.file);
      const logo = req.file ? req.file.filename : null;
      const {
        companyspocemail,
        password,
        confirmPassword,
        companyname,
        companyspocname,
        companyspocphone,
      } = req.body;
      console.log(password);
      if (
        !password ||
        !confirmPassword ||
        !companyname ||
        !companyspocemail ||
        !companyspocname ||
        !companyspocphone ||
        confirmPassword != password
      ) {
        return res.status(422).json({ error: "Please Fill the fields" });
      }
      const userExist = await User.findOne({
        companyspocemail: companyspocemail,
      });

      if (userExist) {
        return res.status(422).json({ error: "User already Exists" });
      } else {
        const user = new User({
          companyspocemail,
          password,
          confirmPassword,
          companyname,
          companyspocname,
          companyspocphone,
          logo,
        });

        await user.save();
        console.log(password);
        res.status(201).json({ message: "user registered successfully" });
      }

      // if(userRegister){
      //     res.status(201).json({message : "user registered successfully"});
      // }else{
      //     res.status(500).json({error : "Failed to register"});
      // }
    } catch (err) {
      console.log(err);
    }
  }

  //        .then((userExist) =>{
  //         if(userExist){
  //             return res.status(422).json({error : "Email already Exists"});
  //         }
  //        const user = new User({username , password , confirmPassword , companyname ,companyspocname ,companyspocemail , companyspocphone});

  //        user.save()
  //        .then(()=>{
  //         res.status(201).json({message : "user registered successfully"});
  //        }).catch((err)=>{
  //         res.status(500).json({error : "Failed to register"})
  //        })
  //        }).catch(err => {console.log(err);});
  // console.log(req.body);
);

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(422).json({ error: "Please Fill the fields" });
    }
    const userExist = await User.findOne({ companyspocemail: email });
    const collegeUser = await College.findOne({ collegespocemail: email });
    console.log("hell");
    console.log(userExist);
    if (userExist && !collegeUser) {
      const isMatch = await bcrypt.compare(password, userExist.password);

      if (isMatch) {
        const OTP1 = Math.floor(100000 + Math.random() * 900000);
        const OTP2 = Math.floor(100000 + Math.random() * 900000);
        const emailExist = await UserOtp.findOne({ email: email });
        if (emailExist) {
          const updateData = await UserOtp.findByIdAndUpdate(
            { _id: emailExist._id },
            { emailotp: OTP1 },
            { phoneotp: OTP2 },
            { new: true }
          );
          await updateData.save();

          //email code
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email for Validation",
            text: `OTP : ${OTP1}`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(422).json({ error: "email not send" });
            } else {
              console.log("email sent");
              res.status(200).json(userExist);
            }
          });

          //sms code
          //       const client = twilio(process.env.SID, process.env.AUTH_TOKEN);
          //       client.messages
          // .create({
          //   body: `your OTP is ${OTP2}`,
          //   from: process.env.PHN_NUMBER,
          //   to: '+91'+userExist.companyspocphone,
          // })
          // .then((message) => {
          //   console.log(`Message sent`);
          //   res.send('Message sent successfully');
          // })
          // .catch((error) => {
          //   console.error('Error sending message:', error);
          //   res.status(500).send('Error sending message');
          // });
        } else {
          const saveOtpData = new UserOtp({
            email,
            emailotp: OTP1,
            phoneotp: OTP2,
          });
          await saveOtpData.save();
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email for Validation",
            text: `OTP : ${OTP1}`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(422).json({ error: "email not send" });
            } else {
              console.log("email sent");
              res.status(200).json(userExist);
            }
          });

          //       const client = twilio(process.env.SID, process.env.AUTH_TOKEN);
          //       client.messages
          // .create({
          //   body: `your OTP is ${OTP2}`,
          //   from: process.env.PHN_NUMBER,
          //   to: '+91'+userExist.companyspocphone,
          // })
          // .then((message) => {
          //   console.log(`Message sent`);
          //   res.send('Message sent successfully');
          // })
          // .catch((error) => {
          //   console.error('Error sending message:', error);
          //   res.status(500).send('Error sending message');
          // });
        }

        // return res.status(201).json({ message: "company" });
      } else {
        return res.status(422).json({ message: "Invalid Credentials" });
      }
    } else if (!userExist && collegeUser) {
      console.log("hiiiii");
      const isMatch = await bcrypt.compare(password, collegeUser.password);
      if (isMatch) {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        const emailExist = await UserOtp.findOne({ email: email });
        console.log(emailExist);
        if (emailExist) {
          console.log("updating");
          const updateData = await UserOtp.findByIdAndUpdate(
            { _id: emailExist._id },
            { emailotp: OTP },
            { new: true }
          );
          await updateData.save();
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email for Validation",
            text: `OTP : ${OTP}`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(422).json({ error: "email not send" });
            } else {
              console.log("email sent");
              res.status(200).json(collegeUser);
            }
          });
        } else {
          console.log("hello man");
          const saveOtpData = new UserOtp({
            email,
            emailotp: OTP,
            phoneotp: "none",
          });
          await saveOtpData.save();
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email for Validation",
            text: `OTP : ${OTP}`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(422).json({ error: "email not send" });
            } else {
              console.log("email sent");
              res.status(200).json(collegeUser);
            }
          });
        }
        // return res.status(201).json({ message: "college" });
      } else {
        return res.status(422).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(422).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/allUsers", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
});

router.post("/updateuser", async (req, res) => {
  const { uid, deactivate ,companyspocemail} = req.body;
  try {
    if (deactivate === "NO") {
      await User.updateOne({ _id: uid }, { $set: { deactivate: "YES" } });
      const mailOptions = {
        from: process.env.EMAIL,
        to: companyspocemail,
        subject: "Deactivation Mail",
        text: "Your Account has been Deactivated!!",
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          
        } else {
          console.log("email sent");
          
        }
      });

      
  
    } else {
      await User.updateOne(
        { _id: uid },
        { $set: { deactivate: "NO", count: 1 } }
      );
      const mailOptions = {
        from: process.env.EMAIL,
        to: companyspocemail,
        subject: "Activation Mail",
        text: "Your Account has been Activated!!",
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          
        } else {
          console.log("email sent");
          
        }
      });
    }
    res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/collegesignup", async (req, res) => {
  try {
    const {
      collegespocemail,
      password,
      confirmPassword,
      collegename,
      collegeaddress,
      collegespocname,
      collegespocphone,
      collegeregid,
      degreeoffered,
    } = req.body;

    if (
      !password ||
      !confirmPassword ||
      !collegename ||
      !collegeaddress ||
      !collegespocemail ||
      !collegespocname ||
      !collegespocphone ||
      !collegeregid ||
      !degreeoffered ||
      confirmPassword != password
    ) {
      return res.status(422).json({ error: "Please Fill the fields" });
    }
    const userExists = await College.findOne({
      collegespocemail: collegespocemail,
    });

    if (userExists) {
      return res.status(422).json({ error: "User already Exists" });
    } else {
      const user = new College({
        collegespocemail,
        password,
        confirmPassword,
        collegename,
        collegeaddress,
        collegespocname,
        collegespocphone,
        collegeregid,
        degreeoffered,
      });

      await user.save();
      console.log(password);
      res.status(201).json({ message: "user registered successfully" });
    }

    // if(userRegister){
    //     res.status(201).json({message : "user registered successfully"});
    // }else{
    //     res.status(500).json({error : "Failed to register"});
    // }
  } catch (err) {
    console.log(err);
  }
});
router.get("/allColleges", async (req, res) => {
  try {
    const allUsers = await College.find({});
    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deleteCollege", async (req, res) => {
  const { uid } = req.body;
  try {
    await College.deleteOne({ _id: uid });
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/mainscreen", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/adminsignup", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);

    const admin = new Admin({ email, password });

    await admin.save();
    console.log(password);
    res.status(201).json({ message: "user registered successfully" });

    // if(userRegister){
    //     res.status(201).json({message : "user registered successfully"});
    // }else{
    //     res.status(500).json({error : "Failed to register"});
    // }
  } catch (err) {
    console.log(err);
  }
});

router.post("/adminsignin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    console.log(password);
    console.log(email);

    if (!email || !password) {
      return res.status(422).json({ error: "Please Fill the fields" });
    }
    const userExist = await Admin.findOne({ email: email });

    if (userExist) {
      token = await userExist.generateAuthToken();
      console.log(token);
      res.cookie("admin", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (password === userExist.password) {
        return res.status(201).json({ message: "login Successful!!" });
      } else {
        return res.status(422).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(422).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/adminpage", adminauthenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/activation", async (req, res) => {
  try {
    console.log(req.body);
    const {
      websiteinfo,
      industrytype,
      areaofwork,
      registeredoffice,
      companyregno,
      currentlocation,
      locationofwork,
      employeecount,
      compdescription,
      email,
    } = req.body;

    if (
      !websiteinfo ||
      !industrytype ||
      !areaofwork ||
      !registeredoffice ||
      !companyregno ||
      !currentlocation ||
      !locationofwork ||
      !employeecount ||
      !compdescription ||
      !email
    ) {
      return res.status(422).json({ error: "Please Fill the fields" });
    }
    const userExists = await Activation.findOne({ companyregno: companyregno });

    if (userExists) {
      return res.status(422).json({ error: "User already Exists" });
    } else {
      const company = await User.findOne({ companyspocemail: email });
      console.log(company.companyspocemail === email);

      await User.updateOne(
        {
          companyspocemail: email,
        },
        { $set: { deactivate: "NO" } }
      );
      const user = new Activation({
        websiteinfo,
        industrytype,
        areaofwork,
        registeredoffice,
        companyregno,
        currentlocation,
        locationofwork,
        employeecount,
        compdescription,
        email,
      });
      await user.save();
      // res.status(201).json({message : "Profile Updated successfully"});

      // var companyData = await Activation.aggregate([
      //   {
      //     $lookup:{
      //          from:"internshippostings",
      //          localField:"internshipposting",
      //          foreignField:"_id",
      //          as:"internshipinfo"
      //     }
      //   }
      // ]);

      // await companyData.save();
      console.log(companyregno);
      res.status(201).json({ message: "Profile Updated successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/posting", async (req, res) => {
  console.log(req.body.postinemail);
  try {
    const {
      areaofwork,
      startdate,
      enddate,
      stipend,
      hoursweek,
      typeofengagement,
      locationofwork,
      vacancy,
      skills,
      jobdescription,
      userID,
      uniqueID,
      postdate,
      postingemail,
    } = req.body;

    if (
      !areaofwork ||
      !startdate ||
      !enddate ||
      !stipend ||
      !hoursweek ||
      !typeofengagement ||
      !locationofwork ||
      !vacancy ||
      !skills ||
      !jobdescription ||
      !userID
    ) {
      return res.status(422).json({ error: "Please Fill the fields" });
    } else {
      const user = new Posting({
        areaofwork,
        startdate,
        enddate,
        stipend,
        hoursweek,
        typeofengagement,
        locationofwork,
        vacancy,
        skills,
        jobdescription,
        userID,
        uniqueID,
        postdate,
      });

      await user.save();
      const mailOptions = {
        from: process.env.EMAIL,
        to: postingemail,
        subject: "Posting confirmation email",
        text: `Congratulations!!
  You successfully posted about the Internship🙌🙌.
  Your posting ID is ${uniqueID}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(422).json({ error: "email not send" });
        } else {
          console.log("email sent");
          res.status(200).json({ message: "email sent Successfully" });
        }
      });

      res.status(201).json({ message: "Internship Posted successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/allpostings", async (req, res) => {
  try {
    const { userID } = req.body;
    console.log(userID);

    const allUsers = await Posting.find({ userID: userID });
    // console.log(allUsers);
    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
});

router.post("/otpverify", async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ companyspocemail: email });
  // const collegeUser = await College.findOne({collegesopcemail : email});
  const collegeUser = await College.findOne({ collegespocemail: email });
  const userExist = await UserOtp.find({ email: email });
  console.log(userExist);
  console.log(user);
  console.log(collegeUser);
  if (user && !collegeUser) {
    if (userExist[0].emailotp === otp) {
      token = await user.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 14400000),
        httpOnly: true,
      });
      await User.updateOne(
        { companyspocemail: email },
        { $set: { loggedin: "YES", count: 0 } }
      );

      return res.status(200).json({ message: "Company" });
    } else {
      return res.status(422).json({ error: "Invalid OTP" });
    }
  } else if (!user && collegeUser) {
    console.log("inside college");
    if (userExist[0].emailotp === otp) {
      token = await collegeUser.generateAuthToken();
      res.cookie("collegetoken", token, {
        expires: new Date(Date.now() + 14400000),
        httpOnly: true,
      });
      await College.updateOne(
        { collegespocemail: email },
        { $set: { loggedin: "YES", count: 0 } }
      );

      return res.status(200).json({ message: "College" });
    } else {
      return res.status(422).json({ error: "Invalid OTP" });
    }
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken");
  res.send("Cookie deleted");
});

router.post("/updatecompany", async (req, res) => {
  try {
    let {
      
      password,
      confirmpassword,
      companyname,
      companyspocname,
      companyspocphone,
      orignalemail,
    } = req.body;

    // const user = await User.findOne({ companyspocemail: companyspocemail });

    // if (user) {
    //   res.status(422).json({ error: "Email already used" });
    // }
    if (!password) {
      await User.updateMany(
        { companyspocemail: orignalemail },
        {
          $set: {
            companyname: companyname,
            companyspocname: companyspocname,
            companyspocphone: companyspocphone,
          },
        }
      );
      res.status(200).json({ message: "successful!!" });
    } else {
      password = await bcrypt.hash(password , 12);
      console.log(password);
      
      confirmpassword = await bcrypt.hash(confirmpassword , 12);
      console.log(confirmpassword);
      await User.updateMany(
        { companyspocemail: orignalemail },
        {
          $set: {
            
            password : password,
            confirmPassword : confirmpassword,
            companyname: companyname,
            companyspocname: companyspocname,
            companyspocphone: companyspocphone,
          },
        }
      );
      res.status(200).json({ message: "successful!!" });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
