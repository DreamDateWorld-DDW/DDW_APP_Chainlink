import React, { useState } from 'react'
import "./Navbar.css"
import { useNavigate } from "react-router-dom";

function Navbar() {


  const [discordName, setDiscordName] = useState("BashFunkey");
  const navigate = useNavigate();

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
        <button className='register'>Connect Your Wallet </button>
        <button className='wallet'>Connect Discord </button>
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