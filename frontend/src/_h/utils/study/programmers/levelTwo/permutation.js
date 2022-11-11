// function permutation(nums) {
//     const numbers = [...nums]
//     const permutation = []

//     const combi = (arr, res) => {
//         // if(res.length > 0) {
//         //     permutation.push(res)
//         // }

//         // if(arr.length > 0) {
//         //     for(let i = 0; i < arr.length; i += 1) {
//         //         const combos = [...arr]
//         //         combos.splice(i, 1)
//         //         combi(combos, res + arr[i])
//         //     }
//         // }

//         arr.forEach((value, index) => {
//             const combos = [...arr]
//             combos.splice(index, 1)
//             console.log([...value, ...combos])
//         })
//     }

//     combi(numbers, '')

//     console.log(permutation)
// }

// permutation("173")


export default function permutationWithout(permutationOptions) {
    if (permutationOptions.length === 1) {
        return [permutationOptions];
    }

    const permutations = [];

    const smallerPermutations = permutationWithout(permutationOptions.slice(1));

    const firstOption = permutationOptions[0];
    for (let permIndex = 0; permIndex < smallerPermutations.length; permIndex += 1) {
        const smallerPermutation = smallerPermutations[permIndex];

        for (let positionIndex = 0; positionIndex <= smallerPermutation.length; positionIndex += 1) {
            const permutationPrefix = smallerPermutation.slice(0, positionIndex);
            const permutationSuffix = smallerPermutation.slice(positionIndex);
            permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
        }
    }
    console.log(permutations)
    return permutations;
}
const res = permutationWithout([1, 2, 3])