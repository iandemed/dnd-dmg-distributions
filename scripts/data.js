import {combatDamage} from './combat.js'


let banditDamageDice = {
    num: 1,
    sides: 6,
}

let banditModifiers = {
    damage: 1,
    hit: 3
}

let banditDmgDist = []

for (let i = 0; i < 1000; i++){
    banditDmgDist.push(combatDamage(banditDamageDice, banditModifiers))
}

console.log(banditDmgDist)