// import React, { useState } from 'react'
// import './AdminLogin.css';
// import FormInput from '../login/FormInput';
// import Topbar from '../../Components/Topbar';
// import { useNavigate } from 'react-router-dom';
// const AdminLogin = () => {
//     const navigate = useNavigate();
//    const handleSubmit = async (e)=>{

//         const email = adminEmail;
//         const password = adminPassword;

//         if(email === "admin60@gmail.com" && password === "ICONNECTI@"){
//             console.log("hiiiiiiiiiiiiiii");
//             navigate('AdminPage');

//         }else{

//             window.alert("Invalid Credentials");
//         }
//     }

//     const [adminEmail , setEmail] = useState("");
//     const [adminPassword , setPassword] = useState("");

//     console.log(adminEmail);
//   return (
//     <div className='outer'>
//     <Topbar/>
//     <div className='login'>

//     <div className='loginWrapper'>
//     <div className='header'></div>

//             <div className='loginStart'>
//             <form   >

//             <input  placeholder='Enter admin Email' onChange={(e)=> setEmail(e.target.value)}/>
//             <input  placeholder='Enter admin Password' type = "password" onChange={(e)=> setPassword(e.target.value)}/>

//             <div className='loginEnd'>
//             <button className='SignInButton'  onClick={handleSubmit}>Login</button>
//             <p className='passwordForgot'>Forgot Password?</p>
//             </div>

//             </form>
//             </div>

//         </div>
//     </div>
//     </div>
//   )
// }

// export default AdminLogin

import React from "react";
import { useState } from "react";
import "./AdminLogin.css";
import FormInput from "../login/FormInput";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "SPOC Email",
      errorMessage: "Not a valid email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    const res = await fetch("/adminsignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      window.alert("Login Succesful");
      console.log("Login Successful");
      navigate("AdminPage");
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="header"></div>

        <div className="loginStart">
          <form method="POST">
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div className="loginEnd">
              <button
                className="SignInButton"
                type="Submit"
                onClick={handleSubmit}
              >
                Login
              </button>
              <p className="passwordForgot">Forgot Password?</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
