import React from "react";
import ProfileActivate from "../profileActivate/profileActivate";
import "./activation.css";
import Navbar from "../../Components/Navbar";
import { useEffect ,useState} from "react";
import { callMainPage } from "../../functions/mainPage";
import { useNavigate , useParams} from "react-router-dom";
import Topbar from "../../Components/Topbar";

function Activation() {
  const {email} = useParams();
  
  const [deactivate , setDeactivate] = useState("");
  const [userData , setUserData] = useState({});

  // useEffect(()=>{
	// 	callMainPage(setUserData , setDeactivate, navigate, email);
	//   },[]);
  const navigate = useNavigate();

  return (
    <div>
      
      <Navbar />

      <div className="content">
        <ProfileActivate email = {email} />
      </div>
    </div>
  );
}

export default Activation;
