const suit = (n, lost, reserve) => {
    const sl = new Set(lost)
    const sr = new Set(reserve)
    lost = lost.filter((l) => !sr.has(l))
    reserve = reserve.filter((r) => !sl.has(r))


    const result = lost.filter((l) => {
        const filter = reserve.find((r) => Math.abs(r - l) <= 1)
        if(!filter) return true
        reserve = reserve.filter(r => r !== filter)
    })
    return n - result.length
}

suit(5, [1, 2], [2, 3])