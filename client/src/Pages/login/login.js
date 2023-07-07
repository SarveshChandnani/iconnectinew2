import React from "react";
import { useState } from "react";
import "./login.css";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Login = () => {
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

    const res = await fetch("/signin", {
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
      if(!data.companyspocemail){
        navigate(`otp/${data.collegespocemail}`);
      }else{
        navigate(`otp/${data.companyspocemail}`);
      }
      
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);

  // return (
  //   <div className='login'>
  //   <div className='loginWrapper'>
  //   <div className='header'></div>

  //           <div className='loginStart'>
  //           <form  method='POST' >

  //           {inputs.map((input) => (
  //         <FormInput
  //           key={input.id}
  //           {...input}
  //           value={values[input.name]}
  //           onChange={onChange}
  //         />
  //       ))}
  //           <div className='loginEnd'>
  //           <button className='SignInButton' type='Submit' onClick={handleSubmit}>Login</button>
  //           <p className='passwordForgot'>Forgot Password?</p>
  //           </div>

  //           </form>
  //           </div>

  //           <p>Not yet Registered? Register as</p>
  //           <div className='registerButtons'>
  //           <button className='RegisterButton' onClick={()=>{
  //             navigate('Register');
  //           }}>Company SPOC</button>
  //           <button className='loginRegisterButton' onClick={()=>{
  //             navigate('CollegeRegister');
  //           }}>College SPOC</button>
  //           <button className='RegisterButton'>Student</button>

  //           </div>

  //       </div>
  //   </div>

  // );
  return (
    <div className="login">
    <ToastContainer/>
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

        <p>Not yet Registered? Register as</p>
        <div className="registerButtons">
          <button
            className="loginRegisterButton"
            onClick={() => {
              navigate("Register");
            }}
          >
            Company SPOC
          </button>
          <button
            className="loginRegisterButton"
            onClick={() => {
              navigate("CollegeRegister");
            }}
          >
            College SPOC
          </button>
          <button className="loginRegisterButton">Student</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
