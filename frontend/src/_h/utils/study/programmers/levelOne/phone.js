const phone = (str) => {
    let mask = str.slice(0, -4)
    mask = [...mask].map((m) => '*').join('')
    return mask + str.slice(str.length - 4)
}

const result = phone("01033334444")
console.log(result)