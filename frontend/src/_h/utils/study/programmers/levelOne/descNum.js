const descNum = (num) => {
    const str = num.toString()
    return parseInt([...str].sort((a, b) => a < b ? 1 : -1).join(''))
}

descNum(118372)