import React from 'react'
import Matchlist from './Matchlist'
import "./Userdashboard.css"
import Search from './Search';
import DDWTokenSend from './DDWTokenSend';
import ApprovalToken from './ApprovalToken';
import UserDetails from './UserDetails';
import styled from 'styled-components';


const TextField = styled.h1`
padding: 1.3rem;
left: 10%;
margin-right: 7em;
&:hover {
  cursor: pointer;
  transform: scale(1.1) skew(-8deg);
  transition: transform 120ms;
}
`
const Userdashboard = () => {
    const matches = [
        { lastseen: "6 days ago", id: 1, name: "Leanne Graham", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
        { lastseen: "6 days ago", id: 2, name: "Ervin Howell", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
        { lastseen: "6 days ago", id: 3, name: "Clementine Bauch", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
        { lastseen: "6 days ago", id: 4, name: "Patricia Lebsack", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" }
    ];

    return (
        <div className='usersInfo'>
            <TextField >User's Details </TextField>

                <UserDetails />

                <Search />

            <TextField>Send DDW Tokens </TextField>
                <DDWTokenSend />

            <TextField>Claim DDW Tokens </TextField>
                <ApprovalToken />


                <Matchlist matches={matches} />

        </div>
    )
}

export default Userdashboard