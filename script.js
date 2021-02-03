
console.log(makeAttack(12))


let damageDice = {
    num: 1,
    sides: 4,
    modifier: 0
}

// Test logic for advantage and disadvantage
console.log(makeAttack(damageDice, 12, advantage = true, disadvantage = false))
console.log(makeAttack(damageDice, 12, advantage = false, disadvantage = true))
console.log(makeAttack(damageDice, 12, advantage = true, disadvantage = true))

function rollDice(num, sides, modifier = 0){

    let diceTotal = 0
    
    // Roll the dice the specified number of times
    for (i=0; i < num; i++){
        // Modifiers are applied seperately to each roll
        diceTotal += 1 + Math.floor(Math.random() * (sides)) + modifier
    }
        
    return diceTotal

}

function makeAttack(damageDice, targetAC, advantage = false, disadvantage = false){

    let attackRoll = 0

    if (advantage && !disadvantage) {
        let rolls = [rollDice(1,20), rollDice(1,20)]
        console.log(rolls)
        attackRoll = Math.max(...rolls)
    } else if (disadvantage && !advantage) {
        let rolls = [rollDice(1,20), rollDice(1,20)]
        console.log(rolls)
        attackRoll = Math.min(...rolls)
    } else {
        attackRoll = rollDice(1,20)
    }

    console.log(`Attack: ${attackRoll}, AC: ${targetAC}`)
    
    if (checkHit(attackRoll, targetAC)){
        return rollDice(damageDice.num, damageDice.sides, damageDice.modifier)
    } else {
        return 0
    }
}

function checkHit(roll, targetAC){
    if (roll > targetAC) {
        return true
    } else {
        return false
    }
}