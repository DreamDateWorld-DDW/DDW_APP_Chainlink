import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Matchelement from './Matchelement';


const SearchProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setstate] = useState(location.state);
    return (
        <div>
            <div>

            </div>
            <Matchelement key={"fake ID"} name={state} src={"foo.png"} lastseen={"x days"} onClick={["", console.log]} />
            <div>
                <button> Like</button>
                <button> Super Like</button>
            </div>


            <button onClick={(e) => navigate('/Userdashboard')}>Back</button>
        </div>
    )
}

export default SearchProfile