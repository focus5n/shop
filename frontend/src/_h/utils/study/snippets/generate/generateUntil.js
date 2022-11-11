const generateUntil = function* (seed, condition, next) {
    let val = seed;
    let nextSeed = null;
    while (!condition(val)) {
      nextSeed = yield val;
      val = next(val, nextSeed);
    }
    return val;
  };

const result = [...generateUntil(1, v => v > 5, v => ++v)]; 
console.log(result)
