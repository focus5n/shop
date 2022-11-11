const binaryToDecimal = (binaryString) => {
    let decimalNumber = 0
    const binaryDigits = binaryString.split('').reverse()
    binaryDigits.forEach((binaryDigit, index) => {
        decimalNumber += binaryDigit * (Math.pow(2, index))
    })
    return decimalNumber
}

const result = binaryToDecimal("1011")
console.log(result)