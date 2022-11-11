const res = Promise.resolve([1, 2, 3])
res.then(console.log)

Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log) // [ 1, 2, 3 ]
    .catch(console.log);

const githubIds = ['jeresig', 'ahejlsberg', 'ungmo2'];

Promise.all(githubIds.map(id => fetch(`https://api.github.com/users/${id}`)))
    // [Response, Response, Response] => Promise
    .then(responses => Promise.all(responses.map(res => res.json())))
    // [user, user, user] => Promise
    .then(users => users.map(user => user.name))
    // [ 'John Resig', 'Anders Hejlsberg', 'Ungmo Lee' ]
    .then(console.log)
    .catch(console.log);