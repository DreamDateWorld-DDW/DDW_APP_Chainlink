import React from 'react'
import "./DDWTokenSend.css"

const DDWTokenSend = () => {
    return (
        <div>
            <div className='startdiv'>
                <label htmlFor="">
                    Enter DDW Token Amount :
                    <input type="search" name="enteredAmount" id="enteredAmt" />
                </label>
            </div>

            <div className='startdiv'>
                <label htmlFor="">
                    Enter the recipients address :
                    <input type="search" name="recipientAddress" id="recipientAddress" />
                </label>
            </div>

            <div className='startdiv'>
                <button type="submit">Send Tokens </button>
            </div>

        </div>
    )
}

export default DDWTokenSend