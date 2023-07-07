



export const callMainPage = async(setUserData,setDeactivate , navigate , email)=>{
	
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
      setUserData(data);
       console.log(data);
      setDeactivate(data.deactivate);

       if(data.companyspocemail === email){
      if(data.deactivate === 'NO'&& data.loggedin === 'YES' && data.count === 1){
        try {
            const response = await fetch('/logout', {
              method: 'GET',
            });
        
            if (response.ok) {
              console.log('Cookie deleted successfully');
              navigate('/');
            } else {
              console.log('Failed to delete cookie');
            }
          } catch (error) {
            console.error('Error occurred while deleting cookie:', error);
          }
      }else if (data.deactivate === 'YES'){
        navigate(`/MainScreen/${data.companyspocemail}`);
      }
    }else{
      navigate('/');
    }
    //   if(!res.status === 200){
    // 	const error = new Error(res.error);
    // 	throw error;
    //   }
    } catch (error) {
      console.log(error);
      navigate('/');
    }

  }