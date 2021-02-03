

function rollDice(num, sides){

    let roll = 0
    
    // Roll the dice the specified number of times
    for (i=0; i < num; i++){
        roll += 1 + Math.floor(Math.random() * (sides))
    }
        
    return roll

}

console.log(rollDice(1,6))
