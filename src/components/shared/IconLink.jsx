import React from 'react'

const IconLink = ({url, img_src, img_alt=""}) => {

    return(
        <div className = "icon">
            <a href={url}>
                <img src={img_src} alt={img_alt}/>
            </a>
        </div>

    )

}

export default IconLink