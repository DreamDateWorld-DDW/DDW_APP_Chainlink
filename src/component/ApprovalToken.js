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
                    Enter Approval Token Amount :
                    <input type="search" name="claimableAmt" id="claimableAmt" onChange={handleChange} />
                </label>
            </div>
            
            <p>Claimable DDW Amount : {amount}</p>
            <button onClick={sendChange}> Claim </button>

        </div>

    )
}

export default ApprovalToken