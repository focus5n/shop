const getBit = (number, pos) => {
    return (number >> pos) & 1
}

//pos만큼 이동시키고 1이랑 AND