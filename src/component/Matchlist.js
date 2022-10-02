import React from 'react'
import {useNavigate } from 'react-router-dom';
import Matchelement from './Matchelement';

const Matchlist = (props) => {
    const navigate = useNavigate();
    const handleOnClick =(data) => {
        navigate('/Matchprofile', {state: data})

    }

    return (
        <div>
            {props.matches.map(c => <Matchelement key={c.id} name={c.name} src={c.src} lastseen={c.lastseen} onClick={[c, handleOnClick]}/>)}
        </div>
    );


}

export default Matchlist