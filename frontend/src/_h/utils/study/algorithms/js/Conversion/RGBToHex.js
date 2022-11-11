const RGBToHex = (r, g, b) => {
    const toHex = (n) => (n || '0').toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

const result = RGBToHex(13, 11, 12)
