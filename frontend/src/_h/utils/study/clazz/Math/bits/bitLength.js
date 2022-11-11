const bitLength = (number) =>{
    let bitCounter = 0
    
    while((1 << bitCounter) <= number) {
        bitCounter += 1
    }
    return bitCounter
}