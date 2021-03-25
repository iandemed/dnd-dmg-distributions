import React from 'react'

import ScrubInput from './shared/ScrubInput.jsx'
import ToggleSwitch from './shared/ToggleSwitch.jsx'

import '../styles/OptionsPanel.css'

const OptionsPanel = ({ac, setAC}) => {


    return(
        <div className="OptionsPanel">
            <ScrubInput
                label="Armor Class"
                stateVar={ac}
                setStateVar={setAC}
            />
            <ToggleSwitch
                label="Adv"
            />
            <ToggleSwitch
                label="Disadv"
            />
        </div>
    )
}

export default OptionsPanel