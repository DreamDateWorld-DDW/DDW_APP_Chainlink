import React from 'react'
import { useState } from 'react'
import Dropdown from './Dropdowm'
import Gender from './Gender'
import "./Profile.css"
import { useLocation, useNavigate } from 'react-router-dom';

var userDetailsValue = {}

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const [userDetails, setuserDetails] = useState({
        name: location.state.name , id: location.state.id, bio: " ", interest: [], gender: " ", image: " ",

    });

    const handleInterest = async (values) => {
        setuserDetails({ ...userDetails, interest: values })
    }
    const handleGender = async (values) => {
        setuserDetails({ ...userDetails, gender: values })
    }

   
    let name, value;

    const handleInputs = async (e) => {
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setuserDetails({ ...userDetails, [name]: value })
        userDetailsValue = { ...userDetails, [name]: value };
        console.log(userDetailsValue);
        
    }

    async function callbackFunction(event) {
        navigate("/Userdashboard");
    }
    function previewFile() {
        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }


    

    return (

        <div className='profile' >

            <form onSubmit={handleInputs}>

                <label htmlFor="" className='profileImg' >
                    <img  alt="/" height="100" width="100" />
                    <input type="file" onChange={previewFile}/>
                </label>

                <label htmlFor="" className='p-2'>
                    <p> Name : </p>
                    <input type="text" name='name' readOnly value={userDetails.name} style={{marginBottom:"10px"}} />
                </label>
                <br />
                <label htmlFor="" style={{marginTop:"10px"}} >
                    Interest :
                    <Dropdown onInterest={handleInterest} />
                </label>
                <br />
                <label htmlFor="">
                    Gender :
                    <Gender gender="male" onGender={handleGender} />
                </label>
                <br />
                <label htmlFor="Bio">
                    Bio :
                    <textarea name="bio" id="" cols="30" rows="10" onChange={handleInputs} value={userDetails.bio} >Please update your bio  </textarea>
                </label>

                <button type="submit" onClick={callbackFunction}> Submit</button>

            </form>
        </div>
    )
}

export default Profile