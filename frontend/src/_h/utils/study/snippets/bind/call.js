const call = (key, ...args) => context => {
    console.log(context)
    console.log(...args)
    console.log(context[key](...args))
    return context[key](...args);
}

Promise.resolve([1, 2, 3])
.then(call('map', x => 2 * x))
.then(console.log)