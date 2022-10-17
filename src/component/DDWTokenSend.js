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
        <form>
  <label>
    <input name="enteredAmount" id="enteredAmt" type="text" placeholder="Enter DDW Token Amount" onChange={handleDDWTokenAmountChange}/>
    <span>Enter DDW Token Amount</span>
  </label>
  
  <label>
    <input type="email" placeholder="Enter the recipients address" name="recipientAddress" id="recipientAddress" onChange={handleAddressChange}/>
    <span>Enter the recipients address</span>
  </label>
 
  <input type="submit" value="Send" onSubmit={onTransactionSubmit}/>
</form>
        </>
    )
}

export default DDWTokenSend