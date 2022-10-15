import React from 'react'
import Button from './Button/Button'
import "./DDWTokenSend.css"
import SwipeButton from './SwipeButton/SwipeButton'

const DDWTokenSend = () => {
    return (
        <>
        <form>
  <label>
    <input name="enteredAmount" id="enteredAmt" type="text" placeholder="Enter DDW Token Amount"/>
    <span>Enter DDW Token Amount</span>
  </label>
  
  <label>
    <input type="email" placeholder="Enter the recipients address" name="recipientAddress" id="recipientAddress"/>
    <span>Enter the recipients address</span>
  </label>
 
  <input type="submit" value="Send"/>
</form>
        </>
    )
}

export default DDWTokenSend