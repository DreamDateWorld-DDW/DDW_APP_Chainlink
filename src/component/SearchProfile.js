import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Matchelement from "./Matchelement";
import Button from "./Button/Button";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin: 0 auto;
  min-height: 25vh;
`;

const SearchProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setstate] = useState(location.state);
  return (
    <>
      <Matchelement
        key={"fake ID"}
        name={state}
        src={
          "https://getwallpapers.com/wallpaper/full/9/2/b/1434187-vertical-avatar-movie-wallpaper-hd-1080x1920-laptop.jpg"
        }
        lastseen={""}
        onClick={["", console.log]}
      />
      {/* <div>
        <label htmlFor="">Interest = Nightclubs,Whiskey</label>
      </div>
      <div>
        <label htmlFor="">Bio = This is my bio</label>
      </div>
      <div>
        <label htmlFor="">Gender = Male</label>
      </div> */}

      <Section>
        <Button buttonText="Like" />
        <Button buttonText="Super Like" />
        <Button buttonText="Back" onClick={(e) => navigate("/Userdashboard")} />
      </Section>
    </>
  );
};

export default SearchProfile;
