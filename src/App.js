import React, {useState, useEffect } from 'react'
import './App.css'

import DmgDistChart from "./components/DmgDistChart/DmgDistChart"
import OptionsPanel from "./components/OptionsPanel/OptionsPanel"
import {createDmgDist} from "./scripts/combat.js"



function App() {

  const metricAccessor = d => d.dmg

  let dmgDice = {
    num: 2,
    sides: 12,
  }
  let modifiers = {
      damage: 1,
      hit: 3
  }

  const [ac, setAC] = useState(12)
  const [dmgData, setDmgData] = useState(createDmgDist(ac, dmgDice, modifiers))

  useEffect(() => {
    setDmgData(createDmgDist(ac, dmgDice, modifiers))
  }, [ac])
  
  


 
  

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
