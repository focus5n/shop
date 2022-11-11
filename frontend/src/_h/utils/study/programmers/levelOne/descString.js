const descString = (str) => {
    const result = [...str].sort((a, b) => a < b ? 1 : -1).join('')
    return result
}

descString("Zbcdefg")

