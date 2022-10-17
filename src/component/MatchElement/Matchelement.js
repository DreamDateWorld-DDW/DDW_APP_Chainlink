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
        <img
          className={props.className}
          src="https://i.imgur.com/5ffIsuG.png"
        />
        <h5 id = "whiteHover" hidden={props.lastseen === "" ? true : false}>Hey There</h5>
        <h3 id = "purpleHover">How is it</h3>
        <div className="card">
        </div>
      </div>
    </div>
  );
};

export default Matchelement;
