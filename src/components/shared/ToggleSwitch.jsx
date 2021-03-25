import React from 'react'

import "../../styles/ToggleSwitch.css"

const ToggleSwitch = ({label}) => {


    return(
        <div className="switch-wrapper">
            <label 
                className="switch"
                tabIndex="0"
                onKeyDown={(e) => {
                    /*
                       Function allows us to navigate to and interact with the
                       Toggle Switch using the keyboard
                    */
                    if (e.key === "Enter"){
                        let inputTag =  e.target.firstElementChild

                        inputTag.checked = !inputTag.checked

                    }
                }}
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