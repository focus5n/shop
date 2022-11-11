const decimalToBinary = (num) => {
    const bin = []
    while(num > 0) {
        bin.unshift(num % 2) 
        num >>= 1
    }
    return bin.join('')
}

decimalToBinary(7)