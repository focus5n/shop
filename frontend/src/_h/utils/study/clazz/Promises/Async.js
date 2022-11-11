async function f() {
    return 1
}

f().then(console.log)

async function showAvatar() {
    let response = await fetch('test')
    let user = await response.json()

    await new Promise((resolve, reject) => setTimeout(resolve, 3000))
    return user
}

async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 10
}


function f2() {
    wait().then(result => console.log(result))
}