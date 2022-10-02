import React, { useState } from 'react'
import "./Navbar.css"
import { useNavigate } from "react-router-dom";

function Navbar() {


  const [discordName, setDiscordName] = useState("BashFunkey");
  const navigate = useNavigate();

  return (
    <div>
      <div className='Navbar'>

        <button className='register'>Login with metamask </button>

        <button className='register'>Connect Your Wallet </button>

        <button
          onClick={() => navigate("/Profile", { state: { name: discordName } })} >
          Register
        </button>

        <button className='wallet'>Connect Discord </button>

      </div>

    </div>
  )
}

export default Navbar