import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import Dropdown from './Dropdowm'
import Gender from './Gender'
import "./Profile.css"
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button/Button'
import { write_to_ipfs } from './utilities/web3storage'
import { isWalletCorrect, signAndSubmitTransaction } from './utilities/aptos'

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [imageFile, setImageFile] = useState(null);
    const [userDetails, setuserDetails] = useState({
        name: location.state.name , blockchain: location.state.blockchain, id: location.state.id, wallet: location.state.wallet, bio: " ", interest: [], gender: " ", image: " ",

    });
    const [imageIPFS, setImageIPFS] = useState(null);
    const [infoIPFS, setInfoIPFS] = useState(null);

    const handleInterest = async (values) => {
        setuserDetails({ ...userDetails, interest: values.map((el) => el.label) })
        setInfoIPFS(null)
    }
    const handleGender = async (values) => {
        setuserDetails({ ...userDetails, gender: values[0].label })
        setInfoIPFS(null)
    }

   
    let name, value;

    const handleInputs = async (e) => {
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setuserDetails({ ...userDetails, [name]: value })
        setInfoIPFS(null)
        
    }

    async function callbackFunction(event) {
        console.log(userDetails);
        var ipfs_cid = null;
        var info_ipfs_cid = null;
        if(!imageIPFS)
        {ipfs_cid = await write_to_ipfs([imageFile]);
        setImageIPFS(ipfs_cid);
        console.log("changed image IPFS", ipfs_cid);
        var userDetailsvalue = {...userDetails, "image": ipfs_cid};
        var contents = JSON.stringify(userDetailsvalue);
        var blob = new Blob([contents], { type: "application/json" });
        var file = new File([blob], "userInfo.json", { type: "application/json" });
        info_ipfs_cid = await write_to_ipfs([file]);
        setInfoIPFS(info_ipfs_cid);
        console.log("changed image and changed info IPFS", info_ipfs_cid);
        }
        else if(!infoIPFS) {
        ipfs_cid = imageIPFS;
        var userDetailsvalue = {...userDetails, "image": ipfs_cid};
        var contents = JSON.stringify(userDetailsvalue);
        var blob = new Blob([contents], { type: "application/json" });
        var file = new File([blob], "userInfo.json", { type: "application/json" });
        info_ipfs_cid = await write_to_ipfs([file]);
        setInfoIPFS(info_ipfs_cid);
        console.log("unchanged image and changed info IPFS", info_ipfs_cid);
        }
        else {
            info_ipfs_cid = infoIPFS;
            console.log("unchanged everything", info_ipfs_cid);
        }
        var isItRightWallet = await isWalletCorrect(userDetails.wallet);
        if(!isItRightWallet) {
            alert(`Wrong Wallet. You should switcht to ${userDetails.wallet}`);
            return;
        }
        var trans_res = await signAndSubmitTransaction(
            {
                type: "entry_function_payload",
                function: `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWApp::register`,
                arguments: [info_ipfs_cid],
                type_arguments: [],
            }
        )
        if(!trans_res.transactionSubmitted) return;
        var mongoData = {
            date: new Date(Date.now()),
            discordId: userDetails.id,
            discordName: userDetails.name,
            walletAddress: userDetails.wallet,
            blockchain: userDetails.blockchain,
        }
        var mongo_res = await axios.post(process.env.REACT_APP_MONGODB_API_ENDPOINT, mongoData, 
            {headers: {
              'Content-Type': 'application/json'
            }})
        
            console.log(mongo_res.status);
        var postData = {
            content: `OnRegister ${userDetails.id}`,
            username: "Webhook Message Sender",
            avatarURL: "foo.png"
      
          }
          var res = await axios.post(process.env.REACT_APP_DISCORD_WEBHOOK_URL, postData, 
            {headers: {
              'Content-Type': 'application/json'
            }})
          console.log(res.status);
        navigate("/Userdashboard", {state: {userDetails: userDetails, imageSrc: window.URL.createObjectURL(imageFile)}});
    }
    function previewImage() {
        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            file = new File([file], 'avatar.png');
            console.log(file);
            setImageFile(file);
            setImageIPFS(null);
            reader.readAsDataURL(file);
        }
    }


    

    return (

        <div className='profile' >

            <form onSubmit={handleInputs}>

                <label htmlFor="" className='profileImg' >
                    <img  alt="/" height="100" width="100" />
                    <input type="file" onChange={previewImage}/>
                </label>

                <label htmlFor="" className='p-2'>
                    <p> Name : </p>
                    <input type="text" name='name' readOnly value={userDetails.name} style={{marginBottom:"10px"}} />
                </label>
                <br />
                    Interest
                    <Dropdown onInterest={handleInterest} />
                <br />
                    Gender
                    <Gender gender="male" onGender={handleGender} />
                <br />
                <label htmlFor="Bio">
                    <textarea wrap='off' className='textArea' placeholder="Remember, be nice!" name="bio" id="" cols="50" rows="10" onChange={handleInputs} value={userDetails.bio} >  </textarea>
                </label>

                <Button buttonText = "submit" type="submit" onClick={callbackFunction}/>

            </form>
        </div>
    )
}

export default Profile