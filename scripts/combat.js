
function rollDice(num, sides, modifier = 0){

    let diceTotal = 0
    
    // Roll the dice the specified number of times
    for (let i=0; i < num; i++){
        // Modifiers are applied seperately to each roll
        diceTotal += 1 + Math.floor(Math.random() * (sides)) + modifier
    }
        
    return diceTotal

}

function checkHit(roll, targetAC){
    if (roll > targetAC) {
        return true
    } else {
        return false
    }
}

function makeAttack(targetAC, modifier, advantage = false, disadvantage = false){

    let attackRoll = 0

    if (advantage && !disadvantage) {
        let rolls = [rollDice(1,20, modifier), rollDice(1,20, modifier)]
        console.log(rolls)
        attackRoll = Math.max(...rolls)
    } else if (disadvantage && !advantage) {
        let rolls = [rollDice(1,20, modifier), rollDice(1,20, modifier)]
        console.log(rolls)
        attackRoll = Math.min(...rolls)
    } else {
        attackRoll = rollDice(1,20, modifier)
    }

    console.log(`Attack: ${attackRoll}, AC: ${targetAC}`)
    
    if (attackRoll - modifier === 20){
        // A natural 20 always results in a successful hit regardless of the roll
        return {success: true, crit: true}
    } else if (attackRoll - modifier === 1){
        // A natural 1 always results in a miss regardless of the roll
        return {success: false, crit: false}
    } else if (checkHit(attackRoll, targetAC)){
        return {success: true, crit: false}
    } else {
        return {success: false, crit: false}
    }
}

function combatDamage(damageDice, modifiers, advantage = false, disadvantage = false){
    
    let attack = makeAttack(12, modifiers.hit, advantage, disadvantage)

    if (attack.success && attack.crit){
        return rollDice(damageDice.num, damageDice.sides, modifiers.damage) + rollDice(damageDice.num, damageDice.sides, modifiers.damage)
    } else if (attack.success){
        return rollDice(damageDice.num, damageDice.sides, modifiers.damage)
    } else {
        return 0
    }
}

export {rollDice, checkHit, makeAttack, combatDamage}