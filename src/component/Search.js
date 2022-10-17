import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getResourceType } from './utilities/aptos';
import { read_from_ipfs } from './utilities/web3storage';
import "./Search.css"
import SwipeButton from './SwipeButton/SwipeButton';

const Search = (props) => {
  const navigate = useNavigate();
    const [searchValue, setsearchValue] = useState();
    const handlechange = async(e) =>{
        setsearchValue(e.target.value);
    }

    const sendValue =async(e) => {
      var mongo_res = await axios.get(process.env.REACT_APP_MONGODB_API_ENDPOINT + `discordName/${searchValue}`);
      if(!mongo_res.data){
        alert("This Discord Account is not Registered")
        document.getElementById("searchDiscord").value = "";
        setsearchValue("")
      }
      var search_info = await getResourceType(mongo_res.data.walletAddress, `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWApp::UserInfo`);
      if(!search_info) {
      return;
      }
      var files = await read_from_ipfs(search_info.data.ipfsCid);
      console.log(files);
      var searchDetails = {};
      let reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = function() {
      searchDetails = JSON.parse(reader.result);
      console.log(searchDetails);
      read_from_ipfs(searchDetails.image).then((search_image_files) => {
          var search_image_src = window.URL.createObjectURL(search_image_files[0]);
          searchDetails.src = search_image_src;
          navigate('/Searchprofile', {state: {searchData: searchDetails, userDetails: props.userDetails, imageSrc: props.imageSrc}})
        })
      }
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