import React, { useEffect, useState } from 'react'
import { getResourceType } from './utilities/aptos';




const UserDetails = (props) => {
  const [DDWToken, setDDWToken] = useState(0);
  const [APPToken, setAPPToken] = useState(0);

  useEffect(
    ()=>{
      getDDWBalance();
      getAPPBalance();
    },[]
  )

  const getDDWBalance = async ()=> {
    var resource = await getResourceType(props.userDetails.wallet, `0x1::coin::CoinStore<${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWcoin::CoinType>`);
    if(!resource) {
      return;
    }
    setDDWToken(parseInt(resource.data.coin.value)/10**8);
  }
  const getAPPBalance = async ()=> {
    var resource = await getResourceType(props.userDetails.wallet, `0x1::coin::CoinStore<${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWapproval::CoinType>`);
    if(!resource) {
      return;
    }
    setAPPToken(parseInt(resource.data.coin.value));
  }
  return (
        <div>
        <img src={props.imageSrc} alt="Avtar Img" height="50" width="50" style={ {borderRadius :"100%"}} />
                
                <h3>Wallet Address : {props.userDetails.wallet} </h3>
                <h3>Discord Name : {props.userDetails.name} </h3>
                <h3>DDW Token Balance :{DDWToken}  </h3>
                <h3>APP Token Balance : {APPToken} </h3>
        </div>

  )
}

export default UserDetails