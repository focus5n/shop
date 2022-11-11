const filterNonUnique = (arr) => {
    [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i))
}
