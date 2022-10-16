import React from 'react'
import Navbar from './Navbar/Navbar'
import Logo from './Logo/Logo.png'
import styledComponents from 'styled-components'
import BackgroundRiseAndShine from './BackgroundRiseAndShine/BackgroundRiseAndShine'
import styled from 'styled-components'

const Section = styled.section`
width: 100vw;
background: #000;
`
const Image = styledComponents.img`
position: fixed;
top: 5px;
left: 5px;
text-align: left;
margin: 5px
`
const Home = () => {
  return (
    <>
        <Section>
            <Image src={Logo} alt="Logo" height={90} width={90}/>
            <Navbar></Navbar>
            <BackgroundRiseAndShine/>
        </Section>
    </>
  )
}

export default Home