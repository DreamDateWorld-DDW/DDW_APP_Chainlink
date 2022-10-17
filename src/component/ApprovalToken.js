import { React, useState } from 'react'
import { isWalletCorrect, signAndSubmitTransaction } from './utilities/aptos';


const ApprovalToken = (props) => {
    const [amount, setAmount] = useState();

    const handleChange = (e) => {
        setAmount(e.target.value);
    }
    const sendChange = async () => {
        if(!Number.isInteger(parseInt(amount))){
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
                function: `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWApp::exchange_approval_and_claim_coin`,
                arguments: [parseInt(amount)],
                type_arguments: [],
            }
        )
        if(!trans_res.transactionSubmitted) return;
        document.getElementById("claimableAmt").value = "";
        setAmount("");
        alert("Tokens Claimed");

    }

    return (
        <>
        <form id='formVal'>
  <label id='labelVal'>
    <input id = 'inputVal'  name="claimableAmt" id="claimableAmt" onChange={handleChange} type="text" placeholder="Enter Approval Token Amount"/>
    <span>Enter Approval Token Amount</span>
  </label>
 
  <input onClick={sendChange} type="submit" value="Claim"/>
</form>

</>
    )
}

export default ApprovalToken