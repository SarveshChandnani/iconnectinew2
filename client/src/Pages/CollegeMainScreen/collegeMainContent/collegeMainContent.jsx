import React from 'react'
import "./collegeMainContent.css"

const CollegeMainContent = (props) => 
{
return (
    
    <div>
      <div className="mainbody">
      <h1>List of candidates</h1>
        <table className="maintable">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Degree</th>
              <th>Branch</th>
              <th>Skills</th>
              <th>Projects</th>
              <th>Experience</th>
              
            </tr>
          </thead>
          <tbody>
           
                <tr >
                  <td ></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  
                </tr>
            
            
          </tbody>
        </table>
    </div>
    </div>
  
  )
}

export default CollegeMainContent