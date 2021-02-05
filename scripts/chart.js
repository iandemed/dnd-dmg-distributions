import {combatDamage} from './combat.js'

let damageDice = {
    num: 1,
    sides: 4,
}

let modifiers = {
    damage: 0,
    hit: 0
}


// Test logic for advantage and disadvantage
console.log(combatDamage(damageDice, modifiers, true, true))
console.log(combatDamage(damageDice, modifiers, true, false))
console.log(combatDamage(damageDice, modifiers, false, true))