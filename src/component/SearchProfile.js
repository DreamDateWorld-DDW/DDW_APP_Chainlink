import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from './Button/Button';
import Matchelement from './MatchElement/Matchelement';
import SwipeButton from './SwipeButton/SwipeButton';
import TypeWriter from './TypeWriter/TypeWriter';
import "./SearchProfile.css"

const SearchProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setstate] = useState(location.state);
    const [classNameValue, setClassNameValue] = useState("")

    const handleClassNameValueLike = () =>{
        setClassNameValue("rotateProfileElement")
    }
    const handleClassNameValueSuperLike = () => {
        setClassNameValue("rotateProfileElementEaseInOut")
    }
    return (
        <div style={{background: "black", height : "100vh", width : "100vw"}}>
            <div style={{ position: "relative", paddingBottom: "10px", paddingTop: "4px" }} >
                <Matchelement className={classNameValue} key={"fake ID"} name={state} src={"https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg"}
             lastseen={""} onClick={["", console.log]}  />
            </div>

            <div className='UserDetails'>
                <TypeWriter text = "Interest : Nightclubs,Whiskey">
                </TypeWriter>

                <TypeWriter text = "Bio : This is my bio">
                        
                </TypeWriter>

                <TypeWriter text = "Gender : Male" >
                </TypeWriter>
            </div>
            <div style={{display : "flex"}}>
                <SwipeButton onClick = {() => handleClassNameValueLike()} text = "Like"/> 
                <SwipeButton onClick = {() => handleClassNameValueSuperLike()} text = "Super Like"/>
            </div>
            
            <SwipeButton text = "Back" onClick={(e) => navigate('/Userdashboard')}>Back</SwipeButton>
        </div>
    )
}

export default SearchProfile