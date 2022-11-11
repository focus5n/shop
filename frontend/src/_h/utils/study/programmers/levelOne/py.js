const py = (str) => {
    const arr = [...str]
    const obj = arr.reduce((acc, value) => {

        if(value.toLowerCase() !== value) {
            value = value.toLowerCase()
        }
        acc[value] = (acc[value] || 0) + 1
        return acc
    }, {})

    return (obj.p === obj.y) ? true : false
}

const result = py("jiji")
console.log(result)

