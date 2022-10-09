import React from 'react'
import Navbar from './Navbar/Navbar'
import Logo from './Logo/Logo.png'
import styledComponents from 'styled-components'

const Section = styledComponents.section`
width: 100vw;
background: black;
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
        </Section>
    </>
  )
}

export default Home