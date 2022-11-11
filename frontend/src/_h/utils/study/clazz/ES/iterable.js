for (const item of ['a', 'b', 'c']) {
    console.log(item)
}

for (const letter of 'abc') {
    console.log(letter)
}

for (const [key, value] of new Map([['a', '1'], ['b', '2'], ['c', '3']])) {
    console.log(`key : ${key} value : ${value}`);
}

// Set
for (const val of new Set([1, 2, 3])) {
    console.log(val);
}

//객체는 이터러블이 아님

const fibonacci = {
    [Symbol.iterator]() {
        let [pre, cur] = [0, 1]

        const max = 10

        return {
            next() {
                [pre, cur] = [cur, pre + cur]
                return {
                    value: cur,
                    done: cur > max
                }
            }
        }
    }
}


for (const num of fibonacci) {
    console.log(num); // 1 2 3 5 8
}

const fibonacciFunc = function (max) {
    let [pre, cur] = [0, 1];

    // Symbol.iterator 메소드와 next 메소드를 소유한
    // 이터러블이면서 이터레이터인 객체를 반환
    return {
        // Symbol.iterator 메소드
        [Symbol.iterator]() {
            return this;
        },
        // next 메소드는 이터레이터 리절트 객체를 반환
        next() {
            [pre, cur] = [cur, pre + cur];
            return {
                value: cur,
                done: cur >= max
            };
        }
    };
};

let iter = fibonacciFunc(10);

// iter는 이터레이터이다.
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: 5, done: false}
console.log(iter.next()); // {value: 8, done: false}
console.log(iter.next()); // {value: 13, done: true}

iter = fibonacciFunc(10);

// iter는 이터러블이다.
for (const num of iter) {
    console.log(num); // 1 2 3 5 8
}

// 무한 이터러블을 생성하는 제네레이터 함수
function* createGenerator() {
    let i = 0
    while (true) {
        yield ++i;
    }
}

for (const n of createGenerator) {
    if (n > 5) break
    console.log(n)
}