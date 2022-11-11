const memoize = (func, cache = new Map()) => {
    const jsonReplacer = (_, value) => {
        if(value instanceof Set) {
            return [...value]
        }

        if(value instanceof Map) {
            return Object.fromEntries(value)
        }
        return value
    }
    
    return (...args) => {
        const argsKey = JSON.stringify(args, jsonReplacer)

        if(cache.has(argsKey)) {
            return cache.get(argsKey)
        }

        const result = func(...args)
        cache.set(args, result)
        
        return cache
    }
}

const fibonacci = (number) => {
    return number <= 1 ? 1 : fibonacci(number - 2) + fibonacci(number - 1)
}

const res = memoize(fibonacci)
console.log(res(5))