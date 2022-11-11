const league = (n, a, b) => {
    let answer = 1
    while (a + 1 !== b) {
        a = Math.ceil(a / 2)
        b = Math.ceil(b / 2)
        answer += 1
    }
    return answer
}

league(8, 4, 7)