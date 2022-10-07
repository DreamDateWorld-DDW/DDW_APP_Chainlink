import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ConnectWalletHandler, accountChangeHandler, chainChangedHandler } from "./Wallet"
import detectEthereumProvider from '@metamask/detect-provider';

function Navbar() {
  const [connectWallet, setConnectWallet] = useState("Connect Wallet");
 
  async function connectWalletButton() {
    var returnValue = await ConnectWalletHandler();
    setConnectWallet(returnValue[0]);
  }
  useEffect(() => {
    handleDiscordData();
    console.log(window.location.href.split('?')[0]);

    detectEthereumProvider().then((provider) => {
      provider.on("accountsChanged", accountChangeHandler);
      provider.on("chainChanged", chainChangedHandler);
    });
  })


  const [discordName, setDiscordName] = useState("Connect Discord");
  const navigate = useNavigate();

  function handleDiscordData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        // console.log(params);
        if (!params.code) return;
        getInfo(params.code);
  }

  const getInfo = async (code) => {
    const accessToken = await getToken(code);
    const userInfo = await getUserInfo(accessToken);
    const guildInfo = await getUserGuilds(accessToken);
    console.log({ userInfo, guildInfo });
    setDiscordName(`${userInfo.username}#${userInfo.discriminator}`)
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
  return (
    <div>
      <div className='Navbar'>
        <div>
        <button className='register'
            onClick={() => navigate("/Userdashboard", { state: { name: discordName } })}>
            Login with metamask </button>
        </div>

          <div>
            <h1>OR</h1>
          </div>

        <div>


          <button className='register' onClick={connectWalletButton}>{connectWallet} </button>
        <a href={process.env.REACT_APP_OAUTH_LINK}>
        <button className='wallet'>{discordName} </button></a>
        </div>

        <button
          onClick={() => navigate("/Profile", { state: { name: discordName } })} >
          Register
        </button>

       

      </div>

    </div>
  )
}

export default Navbar