import React from 'react'

import "../../styles/ToggleSwitch.css"

const ToggleSwitch = ({label}) => {

    return(
        <div className="switch-wrapper">
            <label 
                className="switch"
                tabIndex="0"
            >
                {label}
                <input 
                    type="checkbox"
                />
                <span className="slider"></span>
                <span className="span-label">{label}</span>
            </label>
        </div>
    )

}

export default ToggleSwitch