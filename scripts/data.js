import {combatDamage} from './combat.js'

function createDmgDist(damageDice, modifiers, n = 1000){

    let dmgDist = []

    for (let i = 0; i < 1000; i++){
        dmgDist.push({"dmg" : combatDamage(damageDice, modifiers)})
    }

    return dmgDist
}

export {createDmgDist}