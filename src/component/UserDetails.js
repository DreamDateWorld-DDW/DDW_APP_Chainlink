import React from 'react'


const UserDetails = (props) => {
  return (
        <div>
        <img src="https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" alt="Avtar Img" height="50" width="50" style={ {borderRadius :"100%"}} />
                
                <h3 style={{color: "white"}}>Wallet Address : {} </h3>
                <h3>Discord Name : {props.name} </h3>
                <h3>DDW Token Balance :{}  </h3>
                <h3>SBT Token Balance : {} </h3>
        </div>

  )
}

export default UserDetails