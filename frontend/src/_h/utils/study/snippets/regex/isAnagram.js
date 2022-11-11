const isAnangram  = (str1, str2) => {
    const nomalize = str => {
        return str.toLowerCase().replace(/[^a-z0-9]/gi,'').split('').sort().join('')
    }
    const result = nomalize(str1) === nomalize(str2)
    console.log(result)
}

isAnangram('test','stte')