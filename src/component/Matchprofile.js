import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Matchelement from './MatchElement/Matchelement';
import "./MatchProfile.css"
import { DataArray } from './DataArray';
import TypeWriter from './TypeWriter/TypeWriter';
import SwipeButton from './SwipeButton/SwipeButton';

const Matchprofile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setstate] = useState("location.state");
    return (
        <div className='containerMarginTop1'>
            <div className='containerMarginTop'>
                <Matchelement interest = {DataArray.interests}  key={"state.id"} name={"state.name"} src={"state.src"} lastseen={"state.lastseen"} onClick={["", console.log]} />
            </div>
            <div>
                <div className='UserDetails'>
                    <div>
                        <label htmlFor="">
                        <TypeWriter text = "Interest = Nightclubs,Whiskey"/>
                        </label>
                    </div>

                    <div>


                        <label htmlFor="">
                        <TypeWriter text = "Bio = This is my bio"/>
                            
                        </label>
                    </div>

                    <div>


                        <label htmlFor="">
                        <TypeWriter text = "Gender = Male"/>
                        </label>
                    </div>
                </div>

                <label htmlFor="Time Entry" style={{fontFamily:"Oswald, sans-serif"}}>
                     <TypeWriter text = "Enter Duration Of Your VC :"/>
                     
                    <input type="text" className='vcInput'/>
                </label>

                <button className='buttonMargin'> Start Your VC</button>
            </div>


            <button className='buttonMargin' onClick={(e) => navigate('/Userdashboard')} style={{ margin: "10px" }}>back</button>
        </div>
    )
}

export default Matchprofile