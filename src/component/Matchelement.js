import React from 'react'

const Matchelement = (props) => {
  const handleOnClick = (e)=> {
        e.preventDefault();
        props.onClick[1](props.onClick[0]);
  }

    return (
    <div onClick={handleOnClick}>
        <img src={props.src} alt="" height="100" width="100"/>
        <h2>{props.name}</h2>
        <h3>{props.lastseen}</h3>
    </div>
  )
}

export default Matchelement