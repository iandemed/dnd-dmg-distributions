
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
        attackRoll = Math.max(...rolls)
    } else if (disadvantage && !advantage) {
        let rolls = [rollDice(1,20, modifier), rollDice(1,20, modifier)]
        attackRoll = Math.min(...rolls)
    } else {
        attackRoll = rollDice(1,20, modifier)
    }
    
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

function combatDamage(targetAC, dice_num, dice_sides, damage_modifier, hit_modifier, advantage = false, disadvantage = false){
    
    let attack = makeAttack(targetAC, hit_modifier, advantage, disadvantage)
    let dmg = 0

    if (attack.success && attack.crit){
        dmg = rollDice(dice_num, dice_sides, damage_modifier) + rollDice(dice_num, dice_sides, damage_modifier)
    } else if (attack.success){
        dmg = rollDice(dice_num, dice_sides, damage_modifier)
    }

    return Math.max(0, dmg)
}

function createDmgDist(targetAC, dice_num, dice_sides, damage_modifier, hit_modifier, advantage, disadvantage, n = 1000){

    let dmgDist = []
    

    for (let i = 0; i < n; i++){
        // I process the data in d3 as a JSON object, so I save the data
        // as an object with dmg as the "column"
        dmgDist.push({"dmg" : combatDamage(targetAC, dice_num, dice_sides, damage_modifier, hit_modifier, advantage, disadvantage)})
    }

    return dmgDist
}

export {createDmgDist}