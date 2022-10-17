import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Matchelement from './MatchElement/Matchelement';
import "./MatchProfile.css"
import { DataArray } from './DataArray';
import TypeWriter from './TypeWriter/TypeWriter';
import SwipeButton from './SwipeButton/SwipeButton';
import axios from 'axios';
import { isWalletCorrect, signAndSubmitTransaction } from './utilities/aptos';


const Matchprofile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [matchDetails, setMatchDetails] = useState(location.state.matchData);
    const [userDetails, setuserDetails] = useState(location.state.userDetails);
    const [VCTime, setVCTime] = useState(0);

    const handleTimeEntry = async (e) => {
        setVCTime(e.target.value);
    }

    const startVC = async () => {
        if(!Number.isInteger(parseInt(VCTime))){
        alert("Enter correct number in the field");
        return}
        var isItRightWallet = await isWalletCorrect(userDetails.wallet);
        if(!isItRightWallet) {
            alert(`Wrong Wallet. You should switch to ${userDetails.wallet}`);
            return;
        }
        var trans_res = await signAndSubmitTransaction(
            {
                type: "entry_function_payload",
                function: `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWApp::create_private_space_on_chain`,
                arguments: [matchDetails.wallet, parseInt(VCTime)],
                type_arguments: [],
            }
        )
        if(!trans_res.transactionSubmitted) return;
        var postData = {
            content: `CreatePrivateSpace ${matchDetails.Id} ${userDetails.id} ${VCTime}`,
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
          alert("Private VC Created, check the Discord Server ;)");
    }
    return (
        <div className='containerMarginTop1'>
            <div className='containerMarginTop'>
                <Matchelement key={matchDetails.id} name={matchDetails.name} src={matchDetails.src} lastseen={matchDetails.lastseen} onClick={["", console.log]} />
            </div>
            <div>
                <div className='UserDetails'>
                    <div>
                        <label htmlFor="">
                        <TypeWriter text = {`Interest = ${matchDetails.interest.join(', ')}`}/>
                        </label>
                    </div>

                    <div>


                        <label htmlFor="">
                        <TypeWriter text = {`Bio = ${matchDetails.bio}`}/>
                            
                        </label>
                    </div>

                    <div>


                        <label htmlFor="">
                        <TypeWriter text = {`Gender = ${matchDetails.gender}`}/>
                        </label>
                    </div>
                </div>

                <label htmlFor="Time Entry" style={{fontFamily:"Oswald, sans-serif"}}>
                     <TypeWriter text = "Enter Duration Of Your VC in minutes:"/>
                     
                     <input type="text" id="VCTime" className="vcInput" onChange={handleTimeEntry}/>
                </label>

                <button className='buttonMargin' onClick={startVC}> Start Your VC</button>
            </div>


            <button className='buttonMargin' onClick={(e) => navigate('/Userdashboard', {state: {userDetails: userDetails, imageSrc: location.state.imageSrc}})} style={{ margin: "10px" }}>Back</button>
        </div>
    )
}

export default Matchprofile