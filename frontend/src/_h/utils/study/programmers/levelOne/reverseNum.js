const reverseNum = (num) => {
    const str = num.toString()
    const result = [...str].reverse().map((v) => parseInt(v))
    console.log(result)
}

reverseNum(4235123)