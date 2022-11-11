const maxCharacter = ([...str]) => {
    const map = new Map()

    str.map((val) => {
        return map.set(val, map.get(val) + 1 || 1)
    })

    let max = {char: '', occur: -Infinity}
    
    map.forEach((occur, char) => {
        if(occur > max.occur) {
            max = {char, occur}
        }
    })

    console.log(max)
}

maxCharacter('aabcccd')