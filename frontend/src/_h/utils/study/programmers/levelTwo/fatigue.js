const fatigue = (k, arr) => {
    const results = []

    if (arr.length === 1) return [arr]

    arr.forEach((select, index) => {
        const rest = [...arr.slice(0, index), ...arr.slice(index + 1)]
        const combos = fatigue(k, rest)

        const data = combos.map((combo) => parseInt(select) + parseInt(combo))
        console.log(data)
        results.push(data)

    })

    return results
}

const res = fatigue(80, [10, 20, 30, 50])
console.log(res)

const permutation = function (arr,) {
    const results = [];
    if (arr.length === 1) return [arr]

    arr.forEach((fixed, index) => {
        const rest = [...arr.slice(0, index), ...arr.slice(index + 1)]
        const permutations = permutation(rest);

        const attached = permutations.map((permutation) => [fixed, ...permutation]);
        results.push(...attached);
    });

    return results;
};


const example = [1, 2, 3];
const result = permutation(example);

const permutation2 = (k, temp) => {
    const nums = [10, 20, 30]
    const result = []
    var backtrack = (i, nums) => {
        if (i === nums.length) {
            result.push(nums.slice());
            return;
        }
        for (let j = i; j < nums.length; j++) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            backtrack(i + 1, nums);
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }
    backtrack(0, nums);
    return result;
}