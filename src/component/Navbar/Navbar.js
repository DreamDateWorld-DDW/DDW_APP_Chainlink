import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import detectEthereumProvider from '@metamask/detect-provider';
import { accountChangeHandler, chainChangedHandler, checkCorrectNetwork, ConnectWalletHandler } from '../utilities/contract';
import { checkAndGetAccountAddress, getResourceType, signAndSubmitTransaction } from '../utilities/aptos';
import { read_from_ipfs } from '../utilities/web3storage';
import styled from 'styled-components';
import Button from '../Button/Button';
const Navigation = styled.nav`
top: 50%;
display: flex;
justify-content: space-between;
align-items: center;
width: 35%;
margin-top: 10%;
margin-left: 30%;
z-index: 5;
font-size: 1.1rem;
flex-direction: column;
`
const Heading = styled.h1`
font-size: 1.75em;
color: #429ef5;
justify-content: center;
margin-top: 2.2em;
`
const SectionContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`
const SectionContainerBelow = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
margin-top: 22.2em;
`
const SectionForContainer = styled.div`
display: flex;
`

function Navbar() {
 
  useEffect(() => {
    handleDiscordData();
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
      var resource = await getResourceType(returnValue, `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWApp::UserInfo`);
      if(resource) {
        alert(`address ${returnValue} is already Registered, Switch to a different address`);
        return;
      }
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
  async function onInitialize() {
    await signAndSubmitTransaction(
        {
            type: "entry_function_payload",
            function: `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWcoin::initialize`,
            arguments: ["DDW Coin", "DDW", 8, false],
            type_arguments: [],
        }
    )
    await signAndSubmitTransaction(
      {
          type: "entry_function_payload",
          function: `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWapproval::initialize`,
          arguments: ["DDW Approval Token", "APP", 0, false],
          type_arguments: [],
      }
  )
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
      navigate("/Userdashboard", {state: {userDetails: userDetails, imageSrc: window.URL.createObjectURL(image_files[0])}});
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
      <Navigation >
                  <Heading>Login</Heading>
        <SectionContainer>
        <Button
            buttonText = "Login with Aptos"
            onClick={loginWithAptos}>
             </Button>
            <Heading>OR</Heading>
      <Button buttonText = "Login With Metamask"/>
      </SectionContainer>
      <Heading>Register</Heading>

      <SectionForContainer>
       <a href = "#">
          <Button buttonText = "Join Discord"/>
           </a>
        <a href={process.env.REACT_APP_OAUTH_LINK}>
        <Button buttonText = {discordName}>{discordName} </Button></a>
        <Button
        buttonText = {metamaskWalletAddress}
        onClick={walletLoginMetamask}> {metamaskWalletAddress} </Button>
                  <Heading>OR</Heading>

        <Button
        buttonText = {aptosWalletAddress}
        onClick={walletLoginAptos}> {aptosWalletAddress} </Button>
        </SectionForContainer>

        <SectionForContainer>
        <Button
          buttonText = "Proceed"
          onClick={onProceed} >
        </Button>
        <Button
          buttonText = "Initialize"
          hidden={true}
          onClick={onInitialize} >
        </Button>
        </SectionForContainer>
      </Navigation>

    // </Section>
  )
}

export default Navbar