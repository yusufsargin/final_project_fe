import React from "react";
import "./countbox.css";

const CountBox = ({ count = 0, title }) => {
  return (
    <div className='count-box'>
      <div className='count'>{count}</div>
      <div className='title'>{title}</div>
    </div>
  );
};

export default CountBox;
