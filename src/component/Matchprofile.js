import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Matchelement from './Matchelement';


const Matchprofile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setstate] = useState(location.state);
    return (
        <div>
            <div>

            </div>
            <Matchelement key={state.id} name={state.name} src={state.src} lastseen={state.lastseen} onClick={["", console.log]} />
            <div>

            <label htmlFor="Time Entry">
                Enter Duration Of Your VC : 
                <input type="text" />
            </label>

            <button> Start Your VC</button>
            </div>


            <button onClick={(e) => navigate('/Userdashboard')}>Back</button>
        </div>
    )
}

export default Matchprofile