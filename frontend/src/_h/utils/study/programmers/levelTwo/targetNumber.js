const targetNumber = (numbers, target) => {
    let answer = 0
    const targetRecursive = (index, value, check = false) => {
        if (index < numbers.length) {
            targetRecursive(index + 1, value + numbers[index])
            targetRecursive(index + 1, value - numbers[index], true);
        } else {
            console.log(value)
            if (value === target) {
                answer++
            }
        }
    }


    targetRecursive(0, 0)
    console.log(answer)
}

const numbers = [4, 1, 2, 1]
const target = 4
targetNumber(numbers, target)