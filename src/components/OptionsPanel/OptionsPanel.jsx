import React from 'react'

const OptionsPanel = ({ac, setAC}) => {




    return(
        <div className="OptionsPanel">
            <input 
                type="range" 
                min="1" 
                max="35" 
                value={ac} 
                id="slider" 
                onChange={(event) => {setAC(event.target.value)}}/>
        </div>
    )
}

export default OptionsPanel