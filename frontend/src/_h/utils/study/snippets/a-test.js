//바인드
function test(str) {
    console.log(this.user + str)
}

const user = {
    user: 'hjk'
}

const user2 = {
    user: 'hjk2'
}

test.apply(user, ['!'])

// Promise
Promise.resolve([1, 2, 3])
.then((res) => console.log(res))

const obj = {user, user2}
console.log(obj)