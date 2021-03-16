import React from 'react'

import ScrubInput from '../shared/ScrubInput/ScrubInput.jsx'

const OptionsPanel = ({ac, setAC}) => {




    return(
        <div className="OptionsPanel">
            <ScrubInput
                label="Armor Class"
                stateVar={ac}
                setStateVar={setAC}
            />

        </div>
    )
}

export default OptionsPanel