const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

// good
const arr = Array.from(arrLike);
//console.log(arr) //['foo', 'bar', 'baz']

const result = [[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
    const flatten = acc.concat(item);
    return flatten;
});
//console.log(result) // [0,1,2,3,4,5]

function makeCounter() {
    let count = 0

    return function () {
        return count++
    };
}

let counter = makeCounter()
// console.log(counter()) //1
// console.log(counter()) //2
// console.log(counter()) //3

let phrase = "Hell"

function say(name) {
    console.log(phrase, name)
}

//say('test')
// say의 내부 렉시켤 환경은 함수의 인자인 name, say를 실행중일때 외부 렉시컬 환경은 전역 레시컬
// 변수 phrase와 함수 say를 프로퍼티로 갖는다

let name = "test1"

function test() {
    console.log(name)
}

name = "test2"

test()

function makeWorker() {
    let name = "test1"

    return function () {
        name = "test3"
        console.log(name)
    }
}

let name2 = "test2"
let work = makeWorker();
work();

function sum(a) {
    return function (b) {
        return a + b
    }
}

console.log(sum(1)(2))

let x = 1
function func() {
    console.log(x) //error
    //let x = 2
}
func()

function inBetween(a, b) {
    return function (x) {
        return x >= a && x <= b;
    };
}

let arr2 = [1, 2, 3, 4, 5]
console.log(arr2.filter(inBetween(3, 6)))

function inArray(arr) {
    return function (x) {
        return arr.includes(x)
    };
}

console.log(arr2.filter(inArray([1, 2, 10])))

//일반 함수가 화살표 함수와 다른 점
// this를 가지지 않는다, arguments를 가지지 않는다. new와 함께 호출 할 수 없다

