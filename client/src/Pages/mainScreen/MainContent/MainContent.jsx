import React from 'react'
import "./mainContent.css"
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
const MainContent = (props) => {
 
  
   
  const [data, setData] = useState([]);
  
  useEffect(()=>{
		callMainPage();
	  },[]);
	
	  const callMainPage = async()=>{
	
		try {
		  const res = await fetch('/mainscreen',{
			method: 'GET',
			headers:{
			  Accept: "application/json",
			  "Content-Type" : "application/json"
			},
			credentials: "include"
		  });
		  const data = await res.json();
		  setId(data._id);
		  
		  
		  if(!res.status === 200){
			const error = new Error(res.error);
			throw error;
		  }
		} catch (error) {
		  console.log(error);
		  
		}
	
	  }
    const [id, setId] = useState("");
    
  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (userid) => {
    
    const res = await fetch("/allpostings", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       userID: userid
        
      }),
    });

    const data = await res.json();
    setData(data);
      
  };

  return (
    
    <div>
    <div className="mainbody">
      <table className="maintable">
        <thead>
          <tr>
          <th>Posting ID</th>
            <th>Posted On</th>
            <th>Area Of Work</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Stipend</th>
            <th>Hours Per Week</th>
            <th>Location Of Work</th>
            <th>Type of Engagement</th>
            <th>Vacancies Available</th>
            <th>Skills Required</th>
            <th>Job Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => {
            return (
              <tr id={user._id}>
              <td>{user.uniqueID}</td>
                <td>{user.postdate}</td>
                <td>{user.areaofwork}</td>
                <td>{user.startdate}</td>
                <td>{user.enddate}</td>
                <td>{user.stipend}</td>
                <td>{user.hoursweek}</td>
                <td>{user.locationofwork}</td>
                <td>{user.typeofengagement}</td>
                <td>{user.vacancy}</td>
                <td>{user.skills}</td>
                <td>{user.jobdescription}</td>
                {/* <Tippy content={user.jobdescription}>
                <td id="hover">hover
                </td>
                </Tippy> */}
               
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  
  )
}

export default MainContent