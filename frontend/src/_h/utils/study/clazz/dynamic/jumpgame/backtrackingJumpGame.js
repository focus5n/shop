

const backtrackingJumpGame = (numbers, startIndex, currentJumps = []) => {
    if (startIndex === numbers.length - 1) {
        return true
    }

    const maxJumpLength = Math.min(numbers[startIndex], numbers.length - 1 - startIndex)

    
}

backtrackingJumpGame([2, 3, 1, 1, 4])