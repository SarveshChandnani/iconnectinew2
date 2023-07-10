import React, { useState, useEffect } from "react";
import { callMainPage } from "../../functions/mainPage";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";

const UpdateProfile = () => {
  const [deactivate, setDeactivate] = useState("");
  const [userData, setUserData] = useState({});
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    callMainPage(setUserData, setDeactivate, navigate, email);
  }, []);
  const [values, setValues] = useState({
    companyspocemail: "",
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
    console.log(data);


  };
  

  return (
    <div className="posting">
      <Navbar />

      <div className="internship-header">
        <h1>Update Your Profile</h1>
      </div>

      <div className="wrapper">
        <div className="insidewrapper">
          <div className="fields">
            <label>Company SPOC Email</label>
            <input
              type="text"
              name="companyspocemail"
              placeholder={userData.companyspocemail}
              onChange={onChange}
              //   value={values.skills}
              //   onChange={onChange}
            />
          </div>
          <div className="fields">
            <label>New Password</label>
            <input
              type="text"
              name="password"
              onChange={onChange}

              //   value={values.skills}
              //   onChange={onChange}
            />
          </div>
          <div className="fields">
            <label>Retype New Password</label>
            <input
              type="text"
              name="confirmpassword"
              onChange={onChange}
              //   value={values.skills}
              //   onChange={onChange}
            />
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
              //   value={values.skills}
              //   onChange={onChange}
            />
          </div>
          <div className="fields">
            <label>Company SPOC Phone</label>
            <input
              type="text"
              name="companyspocphone"
              placeholder={userData.companyspocphone}
              onChange={onChange}
              //   value={values.skills}
              //   onChange={onChange}
            />
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
