var foo = 123
{
    var foo = 456
}

let foo2 = 123
{
    let foo2 = 456
}

var foo3 = 123
console.log(window.foo)

let foo4 = 123
console.log(window.foo) //var처럼 전역객체가 아님