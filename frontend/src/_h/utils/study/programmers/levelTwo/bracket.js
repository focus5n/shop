const bracket = (s) => {
    if(s[0] === ')' || s[s.length - 1] === '(') return false
    const stack = []
    stack.push(s[0])
    let start = 1
    while (start < s.length) {
        const pick = stack[stack.length - 1]
        const compare = s[start]
        if (pick === '(' && compare === ')') {
            stack.pop()
        } else {
            stack.push(compare)
        }
        start += 1
        console.log(stack)
    }

    return stack.length === 0 ? true : false
}

bracket('()()')