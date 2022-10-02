import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
    <div>
        <label htmlFor="">
        Enter a userName(#0000) : 
              <input type="search" name="searchDiscord" id="searchDiscord"  onChange={handlechange}/>
        
        </label>


        <button type="submit" onClick={sendValue} > Search</button>
    </div>
  )
}

export default Search