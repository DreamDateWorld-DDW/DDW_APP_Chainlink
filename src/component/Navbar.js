import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import detectEthereumProvider from '@metamask/detect-provider';
import { accountChangeHandler, chainChangedHandler, checkCorrectNetwork, ConnectWalletHandler } from './utilities/contract';
import { checkAndGetAccountAddress, connectToWallet, getAccountAddress, getAptosWallet, getResourceType, getWalletNetwork } from './utilities/aptos';
import { read_from_ipfs } from './utilities/web3storage';

function Navbar() {
 
  useEffect(() => {
    handleDiscordData();
    console.log(window.location.href.split('?')[0]);
  },[]);


  const [discordName, setDiscordName] = useState("Connect Discord");
  const [discordId, setDiscordId] = useState(null);
  const [metamaskWalletAddress, setMetamaskWalletAddress] = useState("Connect Metamask Wallet");
  const [aptosWalletAddress, setAptosWalletAddress] = useState("Connect Aptos Wallet");
  const [blockchain, setBlockchain] = useState(null);
  const [discordConnected, setDiscordConnected] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();

  function handleDiscordData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        // console.log(params);
        if (!params.code) return;
        getInfo(params.code);
  }
  
  async function walletLoginMetamask() {
    if(blockchain==="aptos") {
      alert("Can only Register with one Blockchain");
      window.location.reload();
      return;
    }
    await checkCorrectNetwork();
    let returnArray = await ConnectWalletHandler();
    setMetamaskWalletAddress(returnArray[0]);
    setWalletConnected(true);
    setBlockchain("metamask");
    return returnArray[0];
  }

  async function walletLoginAptos() {
    if(blockchain==="metamask") {
      alert("Can only Register with one Blockchain");
      window.location.reload();
      return;
    }
    let returnValue = await checkAndGetAccountAddress();
    if(returnValue!==null) {
    setAptosWalletAddress(returnValue);
    setWalletConnected(true);
    setBlockchain("aptos");
    }
  }



  async function onProceed() {
    if(walletConnected && discordConnected) {
    navigate("/Profile", { state: { name: discordName, blockchain: blockchain, id: discordId, wallet: blockchain==="metamask"?metamaskWalletAddress:aptosWalletAddress } })
    }
    else
    alert("Connect Wallet and Discord to Proceed");
  }

  async function loginWithAptos() {
    let accountAddress = await checkAndGetAccountAddress();

    if(!accountAddress) return null;

    var resource = await getResourceType(accountAddress, `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWApp::UserInfo`);
    if(!resource) {
      alert("You are not Registered");
      return;
    }
    var files = await read_from_ipfs(resource.data.ipfsCid);
    console.log(files);
    var userDetails = {};
    let reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = function() {
    userDetails = JSON.parse(reader.result);
    console.log(userDetails);
    read_from_ipfs(userDetails.image).then((image_files) => {
      navigate("/Userdashboard", {state: {userDetails: userDetails, imageFile: image_files[0]}});
    })
    };
  }

  const getInfo = async (code) => {
    const accessToken = await getToken(code);
    const userInfo = await getUserInfo(accessToken);
    const guildInfo = await getUserGuilds(accessToken);
    console.log({ userInfo, guildInfo });
    setDiscordName(`${userInfo.username}#${userInfo.discriminator}`)
    setDiscordId(userInfo.id)
    var inGuild = false;
    guildInfo.every(element => {
      if(element.id === process.env.REACT_APP_GUILD_ID){
        inGuild = true;
        setDiscordConnected(true);
        console.log("InGuild")
        return false;
      }
      return true;
    });
    if(inGuild === false){
      alert("You are not in the server, first join")
      window.location.reload();
    }
    var mongo_res = await axios.get(process.env.REACT_APP_MONGODB_API_ENDPOINT + `discordName/${userInfo.username}#${userInfo.discriminator}`);
    if(mongo_res.data){
      alert("This Discord Account is Already Registered")
      window.location.reload()
    }
}

const getToken = async (code) => {
  try {
      const options = new URLSearchParams({
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: window.location.href.split('?')[0].slice(0, -1),
          scope: 'identify guilds',
      });
      const result = await axios.post('https://discord.com/api/oauth2/token', options);
      return result;
  } catch (error) {
      console.log(error.message);
  }
}
const getUserInfo = async (accessToken) => {
  // console.log(accessToken);
  // console.log(`User ${accessToken.data.token_type} ${accessToken.data.access_token}`);
  try {
      const response = await axios.get('https://discord.com/api/users/@me', {
          headers: {
              authorization: `${accessToken.data.token_type} ${accessToken.data.access_token}`
          }
      });
      // console.log(response.data);
      return response.data;
  } catch (error) {
      console.log(error.message);
  }
}
const getUserGuilds = async (accessToken) => {
  // console.log(`Guild ${accessToken.data.token_type} ${accessToken.data.access_token}`);
  try {
      const response = await axios.get('https://discord.com/api/users/@me/guilds', {
          headers: {
              authorization: `${accessToken.data.token_type} ${accessToken.data.access_token}`
          }
      });
      // console.log(response.data);
      return response.data;
  } catch (error) {
      console.log(error.message);
  }
}

detectEthereumProvider().then((provider) => {
  provider.on("accountsChanged", async (newAccount) => {setMetamaskWalletAddress( await accountChangeHandler(newAccount))});
  provider.on("chainChanged", chainChangedHandler);
});
  return (
    <div>
      <div className='Navbar'>
        <div>
        <button className='register'
            onClick={loginWithAptos}>
            Login with Aptos </button>
        </div>

          <div>
            <h1>OR</h1>
          </div>

        <div>
        <a href={process.env.REACT_APP_OAUTH_LINK}>
        <button className='wallet'>{discordName} </button></a>
        <div><button className='register' id='metamask'
        onClick={walletLoginMetamask}> {metamaskWalletAddress} </button>
        /
        <button className='register' id='aptos'
        onClick={walletLoginAptos}> {aptosWalletAddress} </button>
        </div>
        </div>

        <button
          onClick={onProceed} >
          Proceed
        </button>

       

      </div>

    </div>
  )
}

export default Navbar