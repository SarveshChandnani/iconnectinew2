import React, { useState } from "react";
import "./Input.css";
const Input = (props) => {
  const [focused, setFocus] = useState(false);
  const { onChange, id, label, errorMessage, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocus(true);
  };
  return (
    <div className="collegeInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className="error">{errorMessage}</span>
    </div>
  );
};

export default Input;
