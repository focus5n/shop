const isPositive = (number) => {
    if(number === 0) {
        return false
    }
    return ((number >> 31) & 1) === 0
}

isPositive(1)