import React from 'react';
import "./CollegeMainScreen.css"
import Topbar from '../../Components/Topbar'
import Navbar from '../../Components/Navbar'
import CollegeMainContent from './collegeMainContent/collegeMainContent';
import CollegeSidebar from '../../Components/CollegeSidebar/CollegeSidebar';

const CollegeMainScreen = () => 
{

	return (
		<div className='out'>
		<Navbar/>
		
		<div className='cont'> 
		 <div className='lft'>
		 <CollegeSidebar deactivate={0}/>
		 </div>
		  <div className='rgt'>
		  {/* <collegeMainContent userID = {0}/> */}
		  <CollegeMainContent/>
		  </div>
		   
		</div>
		</div>
	)
  
}

export default CollegeMainScreen;