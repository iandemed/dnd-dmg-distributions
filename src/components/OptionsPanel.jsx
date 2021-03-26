import React from 'react'

import ScrubInput from './shared/ScrubInput.jsx'
import ToggleSwitch from './shared/ToggleSwitch.jsx'

import '../styles/OptionsPanel.css'

const OptionsPanel = ({ac, setAC, advantage, setAdvantage, 
    disadvantage, setDisadvantage, dice_sides, setDiceSides,
    dice_num, setDiceNum, hit_modifier, setHitModifier, damage_modifier, setDamageModifier}) => {
    

    return(
        <div className="OptionsPanel">
            <ScrubInput
                label="Armor Class"
                stateVar={ac}
                setStateVar={setAC}
            />

            <h4>Dice:</h4> 

            <ScrubInput
                label="Sides"
                stateVar={dice_sides}
                setStateVar={setDiceSides}
                visual_max={20}
            />
            <ScrubInput
                label="Number"
                stateVar={dice_num}
                setStateVar={setDiceNum}
                visual_max={10}
            />

            <h4>Modifiers:</h4>    
    
            <ScrubInput
                label="Hit"
                stateVar={hit_modifier}
                setStateVar={setHitModifier}
                visual_max={10}
                min_value={-10}
            />
            <ScrubInput
                label="Damage"
                stateVar={damage_modifier}
                setStateVar={setDamageModifier}
                visual_max={10}
                min_value={-10}
            />
            <div>
                <ToggleSwitch
                    label="Adv"
                    stateVar={advantage}
                    setStateVar={setAdvantage}
                />
                <ToggleSwitch
                    label="Disadv"
                    stateVar={disadvantage}
                    setStateVar={setDisadvantage}
                />
            </div>
           
        </div>
    )
}

export default OptionsPanel