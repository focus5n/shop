
const checkWordOccurence = (str) => {
    if(typeof str !== 'string') {
        throw new TypeError('The first param shoud be a string')
    }

    return str.split(/\s+/).reduce((acc, word) => {
        acc[word] = acc[word] + 1 || 1
        return acc
    }, {})
}

const res = checkWordOccurence('test one')
console.log(res)