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
        <div>
            <div>
                <label htmlFor="">
                    Enter the Claimable :
                    <input type="search" name="claimableAmt" id="claimableAmt" onChange={handleChange} />
                </label>
            </div>
            
            <h3>claimable DDW Amount = {amount}</h3>
            <button onClick={sendChange}> Claim </button>
            <hr />
        </div>

    )
}

export default ApprovalToken