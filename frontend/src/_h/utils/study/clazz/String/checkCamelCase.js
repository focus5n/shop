const checkCamelCase = (name) => {
    if(typeof name !== 'string') {
        throw new TypeError('Argument is not a string')
    }

    const pat = /^[a-z][A-Za-z]*$/
    return pat.test(name)
}
export { checkCamelCase }