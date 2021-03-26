import React from 'react'

import IconLink from './shared/IconLink.jsx'

import '../styles/Footer.css'

const Footer = () => {
    

    return(
        <footer className="footer">                
            <img src="/iandemed_logo_white.png" alt="iandemed"/>
                
            <div className="">
                <IconLink
                    url = "https://github.com/iandemed"
                    img_src = "/icons/github-dark-48px.png"   
                    img_alt = "Github"
                />
                <IconLink
                    url = "https://www.linkedin.com/in/ian-de-medeiros"
                    img_src = "/icons/linkedin-dark-48px.png"    
                    img_alt = "LinkedIn"                />
                <IconLink
                    url = "https://twitter.com/iandemed"
                    img_src = "/icons/twitter-dark-48px.png"    
                    img_alt = "Twitter"
                />
            </div>
        </footer>
    )
}

export default Footer