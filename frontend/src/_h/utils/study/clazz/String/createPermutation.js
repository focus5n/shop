const createPermutation = (str) => {
    const arr = [...str]

    const size = arr.length
    const perms = []
    let rest
    let picked
    let restPerms
    let next


    if(size === 0) return [str]

    for(let i = 0; i < size; i += 1) {
        rest = [...arr]
        picked = rest.splice(i, 1)
        restPerms =  createPermutation(rest.join(''))
        
        for(let j = 0; j < restPerms.length; j += 1) {
            next = picked.concat(restPerms[j])
            perms.push(next.join(''))
        }
    }
    return perms
}

const res = createPermutation('abc')
console.log(res)