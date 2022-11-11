
let promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("완료"), 1000)
});

console.log(promise.then((res) => console.log(res)))

let names = ['iliakan', 'Violet-Bora-Lee', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
    .then((responses) => {
        for (let response of responses) {
            console.log(response)
        }
        return responses
    }).then(responses => Promise.all(responses.map(r => r.json())))
    .then(users => users.forEach(user => console(user.name)));