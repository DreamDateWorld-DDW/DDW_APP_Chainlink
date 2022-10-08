import React from 'react'


const UserDetails = (props) => {
  return (
    <div>
        <div>
        <img src="https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" alt="Avtar Img" height="50" width="50" style={ {borderRadius :"100%"}} />
                
                <h3>Wallet Address : {props.userDetails.wallet} </h3>
                <h3>Discord Name : {props.userDetails.name} </h3>
                <h3>DDW Token Balance :{}  </h3>
                <h3>SBT Token Balance : {} </h3>
        </div>

    </div>
  )
}

export default UserDetails