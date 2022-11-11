const pipeAsyncFunctions = (...fns) =>
    arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg))

const sum = pipeAsyncFunctions(
    x => x + 1,
    x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
    x => x + 3,
    async x => (await x) + 4
);
(async () => {
    console.log(await sum(5)); // 15 (after one second)
})();

const pipeFunctions = (...fns) => {
    fns.reduce((f, g) => (...args) => g(f(...args)))
}

const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
multiplyAndAdd5(5, 2); // 15