//let은 블록스코프이기 var보다는 let을 사용
//bad
var count = 1
if (true) {
  count += 1
}

// good
let countLet = 1
if (true) {
  countLet += 1
}

//let, const는 블록스코프, var는 함수스코프이다
{
  let a = 1
  const b = 1
  var c = 1
  console.log(a) // ReferenceError
  console.log(b) // ReferenceError
  console.log(c) // Prints 1
}


//객체
//bad
const badObjOne = new Object()

//good
const goodObjOne = {}

//bad
const badObjTwo = {
  value: 1,
  addValue: function (value) {
    return badObjTwo.value + value
  },
}

const goodObjTwo = {
  value: 1,
  addValue(value) {
    return goodObjTwo.value + value
  },
}

const lukeSkywalker = 'Luke Skywalker'

// bad
const badObjThree = {
  lukeSkywalker: lukeSkywalker,
}

// good
const goodObjThree = {
  lukeSkywalker,
}

//bad
const key = 1
Object.hasOwnProperty(key)

const obj = {
  name: 'test'
}
Object.prototype.hasOwnProperty.call(obj, key)

const has = Object.prototype.hasOwnProperty
console.log(has.call(obj, key))

//bad
const original = { a: 1, b: 2 }
const copy = Object.assign({}, original, { c: 3 })

//good
const originalTwo = { a: 1, b: 2 }
const copyTwo = { ...original, c: 3 }

//배열
//bad
const itemsBad = new Array()

//good
const itemsGood = []

const stack = []

//bad
stack[stack.length] = 'test'

//good
stack.push('test')

//bad
const len = itemsBad.length
let items = []
let itemsCopy = []
let i

for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i]
}

//good
itemsCopy = [...items]

const foo = document.querySelectorAll('.foo')

// good
const nodesGood = Array.from(foo)

// best
const nodesBad = [...foo]

// 객체를 배열로 바꿀떄
const arrLike = { 0: 'test', 1: 'test2' }

//bad
const arrBad = Array.prototype.slice.call(arrLike)

//good
const arrGood = Array.from(arrLike)

//Destructuring
//bad
function getName(user) {
  const first = user.first
  const last = user.last
}

//good
function getNameTwo(user) {
  const { first, last } = user
}

//good
const arr = [1, 2, , 3, 4]
const [first, second] = arr

// arguments
function concatenateAll(...args) {
  return args.join('')
}

//bad
function Thing(obj) {
  obj = obj || {}
}

function Thing2(obj = {}) { }

//스프리드
//bad
const x = [1, 2, 3, 4, 5]
console.log.apply(console, x)

//good
const x2 = [1, 2, 3, 4, 5]
console.log(...x2)

//bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]))()

new Date(...[2016, 8, 5])

//class, prototype


//good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents]
  }
  pop() {
    const value = this.queue[0]
    this.queue.splice(0, 1)
    return value
  }
}

// 모듈
// bad
// const AirbnbStyleGuide = require('./AirbnbStyleGuide');
// module.exports = AirbnbStyleGuide.es6;

// // ok
// import AirbnbStyleGuide from './AirbnbStyleGuide';
// //export default AirbnbStyleGuide.es6;

// // best
// import { es6 } from './AirbnbStyleGuide';
// export default es6;

// // bad
// import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// // good
// import AirbnbStyleGuide from './AirbnbStyleGuide';

// iterator
const numbers = [1, 2, 3, 4, 5]

//bed
let sum = 0
for (let num of numbers) {
  sum += num
}

//good
let sumTwo = 0
numbers.forEach((num) => {
  sum += num
})

//best(완전 함수 형태)
const sumThree = numbers.reduce((total, num) => total + num, 0)

//property
const user = {
  name: 'test',
  age: 28,
}

//bad
const name = user['name']

//good
const name2 = user.name

//타입
//bad
const str = new String(this.string)

//bad
const strTwo = str.string()

//good
const strTrhee = String(str)

const num = 1
const num1 = parseInt(num);
const num2 = Number(num);

// const와 let은 var처럼 호이스팅 되지 않음
function example() {
  console.log(test)
  const test = true
}

function hoist() {
  test() // error

  var named = function test() {

  }
}

function hoist2() {
  test()

  function test() {

  }
}

// boolean 변환
const age = 0

//bad
const hasAge = new Boolean(age)

//good
const hasAge2 = Boolean(age)

//best
const hasAge3 = !!age

//this 저장 하지 말기

//bad
function thisthat() {
  const that = this
  return function () {
    console.log(that)
  }
}

//good
function thisthat2() {
  return () => {
    console.log(this)
  }
}

//bad
isNaN('1.2')

//good
Number.isNaN('1.2')

