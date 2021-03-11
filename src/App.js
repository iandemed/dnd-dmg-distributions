import React, {useState} from 'react'
import './App.css'

import DmgDistChart from "./components/DmgDistChart/DmgDistChart"
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
  let targetAC = 12

  const [dmgData, setDmgData] = useState(createDmgDist(targetAC, dmgDice, modifiers))



 
  

  return (
    <div className="App">
      <h1> Damage Distribution</h1>
      <div className="Chart__tableau">
        <DmgDistChart
          data = {dmgData}
          xAccessor={metricAccessor}
          label="Damage"
        />
      </div>
    </div>
  )
}

export default App
