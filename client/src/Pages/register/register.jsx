import React, { useState } from 'react'
import "./register.css"

import FormInput from './Input/FormInput';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../Components/Topbar';
const Register = () => {
  const [values , setValues] = useState({
    username : "",
    password :"",
    confirmPassword: "",
    companyname : "",
    companyspocname:"",
    companyspocemail : "",
    companyspocphone : "",
    logo : ""
  });

  const inputs = [
    // {
    //   id :1,
    //   name: "username",
    //   type : "text",
    //   placeholder : "User Name",
    //   errorMessage : "Username should be of at least 3 letters and shouldn't include any special character!",
    //   required: true,
    //   pattern: "^[A-Za-z0-9]{3-}$",
    // },
     {
      id :1,
      name: "companyspocemail",
      type : "email",
      placeholder : "Company SPOC Email",
      errorMessage : "Not a valid email",
      required: true,
    },
    {
      id :2,
      name: "password",
      type : "Password",
      placeholder : "Password",
      errorMessage : "Password should be 8-20 characters and include atleast 1 letter, 1 number and 1 special character!",
      required: true,
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`
    },
    {
      id :3,
      name: "confirmPassword",
      type : "Password",
      placeholder : "Retype Password",
      errorMessage : "Passwords don't match!",
      required: true,
      pattern : values.password
    },
    {
      id :4,
      name: "companyname",
      type : "text",
      placeholder : "Company Name",
      errorMessage : "",
      required: true,
    },
    {
      id :5,
      name: "companyspocname",
      type : "text",
      placeholder : "Company SPOC Name",
      errorMessage : "Username should be of at least 3 letters and shouldn't include any special character!",
      required: true,
      pattern: "^[A-Za-z0-9]{3-}$",
    },
   
    {
      id :6,
      name: "companyspocphone",
      type : "text",
      placeholder : "Company SPOC Phone",
      errorMessage : "Phone number should be of 10 digits!",
      required: true,
      pattern: "^[0-9]{10}$",
    }
  ];

  const onChange =  (e) =>{
    setValues ({...values , [e.target.name]: e.target.value});
  };

  const imageUpload = (e) =>{
    console.log(e.target.files[0]);
    setValues ({...values , logo: e.target.files[0]});
  }

  const postData =async (e)=>{
     e.preventDefault();
     const {companyspocemail , password , confirmPassword , companyname ,companyspocname , companyspocphone } = values;
    const logo = values.logo;
     const formData = new FormData();
     formData.append('companyspocemail', companyspocemail);
     formData.append('password', password);
     formData.append('confirmPassword', confirmPassword);
     formData.append('companyname', companyname);
     formData.append('companyspocname', companyspocname);
     formData.append('companyspocphone', companyspocphone);
     formData.append('logo', values.logo, values.logo.name);
     
     const res = await fetch('/signup', {
        method : "POST",
        // headers : {
        //   "Content-Type" : "application/json"
        // },
        body: formData
        // JSON.stringify({
        //    companyspocemail, password , confirmPassword , companyname ,companyspocname  , companyspocphone ,logo
          
        // })
     });

     const data = await res.json();

     if(res.status === 422 || !data){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
     }else{
      window.alert("Registration Successful");
      console.log("Registration Successful");
      navigate('/');
     }
    
  }

console.log(values);
const navigate = useNavigate();
return (
//   <div className='outer'>
//   <Topbar/>
//   <div className='login'>
  
//   {/* <div className='loginWrapper'> */}
     
//       <div className='loginRight'>

//           {/* <div className='loginStart'> */}
//        <form >
//           <h3 className='loginTitle'>Company Registration Form</h3>

//       {
//         inputs.map((input)=>
//           <FormInput key ={input.id}  {...input} value = {values[input.name]} onChange = {onChange}/>
//         )
//       }
      


//       <button className='loginRegisterButton' onClick={postData}>Create a account</button>
//       </form>
//           </div>
//       {/* </div> */}
//   </div>

//     </div>
<div className='registerouter'>
<Topbar toShow = 'false' />
<div className='register'>

{/* <div className='registerWrapper'> */}
   
    <div className='registerRight'>

        {/* <div className='loginStart'> */}
     <form >
        <h3 className='registerTitle'>Company Registration Form</h3>

    {
      inputs.map((input)=>
        <FormInput key ={input.id}  {...input} value = {values[input.name]} onChange = {onChange}/>
      )
    }

    <input placeholder='upload your logo' type='file' onChange={imageUpload}/>
    


    <button className='RegisterButton' onClick={postData}>Create a account</button>
    </form>
        </div>
    {/* </div> */}
</div>

    </div>

  )
}

export default Register