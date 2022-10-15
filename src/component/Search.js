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
    <div className="form__group field">
        <label htmlFor="">
              <input placeholder='Enter user name' type="search" name="searchDiscord" id="searchDiscord"  onChange={handlechange} className="form__field" />
        
        </label>

        <div className = "swiperButton">
        <SwipeButton  text = "Search" type="submit" onClick={sendValue} /> 
        </div>
        
    </div>
  )
}

export default Search