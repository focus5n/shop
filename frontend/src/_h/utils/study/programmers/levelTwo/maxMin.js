const maxMin = (str) => {
    const arr = str.split(' ').map((s) => s * 1)
    const [min, max] = [Math.min(...arr), Math.max(...arr)]
    return `"${min} ${max}"`
}

maxMin('1 2 3 4')