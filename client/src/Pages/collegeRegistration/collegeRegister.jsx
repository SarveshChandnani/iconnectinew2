import React, { useState } from "react";
import "./collegeRegister.css";
import Input from "./Input/Input";
import { useNavigate } from "react-router-dom";
import Topbar from "../../Components/Topbar";
const CollegeRegister = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    collegename: "",
    collegeaddress: "",
    collegespocname: "",
    collegespocemail: "",
    collegespocphone: "",
    collegeregid: "",
    degreeoffered: "",
  });

  const inputs = [
    {
      id: 1,
      name: "collegespocemail",
      type: "email",

      errorMessage: "Not a valid email",
      required: true,
      label: "College SPOC Email",
    },
    {
      id: 2,
      name: "password",
      type: "Password",

      errorMessage:
        "Password should be 8-20 characters and include atleast 1 letter, 1 number and 1 special character!",
      required: true,
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      label: "Password",
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "Password",

      errorMessage: "Passwords don't match!",
      required: true,
      pattern: values.password,
      label: "Confirm Password",
    },
    {
      id: 4,
      name: "collegename",
      type: "text",

      errorMessage: "",
      required: true,
      label: "College Name",
    },
    {
      id: 5,
      name: "collegeaddress",
      type: "textarea",

      errorMessage: "",
      required: true,
      label: "College Address",
    },
    {
      id: 6,
      name: "collegespocname",
      type: "text",

      errorMessage: "",
      required: true,
      label: "College SPOC name",
    },

    {
      id: 7,
      name: "collegespocphone",
      type: "text",

      errorMessage: "Phone number should be of 10 digits!",
      required: true,
      pattern: "^[0-9]{10}$",
      label: "College SPOC phone",
    },
    {
      id: 8,
      name: "collegeregid",
      type: "text",

      errorMessage: "",
      required: true,
      label: "College Registration ID",
    },
    {
      id: 19,
      name: "degreeoffered",
      type: "text",

      errorMessage: "",
      required: true,
      label: "Degree Offered",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const postData = async (e) => {
    e.preventDefault();
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
    } = values;

    const res = await fetch("/collegesignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collegespocemail,
        password,
        confirmPassword,
        collegename,
        collegeaddress,
        collegespocname,
        collegespocphone,
        collegeregid,
        degreeoffered,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      navigate("/");
    }
  };

  console.log(values);
  const navigate = useNavigate();

  return (
    <div className="collegeouter">
      <Topbar />
      <div className="collegeregister">
        <div className="collegeRight">
          <form>
            <h3 className="collegeTitle">College Registration Form</h3>

            <div className="inputContainer">
              <div className="column">
                {inputs.slice(0, 5).map((input) => (
                  <Input
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}
              </div>

              <div className="column">
                {inputs.slice(5, 10).map((input) => (
                  <Input
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}
              </div>

              {/* <div className='column'>
              {inputs.slice(4,6).map((input) => (
                <Input key={input.id} {...input} value={values[input.name]} onChange={onChange} />
              ))}
            </div>

            <div className='column'>
              {inputs.slice(6,8).map((input) => (
                <Input key={input.id} {...input} value={values[input.name]} onChange={onChange} />
              ))}
            </div>
          

            <div className='column'>
              {inputs.slice(8,10).map((input) => (
                <Input key={input.id} {...input} value={values[input.name]} onChange={onChange} />
              ))}
            </div> */}
            </div>

            <button className="RegisterButton" onClick={postData}>
              Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollegeRegister;
