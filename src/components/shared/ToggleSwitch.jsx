import React from 'react'

import "../../styles/ToggleSwitch.css"

const ToggleSwitch = ({label}) => {

    return(
        <div>
            <label className="switch">
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