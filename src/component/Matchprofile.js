import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Matchelement from './Matchelement';
import axios from 'axios';


const Matchprofile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setstate] = useState(location.state.data);
    const [userDetails, setuserDetails] = useState(location.state.userDetails);
    const [VCTime, setVCTime] = useState(0);

    const handleTimeEntry = async (e) => {
        setVCTime(e.target.value);
    }

    const startVC = async () => {
        if(!Number.isInteger(parseInt(VCTime))){
        alert("Enter correct number in the field");
        return}
        var postData = {
            content: `CreatePrivateSpace ${state.Id} ${userDetails.id} ${VCTime}`,
            username: "Webhook Message Sender",
            avatarURL: "foo.png"
      
          }
          var res = await axios.post(process.env.REACT_APP_DISCORD_WEBHOOK_URL, postData, 
            {headers: {
              'Content-Type': 'application/json'
            }})
          console.log(res.status);
          document.getElementById("VCTime").value = "";
          setVCTime("")
    }
    return (
        <div>
            <div style={{ position: "relative", left: "520px", paddingBottom: "10px", paddingTop: "4px", }}>
                <Matchelement key={state.id} name={state.name} src={state.src} lastseen={state.lastseen} onClick={["", console.log]} />
            </div>
            <div>
                <div className='UserDetails'>
                    <div>
                        <label htmlFor="">
                            Interest = Nightclubs,Whiskey
                        </label>
                    </div>

                    <div>


                        <label htmlFor="">
                            Bio = This is my bio
                        </label>
                    </div>

                    <div>


                        <label htmlFor="">
                            Gender = Male
                        </label>
                    </div>
                </div>

                <label htmlFor="Time Entry">
                    Enter Duration Of Your VC in minutes:
                    <input type="text" id="VCTime" onChange={handleTimeEntry}/>
                </label>

                <button onClick={startVC}> Start Your VC</button>
            </div>


            <button onClick={(e) => navigate('/Userdashboard')} style={{ margin: "10px" }}>Back</button>
        </div>
    )
}

export default Matchprofile