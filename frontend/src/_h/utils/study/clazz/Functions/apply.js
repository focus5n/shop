var value = 1

var obj = {
    value: 100,
    foo: function () {
        console.log(this.value)

        function bar(a, b) {
            console.log(this)
            console.log(this.value)
        }
        bar.apply(obj, [1, 2])
    }
};

obj.foo()

var Person = function(name) {
    this.name = name
}

var foo = {}

Person.apply(foo, ['name'])
console.log(foo)

function convertArgsToArray() {
    console.log(arguments)

    const arr = Array.prototype.slice.apply(arguments)

    return arr
}

convertArgsToArray(1, 2, 3);