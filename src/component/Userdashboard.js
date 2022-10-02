import React from 'react'
import Matchlist from './Matchlist'
import "./Userdashboard.css"
import Search from './Search';
import DDWTokenSend from './DDWTokenSend';
import ApprovalToken from './ApprovalToken';
import UserDetails from './UserDetails';



const Userdashboard = () => {
    const matches = [
        { lastseen: "6 days ago", id: 1, name: "Leanne Graham", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
        { lastseen: "6 days ago", id: 2, name: "Ervin Howell", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
        { lastseen: "6 days ago", id: 3, name: "Clementine Bauch", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
        { lastseen: "6 days ago", id: 4, name: "Patricia Lebsack", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" }
    ];

    return (
        <div className='usersInfo'>
            <h1>User's Details </h1>

            <div className="userdetails">

                <UserDetails />
            </div>

            <div className="search">
                <Search />
            </div>

            <h1>Send DDW Tokens </h1>
            <div className="tokensend">
                <DDWTokenSend />
            </div>

            <h1>Claim DDW Tokens </h1>
            <div className="approvalToken">
                <ApprovalToken />
            </div>

            <div height="110" width="200" className='match'>

                <Matchlist matches={matches} />
            </div>

        </div>
    )
}

export default Userdashboard