const queryStringToObject = url => {
    return [...new URLSearchParams(url.split('?')[1])].reduce(
        (a, [k, v]) => ((a[k] = v), a), {}
    )
}
const result = queryStringToObject('test?name=1&age=13')
console.log(result)