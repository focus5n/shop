function* counter() {
    console.log('첫번째 호출');
    yield 1;                  // 첫번째 호출 시에 이 지점까지 실행된다.
    console.log('두번째 호출');
    yield 2;                  // 두번째 호출 시에 이 지점까지 실행된다.
    console.log('세번째 호출');  // 세번째 호출 시에 이 지점까지 실행된다.
}

const generatorObj = counter();

console.log(generatorObj.next()); // 첫번째 호출 {value: 1, done: false}
console.log(generatorObj.next()); // 두번째 호출 {value: 2, done: false}
console.log(generatorObj.next()); // 세번째 호출 {value: undefined, done: true}


function* counter2() {
    for (const v of [1, 2, 3]) {
        yield v
    }
}

const infiniteFibonacci = (function* () {
    let [pre, cur] = [0, 1];

    while (true) {
        [pre, cur] = [cur, pre + cur];
        yield cur;
    }
}());

// infiniteFibonacci는 무한 이터러블이다.
for (const num of infiniteFibonacci) {
    if (num > 10000) break;
    console.log(num);
}

//제네레이터를 사용해 비동기를 동기처럼 구현하기

function getUser(obj, username) {
    fetch(`test/${username}`)
    .then(res => res.json()) 
    .then(user => obj.next(user.name))
}

const g = (function* () {
    let user 

    user = yield getUser(g, 'test1')
    console.log(user)

    user = yield getUser(g, 'test2')
}());

g.next()

//async await을 이용해 코드 줄이기

async function getUserAll() {
    let user
    user = await getUser('test')
    console.log(user)

    user = await getUser('test2')
    console.log(user)
}

getUserAll()