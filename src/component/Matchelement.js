import React from 'react'
import styled from 'styled-components'
import Profile from './Profile/Profile'
const Section = styled.div`
margin: auto;
width: 50%;
align-items: center;
margin-top: 17em;
`
const Image = styled.img`
border-radius: 12px;

`
const Matchelement = (props) => {
  const handleOnClick = (e)=> {
        e.preventDefault();
        props.onClick[1](props.onClick[0]);
  }

    return (
    <Section onClick={handleOnClick} className="matches" >
        <Profile/>
        <h2>{props.name}</h2>
        <h3>{props.lastseen}</h3>

    </Section>
  )
}

export default Matchelement