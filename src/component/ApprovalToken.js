import { React, useState } from 'react'


const ApprovalToken = () => {
    const [amount, setAmount] = useState("0");

    const handleChange = (e) => {
        e.preventDefault();
        setAmount((parseInt(e.target.value) * 3).toString());

    }
    const sendChange = (e) => {

    }

    return (
        <>
        <form>
  <label>
    <input name="claimableAmt" id="claimableAmt" onChange={handleChange} type="text" placeholder="Enter Approval Token Amount"/>
    <span>Enter Approval Token Amount</span>
  </label>
  
  <label>
    <span>Claimable DDW Amount : {amount}</span>
  </label>
 
  <input onClick={sendChange} type="submit" value="Claim"/>
</form>

</>
    )
}

export default ApprovalToken