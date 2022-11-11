function* generate() {
    yield 1
    yield 2
    yield 3
}

let generator = generate()

for(let value of generator) {
    console.log(value)
}