var x = 'global'

function foo() {
    var x = 'local'
    console.log(x)
}

foo()
console.log(x)

var x = 'global';

function foo2() {
  var x = 'local';
  console.log(x);

  function bar() {  // 내부함수
    x = 'loc'
    console.log(x); // ?
  }

  bar();
}
foo2();
console.log(x); // ?

var x = 1

function foo3() {
    var x = 10
    bar()
}

function bar() {
    console.log(x)
}

foo3() //전역함수 1로 가버림

// 함수를 어디서 호출 하였는지에 따라서는 동적 스코프
// 함수를 어디서 선언하였는지 는 렉시컬 스코프 또는 정적스코프
// 자바스크립트는 렉시컬 스코프를 따른다
