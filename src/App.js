import React, {useState, useEffect } from 'react'
import './styles/App.css'

import DmgDistChart from "./components/DmgDistChart"
import OptionsPanel from "./components/OptionsPanel"
import {createDmgDist} from "./scripts/combat.js"



function App() {

  const metricAccessor = d => d.dmg

  const [ac, setAC] = useState(12)
  const [advantage, setAdvantage] = useState(false)
  const [disadvantage, setDisadvantage] = useState(false)
  const [dice_sides, setDiceSides] = useState(12)
  const [dice_num, setDiceNum] = useState(1)
  const [hit_modifier, setHitModifier] = useState(3)
  const [damage_modifier, setDamageModifier] = useState(1)


  const [dmgData, setDmgData] = useState(createDmgDist(ac, dice_num, dice_sides, damage_modifier, hit_modifier, advantage, disadvantage))

  useEffect(() => {
    setDmgData(createDmgDist(ac, dice_num, dice_sides, damage_modifier, hit_modifier, advantage, disadvantage))
  }, [ac, advantage, disadvantage, damage_modifier, hit_modifier, dice_sides, dice_num])
  
  


 
  return (
    <div className="App">
      <div className="dashboard">
        <div className = "gph-container">
          <h4> Attack Damage Distribution </h4>
          <DmgDistChart
            data = {dmgData}
            xAccessor={metricAccessor}
            label="Damage"
          />
        </div>
        <OptionsPanel
          ac={ac}
          setAC={setAC}
          advantage={advantage}
          setAdvantage={setAdvantage}
          disadvantage={disadvantage}
          setDisadvantage={setDisadvantage}
          dice_sides={dice_sides}
          setDiceSides={setDiceSides}
          dice_num={dice_num}
          setDiceNum={setDiceNum}
          hit_modifier={hit_modifier}
          setHitModifier={setHitModifier}
          damage_modifier={damage_modifier}
          setDamageModifier={setDamageModifier}
        />
      </div>
    </div>
  )
}

export default App
