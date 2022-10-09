import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
background: transparent;
border-radius: 7px;
border: 2px solid #429ef5;
color: #429ef5;
margin: 0.5em 1em;
padding: 0.25em 1em;
font-size: 1.5em;
height: 2.8em;
&:hover{
  background: palevioletred;
  color: white;
  box-shadow: 0 5px 50px 0 #15f4ee inset, 0 5px 50px 0 #15f4ee,
                0 5px 50px 0 #15f4ee inset, 0 5px 50px 0 #15f4ee;
  text-shadow: 0 0 5px #15f4ee, 0 0 5px #15f4ee;
  transform: translate( 10%) scale(1);
}
`

const Button = (props) => {
  return (
    <Btn onClick={props.onClick}>{props.buttonText}</Btn>
  )
}

export default Button