const checkPalindrome = (str) => {
    return str === [...str].reverse().join('')
}