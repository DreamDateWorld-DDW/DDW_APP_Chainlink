import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Matchelement from './Matchelement';


const SearchProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setstate] = useState(location.state);
    return (
        <div>
            <div style={{ position: "relative", left: "520px", paddingBottom: "10px", paddingTop: "4px", }}>
                <Matchelement key={"fake ID"} name={state} src={"https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg"}
             lastseen={"x days"} onClick={["", console.log]}  />
            </div>
            <div style={{padding:"3px", marginLeft:"10px"}}>
                <button style={{  margin: "10px" }}> Like</button>
                <button> Super Like</button>
            </div>


            <button onClick={(e) => navigate('/Userdashboard')}>Back</button>
        </div>
    )
}

export default SearchProfile