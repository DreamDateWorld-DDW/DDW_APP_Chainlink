import React from "react";
import "./Matchelement.css";

const Matchelement = (props) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    props.onClick[1](props.onClick[0]);
  };

  return (
    <div onClick={handleOnClick} className="matches">
      <div className="card">
        <img className={props.className} src="https://i.imgur.com/5ffIsuG.png" />
        <h5>Hey There</h5>
        <h3>How is it</h3>
        <div className="card">
          <h5>Tech Enthusiast</h5>
          <h3>Virtual Wiz</h3>
        </div>
      </div>
    </div>
  );
};

export default Matchelement;
