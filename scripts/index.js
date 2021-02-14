import {drawHistogram} from "./chart.js"


let banditDmgDice = {
    num: 2,
    sides: 12,
}

let banditModifiers = {
    damage: 1,
    hit: 3
}

drawHistogram(banditDmgDice, banditModifiers)