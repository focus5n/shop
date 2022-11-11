const yang = (numbers, signs) => {
    return numbers.map((value, index) => {
        return signs[index] ? value : - value
    }).reduce((acc, value) => acc += value, 0)
}

yang([4, 7, 12], [true, false, true])