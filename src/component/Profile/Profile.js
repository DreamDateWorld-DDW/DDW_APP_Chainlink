import React from 'react'
import styled from 'styled-components'
import "./Profile.css"

const Scene = styled.div`
    width: 300px;
    height: 300px;
    margin: 75px auto 0;
    perspective: 1200px;
`
const Cube = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    transform-style: preserve-3d;
    transform: translateZ(-150px) rotateX(0deg);
    animation: example 15s linear infinite;
`
const Side = styled.div`
    position: absolute;
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    background-color: rgba(6, 23, 116, 0.986);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 120px 0;
    font: 35px/1 'Trebuchet MS', sans-serif;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.15);
  }
`
const Guide = styled.div`
    position: absolute;
    top: 0;
    left: 50px;
    width: 200px;
    height: 100%;
    border-style: dotted;
    border-width: 0 1px;
    color: rgb(19, 5, 5, 0.15);
    &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 100%;
    border-left: 1px dotted;
  }
`
const Profile = () => {
  return (
    <>
        
        <Scene>
  <Cube>
    <Side className="back">
      <Guide></Guide>
      <span>Nightclub and whiskey are my thing</span>
    </Side>
    <Side className="top">
      <Guide></Guide>
      <span>This is all you wanna know about me</span>
    </Side>
    <Side className="bottom">
      <Guide></Guide>
      <span>A naughty Male</span>
    </Side>
    <Side className="front">
      <Guide></Guide>
      <span>Wink and like to see a surprise</span>
    </Side>
  </Cube>
    </Scene>
    </>
  )
}

export default Profile