import React from 'react'

import "../../styles/ToggleSwitch.css"

const ToggleSwitch = ({label, stateVar, setStateVar}) => {

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
                        setStateVar(!inputTag.checked)
                    }
                }}
            >
                {label}
                <input 
                    className="toggle-input"
                    type="checkbox"
                    checked={stateVar}
                    onChange={(e) => {
                        let inputTag =  e.target
                        let value = inputTag.type === 'checkbox' ? inputTag.checked : inputTag.value
                        setStateVar(value)
                    }}

                />
                <span className="slider"></span>
                <span className="span-label">{label}</span>
            </label>
        </div>
    )

}

export default ToggleSwitch