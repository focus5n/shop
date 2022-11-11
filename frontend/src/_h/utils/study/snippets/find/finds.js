const findFirstN = (arr, matcher, n = 1) => {
    let res = []
    for(let i in arr) {
        const el = arr[i]
        const match = matcher(el, i, arr)
        if(match) res.push(match)
        if(res.length === n) return res
    }
    return res
}

const findKeys = (obj, value) => {
    Object.keys(obj).filter(key => obj[key] === value)
}

const ages = {
    Leo: 20,
    Zoey: 21,
    Jane: 20,
  };
  findKeys(ages, 20); // [ 'Leo', 'Jane' ]