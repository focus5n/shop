const users = [
    { id: 1, name: 'Lee' },
    { id: 2, name: 'Kim' },
    { id: 2, name: 'Choi' },
    { id: 3, name: 'Park' }
];

const res = users.find((user) => {
    return user.id === 1
})

console.log(res)

function predicate(key, value) {
    return function (item) {
      return item[key] === value;
    };
  }
  
  let index = users.findIndex(predicate('id', 2));
  console.log(index); 