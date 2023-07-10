// import React from 'react'
// import "./mainContent.css"
// import { useEffect, useState } from 'react';
// // import Tippy from '@tippyjs/react';
// // import 'tippy.js/dist/tippy.css';
// const MainContent = (props) => {
 
//   const [data, setData] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);

//   const toggleModal = (id) => {
//     setSelectedId(id);
//     setModal(!modal);
//   };
   
  

//   useEffect(()=>{
// 		callMainPage();
// 	  },[]);
	
// 	  const callMainPage = async()=>{
	
// 		try {
// 		  const res = await fetch('/mainscreen',{
// 			method: 'GET',
// 			headers:{
// 			  Accept: "application/json",
// 			  "Content-Type" : "application/json"
// 			},
// 			credentials: "include"
// 		  });
// 		  const data = await res.json();
// 		  setId(data._id);
		  
		  
// 		  if(!res.status === 200){
// 			const error = new Error(res.error);
// 			throw error;
// 		  }
// 		} catch (error) {
// 		  console.log(error);
		  
// 		}
	
// 	  }
//     const [id, setId] = useState("");
    
//   useEffect(() => {
//     fetchData(id);
//   }, [id]);

//   const fetchData = async (userid) => {
    
//     const res = await fetch("/allpostings", {
//       method: "POST",
      
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//        userID: userid
        
//       }),
//     });

//     const data = await res.json();
//     setData(data);
      
//   };

//   return (
    
//     <div>
//     <div className="mainbody">
//       <table className="maintable">
//         <thead>
//           <tr>
//           <th>Posting ID</th>
//             <th>Posted On</th>
//             <th>Area Of Work</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Stipend</th>
//             <th>Hours Per Week</th>
//             <th>Location Of Work</th>
//             <th>Type of Engagement</th>
//             <th>Vacancies Available</th>
//             <th>Skills Required</th>
//             <th>Job Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((user) => {
//             return (
//               <tr id={user._id}>
//               <td onClick={toggleModal}>{user.uniqueID}</td>
//                 <td>{user.postdate}</td>
//                 <td>{user.areaofwork}</td>
//                 <td>{user.startdate}</td>
//                 <td>{user.enddate}</td>
//                 <td>{user.stipend}</td>
//                 <td>{user.hoursweek}</td>
//                 <td>{user.locationofwork}</td>
//                 <td>{user.typeofengagement}</td>
//                 <td>{user.vacancy}</td>
//                 <td>{user.skills}</td>
//                 <td>{user.jobdescription}</td>
//                 {/* <Tippy content={user.jobdescription}>
//                 <td id="hover">hover
//                 </td>
//                 </Tippy> */}
               
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       {modal && (
//         <div className="modal">
//           <div onClick={toggleModal} className="overlay"></div>
//           <div className="modal-content">
//             <h2>Internship Details</h2>
            
//             {data.map((user) => {
//             return (
//             <div>
//               <p id={user._id}>
//                 {user.uniqueID}
//               </p>
//             </div>
//             );
//           })}
//             <button className="close-modal" onClick={toggleModal}>
//               CLOSE
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
  
//   )
// }

// export default MainContent

import React, { useEffect, useState } from 'react';
import './mainContent.css';
import { ImCross } from "react-icons/im";

const MainContent = (props) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const toggleModal = (id) => {
    setSelectedId(id);
    setModal(!modal);
  };

  useEffect(() => {
    callMainPage();
  }, []);

  const callMainPage = async () => {
    try {
      const res = await fetch('/mainscreen', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      setId(data._id);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [id, setId] = useState('');

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (userid) => {
    const res = await fetch('/allpostings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userid,
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
                  <td onClick={() => toggleModal(user._id)}>{user.uniqueID}</td>
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
                </tr>
              );
            })}
          </tbody>
        </table>
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h1>Internship Details</h1>
              {data.map((user) => {
                if (user._id === selectedId) {
                  return (
                    <div key={user._id}>
                      <p><b>Internship ID:</b>{user.uniqueID}</p>
                      <p><b>Posted on:</b>{user.postdate}</p>
                      <p><b>Area of work:</b>{user.areaofwork}</p>
                      <p><b>Start Date:</b>{user.startdate}</p>
                      <p><b>End Date:</b>{user.enddate}</p>
                      <p><b>Stipend:</b>{user.stipend}</p>
                      <p><b>Hours per week:</b>{user.hoursweek}</p>
                      <p><b>Location Of work:</b>{user.locationofwork}</p>
                      <p><b>Engagement:</b>{user.typeofengagement}</p>
                      <p><b>Vacancy:</b>{user.vacancy}</p>
                      <p><b>Skills:</b>{user.skills}</p>
                      <p><b>Job Description:</b>{user.jobdescription}</p>


                      {/* Display other details here */}
                    </div>
                  );
                }
                return null;
              })}
              <ImCross className="close-modal" onClick={toggleModal}/>
               
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
