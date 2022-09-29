import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Dropdown from './Dropdowm'
import Gender from './Gender'

var userDetailsValue = {}

const Profile = () => {

    const [userDetails, setuserDetails] = useState({
        name: " ", bio: " ", interest: [ ], gender: " ", image: " " 
         
    });

    useEffect (()=> {
        setuserDetails({...userDetails, name:"Vishal"})
    })
    let name, value;

    const handleInputs = async (e) => {
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setuserDetails({ ...userDetails, [name]: value })
        userDetailsValue = { ...userDetails, [name]: value };
        console.log(userDetailsValue);
    }

    const [interest, setInterest] = useState();
   
    return (
        <div className='profile'>
        
        <button>Back</button>
            <form onSubmit={handleInputs}>
                <label htmlFor="Profile"> Profile
                    <input type="file" name='profile' />
                </label>

                <label htmlFor="">
                    Name :
                    <input type="text" name='name' onChange={handleInputs} value={userDetails.name}/>
                </label>

                <label htmlFor=""  >
                    Intest :
                    <Dropdown onInterest={handleInputs}/> 
                </label>
                <label htmlFor="">
                    Gender :
                    <Gender gender="male" value={userDetails.gender} onChange={handleInputs}/>
                </label>
                <label htmlFor="Bio">
                    Bio :
                    <textarea name="bio" id="" cols="30" rows="10" onChange={handleInputs} value={userDetails.bio} >Please update your bio  </textarea>
                </label>

                <button type="submit"  onClick={handleInputs}> Submit</button>

            </form>
        </div>
    )
}

export default Profile