const primes = num => {
    let arr = Array.from({length: num - 1}).map((value, index) => index + 2)
    console.log(arr)
    const sqroot = Math.floor(Math.sqrt(num))

    const numsTillSqroot = Array.from({length: sqroot - 1}).map((value, index) => index + 2)
    console.log(numsTillSqroot)
    numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)))
    console.log(arr)
}

primes(100)