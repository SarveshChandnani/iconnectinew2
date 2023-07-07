import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import "./posting.css";
import { callMainPage } from "../../functions/mainPage";
import { v4 as uuid } from "uuid";

const Posting = () => {
  const [deactivate, setDeactivate] = useState("");
  const [userData, setUserData] = useState({});
  const {email} = useParams();

  useEffect(() => {
    callMainPage(setUserData, setDeactivate, navigate, email);
  }, []);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    areaofwork: "",
    startdate: "",
    enddate: "",
    stipend: "",
    hoursweek: "",
    locationofwork: "",
    typeofengagement: "",
    vacancy: "",
    skills: "",
    jobdescription: "",
  });

  // console.log(values);

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
    } = values;

    const postingemail = email;
    const userID = userData._id;
    console.log(userID);
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);
    const uniqueID = userData.companyname + "_" + small_id;
    console.log(uniqueID);
    const current = new Date();
    const postdate = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;

    const res = await fetch("/posting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      navigate(`/MainScreen/${email}`);
    }
  };

  return (
    <div className="posting">
      <Navbar />

      <div className="internship-header">
        <h1>Post Internship Details</h1>
      </div>

      <div className="wrapper">
        <div className="insidewrapper">
          <div className="fields">
            <label>Area of work</label>
            <select
              name="areaofwork"
              value={values.areaofwork}
              onChange={onChange}
            >
              <option value="">---Select---</option>
              <option value="Software">Software</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="fields">
            <label>Skills Required</label>
            <input
              type="text"
              name="skills"
              value={values.skills}
              onChange={onChange}
            />
          </div>

          <div className="fields">
            <label>Start Date</label>
            <input
              type="Date"
              name="startdate"
              value={values.startdate}
              onChange={onChange}
            />
          </div>

          <div className="fields">
            <label>End Date</label>
            <input
              type="Date"
              name="enddate"
              value={values.enddate}
              onChange={onChange}
            />
          </div>

          <div className="fields">
            <label>Stipend</label>
            <select
              name="stipend"
              value={values.stipend}
              id="stipend"
              onChange={onChange}
            >
              <option value="">---Select---</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="fields">
            <label>No. of hours/week</label>
            <input
              type="text"
              name="hoursweek"
              value={values.hoursweek}
              onChange={onChange}
            />
          </div>

          <div class="fields">
            <label>Type of engagement</label>
            <select
              name="typeofengagement"
              value={values.typeofengagement}
              id="typeofengagement"
              onChange={onChange}
            >
              <option value="" selected>
                --select--
              </option>
              <option value="WFH">WFH</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div class="fields">
            <label>Location of Work </label>
            <select
              name="locationofwork"
              id="locationofwork"
              value={values.locationofwork}
              onChange={onChange}
            >
              <option value="" selected>
                --select--
              </option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>

          <div className="fields">
            <label>No. of Vacancies</label>
            <input
              type="text"
              name="vacancy"
              value={values.vacancy}
              onChange={onChange}
            />
          </div>

          <div className="fields">
            <label>Job Description</label>
            <textarea
              name="jobdescription"
              value={values.jobdescription}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="bottom">
          <button className="btn" onClick={postData}>
            POST
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Posting;
