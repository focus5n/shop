const typeNumber = (str) => {
    var regex = /\d{6}|\d{4}/;
    return (regex.test(str)) ? true : false
}

const result = typeNumber("443a")
console.log(result)