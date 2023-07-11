import React, { useState } from "react";
import "./collegeSidebar.css";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaSearch,
  FaLaptopCode
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const CollegeSidebar = ({ children, deactivate,email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  const menuItem = [
    {
      path: "/CollegeMainScreen",
      name: "Dashboard",
      icon: <FaTh />,
      deactivate: { deactivate },
    },
    {
      path: "/Upload",
      name: "Upload Profiles",
      icon: <FaUserAlt />,
      deactivate: { deactivate },
    },
    {
      path:"/update",
      name: "Update profile",
      icon: <FaRegChartBar />,
      deactivate: { deactivate },
    },
    {
      path: "/search",
      name: "Search Internships",
      icon: <FaSearch />,
      deactivate: { deactivate },
    },
   
  ];
  const errorMessage = "Sorry Your Account has been deactivated";
 
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          /* menuItem.map((item, index)=>
                   
                   
                   ( 
                       <NavLink to={item.deactivate.deactivate  === "NO"? item.path : '/error'} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   )
                   

                   
                   
                   ) */
          menuItem.map((item, index) => (
            <div key={index}>
              {item.deactivate.deactivate === "YES" && item.name !== "Activate Profile"? (
                <div className="link" onClick={() => alert(errorMessage)}>
                  <div className="icon">{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    {item.name}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    {item.name}
                  </div>
                </NavLink>
              )}
            </div>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  );
};

export default CollegeSidebar;
