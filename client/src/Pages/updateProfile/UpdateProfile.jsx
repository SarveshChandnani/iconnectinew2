import React, { useState, useEffect } from "react";
import { callMainPage } from "../../functions/mainPage";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";

const UpdateProfile = () => {
  const [deactivate, setDeactivate] = useState("");
  const [userData, setUserData] = useState({});
  const { email } = useParams();
  const navigate = useNavigate();
  const [focused , setFocus] = useState(false);

  useEffect(() => {
    callMainPage(setUserData, setDeactivate, navigate, email);
  }, []);
  const [values, setValues] = useState({
    // companyspocemail: "",
    password: "",
    confirmpassword: "",
    companyname: "",
    companyspocname: "",
    companyspocphone: "",
  });
  let name, value;
  const onChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const postData = async (e) => {
    e.preventDefault();
    console.log("helllo");
    console.log(values);
    console.log(focused);
    // if(focused=== true){
    //   window.alert("Invalid Credentials");
    //   navigate(`/updateProfile/${email}`)
    // }else{

    let {
      companyspocemail,
      password,
      confirmpassword,
      companyname,
      companyspocname,
      companyspocphone,
    } = values;
    const orignalemail = email;
    if(!companyspocemail){
        companyspocemail =  userData.companyspocemail;
    }
    if(!companyname){
        companyname = userData.companyname
    }
    if(!companyspocname){
        companyspocname = userData.companyspocname;
    }
    if(!companyspocphone){
        companyspocphone = userData.companyspocphone;
    }

    const res = await fetch("/updatecompany" , {
     method : 'POST',
     headers: {
        'Content-Type': 'application/json',
     } , 
     body :JSON.stringify( {
      companyspocemail,
      password,
      confirmpassword,
      companyname,
      companyspocname,
      companyspocphone,
      orignalemail
     })

    })

    const data = await res.json();
    console.log(res.status);
    console.log(data.message);
    if(data.message === "successful!!"){
      console.log("inside success");
      navigate(`/MainScreen/${orignalemail}`)
    }
  // }
  };

  const handleFocus = (e)=>{
    setFocus(true);
  }
  

  return (
    <div className="posting">
      <Navbar />

      <div className="internship-header">
        <h1>Update Your Profile</h1>
      </div>

      <div className="wrapper">
        <div className="insidewrapper">
          {/* <div className="fields">
            <label>Company SPOC Email</label>
            <input
              type="text"
              name="companyspocemail"
              placeholder={userData.companyspocemail}
              onChange={onChange}
              //   value={values.skills}
              //   onChange={onChange}
            />
          </div> */}
          <div className="fields">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
              onBlur={handleFocus}
              focused = {focused.toString()}

              //   value={values.skills}
              //   onChange={onChange}
            />
            <span className="error">Password should be 8-20 characters and include atleast 1 letter, 1 number and 1 special character!</span>
          </div>
          <div className="fields">
            <label>Retype New Password</label>
            <input
              type="password"
              name="confirmpassword"
              onChange={onChange}
              pattern = {values.password}
              onBlur={handleFocus}
              focused = {focused.toString()}
              //   value={values.skills}
              //   onChange={onChange}
            />
            <span className="error">Passwords don't match!</span>
          </div>
          <div className="fields">
            <label>Company Name</label>
            <input
              type="text"
              name="companyname"
              onChange={onChange}
              placeholder={userData.companyname}
              //   value={values.skills}
              //   onChange={onChange}
            />
          </div>
          <div className="fields">
            <label>Company SPOC Name</label>
            <input
              type="text"
              name="companyspocname"
              placeholder={userData.companyspocname}
              onChange={onChange}
              pattern="^[A-Za-z0-9]{3-}$"
              onBlur={handleFocus}
              focused = {focused.toString()}
              //   value={values.skills}
              //   onChange={onChange}
            />
            <span className="error">Username should be of at least 3 letters and shouldn't include any special character!</span>
          </div>
          <div className="fields">
            <label>Company SPOC Phone</label>
            <input
              type="text"
              name="companyspocphone"
              placeholder={userData.companyspocphone}
              onChange={onChange}
              pattern="^[0-9]{10}$"
              onBlur={handleFocus}
              focused = {focused.toString()}
              //   value={values.skills}
              //   onChange={onChange}
            />
            <span className="error">Phone number should be of 10 digits!</span>
          </div>
        </div>
        <div className="bottom">
          <button
            className="btn"
                onClick={postData}
          >
            update
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default UpdateProfile;
