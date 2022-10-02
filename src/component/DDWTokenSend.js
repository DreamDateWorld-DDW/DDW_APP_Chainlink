import React from 'react'

const DDWTokenSend = () => {
    return (
        <div>
            <div>
                <label htmlFor="">
                    Enter DDW Token Amount :
                    <input type="search" name="enteredAmount" id="enteredAmt" />
                </label>
            </div>

            <div>
                <label htmlFor="">
                    Enter the recipients address :
                    <input type="search" name="recipientAddress" id="recipientAddress" />
                </label>
            </div>

            <div>
                <button type="submit">Send Tokens </button>
            </div>

        </div>
    )
}

export default DDWTokenSend