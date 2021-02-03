

function rollDice(num, sides, modifier = 0){

    let diceTotal = 0
    
    // Roll the dice the specified number of times
    for (i=0; i < num; i++){
        // Modifiers are applied seperately to each roll
        diceTotal += 1 + Math.floor(Math.random() * (sides)) + modifier
    }
        
    return diceTotal

}

function makeAttack(targetAC, advantage = false, disadvantage = false){

    let attackRoll = 0

    if (advantage) {
        let rolls = [rollDice(1,20), rollDice(1,20)]
        console.log(rolls)
        attackRoll = Math.max(...rolls)
    } else if (disadvantage) {
        let rolls = [rollDice(1,20), rollDice(1,20)]
        console.log(rolls)
        attackRoll = Math.min(...rolls)
    } else {
        attackRoll = rollDice(1,20)
    }

    return attackRoll
}

function checkHit(roll, targetAC){
    if (roll > targetAC) {
        return true
    } else {
        return false
    }
}

console.log(makeAttack(12))
console.log(makeAttack(12, advantage = true))
console.log(makeAttack(12, disadvantage = true))
