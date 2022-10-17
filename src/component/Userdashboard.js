import React, { useEffect, useState } from 'react'
import Matchlist from './Matchlist'
import "./Userdashboard.css"
import Search from './Search';
import DDWTokenSend from './DDWTokenSend';
import ApprovalToken from './ApprovalToken';
import UserDetails from './UserDetails';
import { useLocation } from 'react-router-dom';
import { getResourceType } from './utilities/aptos';
import { read_from_ipfs } from './utilities/web3storage';



const Userdashboard = () => {
    const location = useLocation();
    var wallet = location.state.userDetails.wallet;
    const [matches, setMatches] = useState([]);

    useEffect(()=>{
        loadMatchesData(wallet);
    }, []);

    const loadMatchesData = async (wallet) => {
        var likes_info = await getResourceType(wallet, `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWApp::LikesInfo`);
        if(!likes_info) return;
        var matchListOnChain = likes_info.data.matchedListOnChain;
        if(matchListOnChain.length === matches.length) return;
        console.log("matchList", matchListOnChain);
        var matchTimestampOnChain = likes_info.data.matchedTimestampListOnChain;
        console.log("matchTime", matchTimestampOnChain);
        var matchListValue = [];
        for(var index = 0; index < matchListOnChain.length; index++) {
                var match_info = await getResourceType(matchListOnChain[index], `${process.env.REACT_APP_APTOS_CONTRACT_OWNER}::DDWApp::UserInfo`);
                if(!match_info) {
                return;
                }
                console.log("loop index outside onload", index);
                var files = await read_from_ipfs(match_info.data.ipfsCid);
                console.log(files);
                var matchDetails = {};
                let reader = new FileReader();
                reader.readAsText(files[0]);
                reader.onload = async function() {
                matchDetails = JSON.parse(reader.result);
                var match_image_files = await read_from_ipfs(matchDetails.image)
                var match_image_src = window.URL.createObjectURL(match_image_files[0]);
                var matched_date = (new Date(parseInt(matchTimestampOnChain[index-1])*1000)).toUTCString();
                matchDetails.src = match_image_src;
                matchDetails.lastseen = `Matched on ${matched_date}`
                matchDetails.Id = matchDetails.id;
                matchDetails.id = index;
                matchListValue.push(matchDetails);
                console.log("loop index inside onload", index);
                if(matchListValue.length === matchListOnChain.length) {
                        
                    setMatches(matchListValue);
                    console.log("set matches", matchListValue);
                 }
                }
            }
    }
    // const matches = [
    //     { lastseen: "6 days ago", id: 1, Id: "989823227599671316", name: "Leanne Graham", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
    //     { lastseen: "6 days ago", id: 2, Id: "989823227599671316", name: "Ervin Howell", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
    //     { lastseen: "6 days ago", id: 3, Id: "989823227599671316", name: "Clementine Bauch", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" },
    //     { lastseen: "6 days ago", id: 4, Id: "989823227599671316", name: "Patricia Lebsack", src: "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg" }
    // ];

    return (
        <div className='usersInfo'>
            <h1>User's Details </h1>

            <div className="userdetails">

                <UserDetails userDetails={location.state.userDetails} imageSrc={location.state.imageSrc}/>
            </div>

            <div className="search">
                <Search userDetails={location.state.userDetails} imageSrc={location.state.imageSrc}/>
            </div>

            <h1>Send DDW Tokens </h1>
            <div className="tokensend">
                <DDWTokenSend userWallet={location.state.userDetails.wallet}/>
            </div>

            <h1>Claim DDW Tokens </h1>
            <div className="approvalToken">
                <ApprovalToken userWallet={location.state.userDetails.wallet}/>
            </div>

            <div height="110" width="200" className='match'>

                <Matchlist matches={Object.values(matches)} userDetails={location.state.userDetails} imageSrc={location.state.imageSrc} />
            </div>

        </div>
    )
}

export default Userdashboard