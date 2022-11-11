
const collatz = (num) => {
    const res = []

    while (num !== 1) {
        if (num % 2 === 0) {
          num = num / 2
        } else {
          num = 3 * num + 1
        }
    
        res.push(num)
      }
    
      return { result: num, res: res }
}