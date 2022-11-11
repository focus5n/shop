const prime = (nums, count) => {
    const set = getSet(nums, count)
    console.log(set)
    return checkPrime(getSet(nums, count))
}

const getSet = (nums, count) => {

    if (count === 1) {
        return nums
    }

    const res = new Set()
    nums.forEach((value, index) => {
        const set = getSet(
            nums.slice(index + 1),
            count - 1,
        )


        set.forEach((s) => {
            res.add(s + value)
        })

    });

    return [...res];
}

const checkPrime = (nums) => {
    let count = 0

    nums.forEach((num) => {
        let check = true
        for (let i = 2; i <= Math.sqrt(num); i += 1) {
            if (num % i === 0) {
                check = false
                continue;
            }
        }
        if(check) count += 1
    })
    return count
}



const arr = [1, 2, 7, 6 ,4]
const num = 3

const result = prime(arr, num)
console.log(result)



