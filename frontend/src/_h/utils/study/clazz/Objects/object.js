const user = {
    name: 'j',
    age: 13
}

console.log(user.hasOwnProperty('name'))
console.log(user.__proto__ === Object.prototype)