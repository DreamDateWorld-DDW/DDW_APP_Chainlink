import React from 'react'
import { useNavigate } from 'react-router-dom';
import Matchelement from './MatchElement/Matchelement';
import "./Matchlist.css"


const Matchlist = (props) => {
    const navigate = useNavigate();
    const handleOnClick = (data) => {
        navigate('/Matchprofile', { state: data })

    }

    return (
        <div>
            <div className='match'>
            <h1>Matches</h1>

                {props.matches.map(c => <Matchelement key={c.id} name={c.name} src={c.src} lastseen={c.lastseen} onClick={[c, handleOnClick]} />)}
            </div>

        </div>
    );


}

export default Matchlist