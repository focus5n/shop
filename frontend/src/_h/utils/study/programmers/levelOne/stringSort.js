const stringSort = (strings, n) => {
    const result = strings.sort((a, b) => {
        if (a.charAt(n) !== b.charAt(n)) {
           return  a.charAt(n) < b.charAt(n) ? -1 : 1
        } else {
            return a < b ? -1 : 1
        }
    })

    return result;
}

stringSort(['ca', 'bb', 'ac'], 1)

