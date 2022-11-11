const bind = (fn, context, ...boundArgs) => (...args) => {
    console.log(...args)
    const result = fn.apply(context, [...boundArgs, ...args]);
    console.log(result)
}

function greet(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
}
const freddy = { user: 'fred' };
const freddyBound = bind(greet, freddy);
freddyBound('hi', '!');

const bindKey = (context, fn, ...boundArgs) => (...args) => {
    context[fn].apply(context, [...boundArgs, args])
}

const freddy2 = {
    user: 'fred',
    greet: function (greeting, punctuation) {
        return greeting + ' ' + this.user + punctuation;
    }
};
const freddyBound2 = bindKey(freddy2, 'greet');
console.log(freddyBound2('hi', '!')); 