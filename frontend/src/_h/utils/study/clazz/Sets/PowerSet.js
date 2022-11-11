const PowerSetRecursive = (originalSets, allSubSets = [[]], currentSubSet = [], start = 0) => {
    for (let pos = start; pos < originalSets.length; pos += 1) {
        currentSubSet.push(originalSets[pos])

        allSubSets.push([...currentSubSet])

        PowerSetRecursive(originalSets, allSubSets, currentSubSet, pos + 1)

        currentSubSet.pop()
    }

    return allSubSets
}

const powerset = (originalSet) => {
    return PowerSetRecursive(originalSet)
}

const res = powerset([1, 2, 3])
console.log(res)