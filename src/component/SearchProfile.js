import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Matchelement from './Matchelement';
import { isWalletCorrect, signAndSubmitTransaction } from './utilities/aptos';


const SearchProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchDetails, setSearchDetails] = useState(location.state.searchData);
    const [userDetails, setuserDetails] = useState(location.state.userDetails);

    const onLike = async() => {
        var isItRightWallet = await isWalletCorrect(userDetails.wallet);
        if(!isItRightWallet) {
            alert(`Wrong Wallet. You should switch to ${userDetails.wallet}`);
            return;
        }
        var trans_res = await signAndSubmitTransaction(
            {
                type: "entry_function_payload",
                function: `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWApp::like_on_chain`,
                arguments: [searchDetails.wallet],
                type_arguments: [],
            }
        )
        if(!trans_res.transactionSubmitted) return;
        alert("Liked, now see if they like you back ;)");
        navigate('/Userdashboard', {state: {userDetails: userDetails, imageSrc: location.state.imageSrc}});

    }

    const onSuperLike = async() => {
        var isItRightWallet = await isWalletCorrect(userDetails.wallet);
        if(!isItRightWallet) {
            alert(`Wrong Wallet. You should switch to ${userDetails.wallet}`);
            return;
        }
        var trans_res = await signAndSubmitTransaction(
            {
                type: "entry_function_payload",
                function: `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWApp::super_like_on_chain`,
                arguments: [searchDetails.wallet],
                type_arguments: [],
            }
        )
        if(!trans_res.transactionSubmitted) return;
        alert("Super Liked, now see if they like you back ;)");
        navigate('/Userdashboard', {state: {userDetails: userDetails, imageSrc: location.state.imageSrc}});

    }
    return (
        <div>
            <div style={{ position: "relative", left: "520px", paddingBottom: "10px", paddingTop: "4px", }}>
                <Matchelement key={"fake ID"} name={searchDetails.name} src={searchDetails.src}
             lastseen={""} onClick={["", console.log]}  />
            </div>

            <div className='UserDetails'>
                <div>
                    <label htmlFor="">
                        Interest = {searchDetails.interest.join(", ")}
                    </label>
                </div>

                <div>


                    <label htmlFor="">
                        Bio = {searchDetails.bio}
                    </label>
                </div>

                <div>


                    <label htmlFor="">
                        Gender = {searchDetails.gender}
                    </label>
                </div>
            </div>
            <div style={{padding:"3px", marginLeft:"10px"}}>
                <button onClick={onLike} style={{  margin: "10px" }}> Like</button>
                <button onClick={onSuperLike}> Super Like</button>
            </div>
            


            <button onClick={(e) => navigate('/Userdashboard', {state: {userDetails: userDetails, imageSrc: location.state.imageSrc}})}>Back</button>
        </div>
    )
}

export default SearchProfile