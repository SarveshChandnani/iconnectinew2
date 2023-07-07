import React, { useState } from "react";
import "./TextSlider.css";
function TextSlider() {
  const words = [
    { id: 0, value: "Internships available" },
    { id: 1, value: "Internships " },
    { id: 2, value: "Internships available" },
  ];
  const [wordData, setWordData] = useState(words[0].value);
  const handleClick = (index) => {
    console.log(index);
    const wordSlider = words[index].value;
    setWordData(wordSlider);
  };
  return (
    <div className="main">
      <div>" {wordData} "</div>
      <div className="flex_row">
        {words.map((data, i) => (
          <h1 key={i} onClick={() => handleClick(i)}>
            .
          </h1>
        ))}
      </div>
    </div>
  );
}

export default TextSlider;
