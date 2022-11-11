const primeNum = (length) => {
    const arr = Array.from({length: length}).fill(true)
    let num = 2;
    while(num <= length) {
        let multi = 2
        let index = num * multi
        while(index <= length) {
            arr[index - 1] = false
            multi += 1
            index = num * multi
        }
        num += 1
    }
    arr[0] = false
    return arr.filter((value) => value === true).length
}

primeNum(10)