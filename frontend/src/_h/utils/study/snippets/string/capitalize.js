const capitalize = ([first, ...rest], lowRest = false) => {
    return first.toUpperCase() +
    (lowRest ? rest.join('').toLowerCase() : rest.join(''))
}

capitalize('foobar')

const capitalizeEveryWord = str => {
    const result = str.replace(/\b[a-z]/g, char => char.toUpperCase());
    console.log(result)
}

capitalizeEveryWord('hello world!');