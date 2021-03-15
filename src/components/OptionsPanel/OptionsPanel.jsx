import React from 'react'

import ScrubInput from '../shared/ScrubInput/ScrubInput.jsx'

const OptionsPanel = ({ac, setAC}) => {




    return(
        <div className="OptionsPanel">
            <input 
                type="range" 
                min="1" 
                max="35" 
                value={ac} 
                id="slider" 
                onChange={(event) => {setAC(event.target.value)}}
            />
            <ScrubInput/>

        </div>
    )
}

export default OptionsPanel