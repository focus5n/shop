const isEven = (number) => {
    console.log((number & 1))
    return (number & 1) === 0
}

isEven(3)