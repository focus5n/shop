const maxCharacter = (str, ignorePattern) => {
    if (typeof str !== 'string') {
        throw new TypeError('Argument should be a string')
    } else if (!str) {
        throw new Error('The param should be a nonempty string')
    }

    const occurenceMap = new Map()
    
    for(const char of str) {
        if(!ignorePattern?.test(char)) {
            occurenceMap.set(char, occurenceMap.get(char) + 1 || 0)
        }
    }

    let max = {char: '', occur: -Infinity}

    for(const [char, occur] of occurenceMap) {
        if(occur > max.occur) {
            max = {char, occur}
        }
    }
}