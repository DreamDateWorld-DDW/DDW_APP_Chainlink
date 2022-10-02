import React from 'react'
import "./Matchelement.css"

const Matchelement = (props) => {
  const handleOnClick = (e)=> {
        e.preventDefault();
        props.onClick[1](props.onClick[0]);
  }

    return (
    <div onClick={handleOnClick} className="matches" >
        <img src={props.src} alt="" height="100" width="100" style={{borderRadius:"100%", paddingTop:"5px"}}/>
        <h2>{props.name}</h2>
        <h3>{props.lastseen}</h3>

    </div>
  )
}

export default Matchelement