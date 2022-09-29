import React from 'react'
import "./Navbar.css"
import Profile from './Profile'

function Navbar() {
  return (
    <div>


      <div className='Navbar'>

        <button className='register'>Connect Your Wallet </button>

        <button className='wallet'>Connect Discord </button>

        <button className='discord'>Register </button>


      </div>

      <div>
        <Profile />
      </div>
    </div>
  )
}

export default Navbar