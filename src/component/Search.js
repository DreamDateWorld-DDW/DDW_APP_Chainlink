import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Search.css"
import SwipeButton from './SwipeButton/SwipeButton';
const Search = () => {
  const navigate = useNavigate();
    const [searchValue, setsearchValue] = useState();
    const handlechange = async(e) =>{
        setsearchValue(e.target.value);
    }

    const sendValue =async(e) => {
        console.log(searchValue);
        navigate('/Searchprofile', {state: searchValue})
    }

  return (
    <>
        {/* <label htmlFor="">
              <input placeholder='Enter user name' type="search" name="searchDiscord" id="searchDiscord"  onChange={handlechange} className="form__field" />
        
        </label> */}
    <form>
        <label>
    <input name="enteredAmount" id="enteredAmt" type="text" placeholder="Enter user name"/>
    <span>Enter user name</span>
  </label>
  <input onClick={sendValue} type="submit" value="Search"/>
  </form>

        {/* <div className = "swiperButton">
        <SwipeButton  text = "Search" type="submit" onClick={sendValue} /> 
        </div> */}
        
    </>
  )
}

export default Search