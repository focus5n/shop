import { boxSizing } from "@mui/system"

function outerFunc() {
    const x = 10
    const innerFunn = () => {
        console.log(x)
    }
    return innerFunn
}

const inner = outerFunc()
inner()


const box = document.querySelector('#box')
const toggle = (function () {
    let isShow = false;

    return function () {
        box.style.display = isShow ? 'block' : 'done'
        isShow = !isShow
    };
})();
box.onclick = toggle

function increase3() {
    let counter = 0
    return counter += 1
}

const increase2 = (function () {

    var counter = 0;

    return function () {
        return ++counter;
    };
}());

function makeCounter(predicate) {
    var counter = 0

    return function() {
        counter = predicate(counter)
        return counter
    };
}

function increase(n) {
    return n += 1
}

function decrease(n) {
    return n -= 1
}

const increaser = makeCounter(increase)
increaser()
increaser()
