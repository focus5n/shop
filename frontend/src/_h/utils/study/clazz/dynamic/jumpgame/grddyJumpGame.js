const greedyJumpGame = (numbers) => {
    let goodPosition = numbers.length - 1

    for (let currentIndex = numbers.length - 2; currentIndex >= 0; currentIndex -= 1) {

        const CurrentMaxJumpLength = currentIndex + numbers[currentIndex]
    
        if (CurrentMaxJumpLength >= goodPosition) {
            goodPosition = currentIndex
        }
    }

    return goodPosition === 0
}

const res = greedyJumpGame([2, 3, 1, 1, 4])
console.log(res)