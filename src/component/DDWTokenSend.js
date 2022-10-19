import React, { useState } from 'react'
import "./DDWTokenSend.css"
import { isWalletCorrect, signAndSubmitTransaction } from './utilities/aptos';
import SwipeButton from './SwipeButton/SwipeButton';

const DDWTokenSend = (props) => {
    const [DDWToken, setDDWToken] = useState();
    const [receiver, setReceiver] = useState();

    const handleDDWTokenAmountChange = async (e) => {
        setDDWToken(e.target.value);
    }

    const handleAddressChange = async (e) => {
        setReceiver(e.target.value);
    }

    const onTransactionSubmit = async (e) => {
        e.preventDefault();
        if(!Number.isInteger(parseInt(DDWToken))){
            alert("Enter correct number in the field");
            return}
        var isItRightWallet = await isWalletCorrect(props.userWallet);
        if(!isItRightWallet) {
            alert(`Wrong Wallet. You should switch to ${props.userWallet}`);
            return;
        }
        var trans_res = await signAndSubmitTransaction(
            {
                type: "entry_function_payload",
                function: `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWApp::transfer_ddw_coin_on_chain`,
                arguments: [receiver, parseInt(DDWToken)*(10**8)],
                type_arguments: [],
            }
        )
        if(!trans_res.transactionSubmitted) return;
        document.getElementById("enteredAmt").value = "";
        document.getElementById("recipientAddress").value = "";
        setDDWToken("")
        setReceiver("");
          alert("Tokens Sent");
    }
    return (
        <>
<div className='container'>
  <form action="/action_page.php">
    <label for="fname">First Name</label>
    <input type="text" id="enteredAmt" name="enteredAmount" placeholder="Enter DDW Token Amount" onChange={handleDDWTokenAmountChange}/>

    <label for="lname">Last Name</label>
    <input type="text" id="recipientAddress" onChange={handleAddressChange} name="recipientAddress" placeholder="Enter the recipients address"/>
  
    <input type="submit" value="Submit" onClick={onTransactionSubmit}/>
  </form>
</div>
        </>
    )
}

export default DDWTokenSend