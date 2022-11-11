const createPermutations = (str) => {
    const arr = str.split('')

    const strLen = arr.length

    const perms = []
    let rest
    let picked
    let restPerms
    let next


    if (strLen === 0) { return [str] }

    for (let i = 0; i < strLen; i++) {
        rest = Object.create(arr)

        picked = rest.splice(i, 1)

        restPerms = createPermutations(rest.join(''))

        for (let j = 0, jLen = restPerms.length; j < jLen; j++) {
            next = picked.concat(restPerms[j])
            perms.push(next.join(''))
        }
    }
    return perms
}


const result = createPermutations("abc")
console.log(result)