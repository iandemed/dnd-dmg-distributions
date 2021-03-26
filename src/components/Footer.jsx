import React from 'react'

import IconLink from './shared/IconLink.jsx'

import '../styles/Footer.css'

import GitHubIcon from "../assets/icons/github-dark-48px.png"
import LinkedInIcon from "../assets/icons/linkedin-dark-48px.png"  
import TwitterIcon from "../assets/icons/twitter-dark-48px.png"
import IandemedBanner from "../assets/iandemed_logo_black.png"

const Footer = () => {
    

    return(
        <footer className="footer">                
            <img src={IandemedBanner} alt="iandemed" className="banner"/>
                
            <div className="">
                <IconLink
                    url = "https://github.com/iandemed/dnd-dmg-distributions"
                    img_src = {GitHubIcon}   
                    img_alt = "Github"
                />
                <IconLink
                    url = "https://www.linkedin.com/in/ian-de-medeiros"
                    img_src = {LinkedInIcon}    
                    img_alt = "LinkedIn"                />
                <IconLink
                    url = "https://twitter.com/iandemed"
                    img_src = {TwitterIcon}    
                    img_alt = "Twitter"
                />
            </div>
        </footer>
    )
}

export default Footer