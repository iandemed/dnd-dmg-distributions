import React, {useState, useEffect } from 'react'
import './styles/App.css'

import DmgDistChart from "./components/DmgDistChart"
import OptionsPanel from "./components/OptionsPanel"
import {createDmgDist} from "./scripts/combat.js"



function App() {

  const metricAccessor = d => d.dmg

  console.log(metricAccessor)

  let dmgDice = {
    num: 1,
    sides: 12,
  }
  let modifiers = {
      damage: 14,
      hit: -2
  }

  const [ac, setAC] = useState(12)
  const [dmgData, setDmgData] = useState(createDmgDist(ac, dmgDice, modifiers))
  const [advantage, setAdvantage] = useState(true)
  const [disadvantage, setDisadvantage] = useState(false)

  useEffect(() => {
    setDmgData(createDmgDist(ac, dmgDice, modifiers, advantage, disadvantage))
  }, [ac, advantage, disadvantage])
  
  


 
  return (
    <div className="App">
      <h1> Damage Distribution</h1>
      <div className="Chart__tableau">
        <DmgDistChart
          data = {dmgData}
          xAccessor={metricAccessor}
          label="Damage"
        />
        <OptionsPanel
          ac={ac}
          setAC={setAC}
        />
      </div>
    </div>
  )
}

export default App
