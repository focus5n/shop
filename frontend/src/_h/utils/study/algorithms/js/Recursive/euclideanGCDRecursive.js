const euclideanGCDRecursive = (first, second) => {
    if(second === 0) {
        return first
    } else {
        return euclideanGCDRecursive(second, (first % second))
    }
}