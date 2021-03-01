import React, {useEffect} from 'react'

import {drawHistogram} from '../../scripts/drawHistogram.js'


function DmgDistChart(){

    useEffect(() => {
        let banditDmgDice = {
            num: 2,
            sides: 12,
        }
        let banditModifiers = {
            damage: 1,
            hit: 3
        }

        drawHistogram(12, banditDmgDice, banditModifiers)
    },[])

    return(
        <div id="chart-wrapper">
        </div>
    )

}

export default DmgDistChart