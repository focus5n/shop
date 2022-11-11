const LowerCaseConversion = (inputString) => {
    const newString = inputString.split('').map(char => {
        const presentCharCode = char.charCodeAt()

        if (presentCharCode >= 65 && presentCharCode <= 90) {
            console.log(String.fromCharCode(presentCharCode + 32))
            return String.fromCharCode(presentCharCode + 32)
        }
        return char
    })

    return newString.join('')
}

const result = LowerCaseConversion("TESTER")
console.log(result)