
// import React, { useState } from 'react'
// import "./FormInput.css"
// const FormInput = (props) => {
//   const [focused , setFocus] = useState(false);
//   const {onChange, id , errorMessage, ...inputProps } = props;
//   const handleFocus = (e)=>{
//     setFocus(true);
//   }
//   return (
//     <div> 
//       <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused = {focused.toString()}/>
//       <span className='error'>{errorMessage}</span>
//     </div>
//   )
// }

// export default FormInput

import React, { useState } from 'react'
import "./FormInput.css"
const FormInput = (props) => {
  const [focused , setFocus] = useState(false);
  const {onChange, id , errorMessage, ...inputProps } = props;
  const handleFocus = (e)=>{
    setFocus(true);
  }
  return (
    <div className='companyInput'> 
      <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused = {focused.toString()}/>
      <span className='error'>{errorMessage}</span>
    </div>
  )
}

export default FormInput