const dcMaximumSubArraySum = (arr) => {
    function solveRecursively(elementIndex, mustPick) {
        if (elementIndex >= arr.length) {
            return mustPick ? 0 : -Infinity;
        }
        return Math.max(
            arr[elementIndex] + solveRecursively(elementIndex + 1, true),
            mustPick ? 0 : solveRecursively(elementIndex + 1, false),
        );
    }
    return solveRecursively(0, false);
}

const res = dcMaximumSubArraySum([1, -5, 4])
console.log(res)