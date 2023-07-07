import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import MainContent from './MainContent/MainContent'
import "./mainScreen.css"
import Topbar from '../../Components/Topbar'
import { useNavigate ,useParams} from 'react-router-dom';
import Navbar from '../../Components/Navbar'
import { callMainPage } from '../../functions/mainPage'



const MainScreen = () => {
	const { email } = useParams();
  const [deactivate , setDeactivate] = useState("");
  const [userData , setUserData] = useState({});

  useEffect(()=>{
		callMainPage(setUserData , setDeactivate, navigate , email);
	  },[]);
	
	
	  const navigate = useNavigate();
    

 
	return (
		<div className='outer'>
		<Navbar/>
		
		<div className='content'> 
		 <div className='left'>
		 <Sidebar deactivate={deactivate} email = {email}/>
		 </div>
		  <div className='right'>
		  <MainContent userID = {userData._id}/>
		  </div>
		   
		</div>
		</div>
	  )
  
}

export default MainScreen