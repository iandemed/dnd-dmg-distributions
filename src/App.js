import React, {useState} from 'react'
import './App.css'

import DmgDistChart from "./components/DmgDistChart/DmgDistChart"
import {createDmgDist} from "./scripts/combat.js"



function App() {

  function handleChange(e){
    setAC(e.target.value)
    console.log(e.target.value)
  }


  let dmgDice = {
    num: 2,
    sides: 12,
  }
  let modifiers = {
      damage: 1,
      hit: 3
  }
  let targetAC = 12

  const [ac, setAC] = useState(12)
  const metricAccessor = d => d.dmg
  const dmgData = createDmgDist(targetAC, dmgDice, modifiers)

  return (
    <div className="App">
        <input 
          type="range" 
          min={1} 
          max={35} 
          value={ac}
          onChange={handleChange}
        />
        <DmgDistChart
          data = {dmgData}
          xAccessor={metricAccessor}
          label="Damage"
        />
    </div>
  )
}

export default App
