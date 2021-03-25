import React from 'react'

import ScrubInput from './shared/ScrubInput.jsx'
import ToggleSwitch from './shared/ToggleSwitch.jsx'

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
        </div>
    )
}

export default OptionsPanel