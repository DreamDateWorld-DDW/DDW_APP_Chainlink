import React from 'react'
import Matchlist from './Matchlist'
import "./Userdashboard.css"
import Search from './Search';
import DDWTokenSend from './DDWTokenSend';
import ApprovalToken from './ApprovalToken';
import UserDetails from './UserDetails';
import { useLocation } from 'react-router-dom';



const Userdashboard = () => {
    const location = useLocation();
    const matches = [
        { lastseen: "6 days ago", id: 1, Id: "989823227599671316", name: "Leanne Graham", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
        { lastseen: "6 days ago", id: 2, Id: "989823227599671316", name: "Ervin Howell", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
        { lastseen: "6 days ago", id: 3, Id: "989823227599671316", name: "Clementine Bauch", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
        { lastseen: "6 days ago", id: 4, Id: "989823227599671316", name: "Patricia Lebsack", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" }
    ];

    return (
        <div className='usersInfo'>
            <h1>User's Details </h1>

            <div className="userdetails">

                <UserDetails userDetails={location.state.userDetails} imageSrc={window.URL.createObjectURL(location.state.imageFile)}/>
            </div>

            <div className="search">
                <Search userDetails={location.state.userDetails}/>
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

                <Matchlist matches={matches} userDetails={location.state.userDetails} />
            </div>

        </div>
    )
}

export default Userdashboard