//bad
function Person(name) {
    this.name = name
}

Person.prototype.doSome = function(callback) {
    if(typeof callback === 'function') {
        callback.bind(this)()
        callback.call(this)
    }
};

function foo() {
    console.log(this.name)
}

var p = new Person('test')
p.doSome(foo)

//good