import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import detectEthereumProvider from '@metamask/detect-provider';
import { accountChangeHandler, chainChangedHandler, checkCorrectNetwork, ConnectWalletHandler } from '../utilities/contract';
import styled from 'styled-components';
import Button from '../Button/Button';
const Section = styled.section`
width: 100vw;
background: black;
`
const Navigation = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
width: 85%;
margin: 0 auto;
min-height: 100vh;
`
const Heading = styled.h1`
font-size: 1.75em;
color: #429ef5;
`

function Navbar() {
 
  useEffect(() => {
    handleDiscordData();
    console.log(window.location.href.split('?')[0]);

    detectEthereumProvider().then((provider) => {
      provider.on("accountsChanged", accountChangeHandler);
      provider.on("chainChanged", chainChangedHandler);
    });
  })


  const [discordName, setDiscordName] = useState("Connect Discord");
  const [discordId, setDiscordId] = useState(null);
  const [walletAddress, setWalletAddress] = useState("Connect Wallet")
  const [discordConnected, setDiscordConnected] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();

  function handleDiscordData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if (!params.code) return;
        getInfo(params.code);
  }
  
  async function walletLogin() {
    await checkCorrectNetwork();
    let returnArray = await ConnectWalletHandler();
    setWalletAddress(returnArray[0]);
    setWalletConnected(true);
  }



  async function onRegister() {
    if(walletConnected && discordConnected) {
    var postData = {
      content: `OnRegister ${discordId}`,
      username: "Webhook Message Sender",
      avatarURL: "foo.png"

    }
    var res = await axios.post(process.env.REACT_APP_DISCORD_WEBHOOK_URL, postData, 
      {headers: {
        'Content-Type': 'application/json'
      }})
    console.log(res);
    navigate("/Profile", { state: { name: discordName, id: discordId } })
    }
    else
    alert("Connect Wallet and Discord to Register");
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
  provider.on("accountsChanged", accountChangeHandler);
  provider.on("chainChanged", chainChangedHandler);
});
  return (
    <Section>
      <Navigation >
        <div>
        <Button
            buttonText = "Login with metamask"
            onClick={() => navigate("/Userdashboard", { state: { wallet: walletAddress } })}>
             </Button>
        </div>

          <div>
            <Heading>OR</Heading>
          </div>

        <div>
        <a href={process.env.REACT_APP_OAUTH_LINK}>
        <Button buttonText = {discordName}>{discordName} </Button></a>
        </div>
        <div>
        <Button
        buttonText = {walletAddress}
        onClick={walletLogin}> {walletAddress} </Button>
        </div>

        <Button
          buttonText = "Register"
          onClick={onRegister} >
        </Button>

       

      </Navigation>

    </Section>
  )
}

export default Navbar