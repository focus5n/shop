const zip = (...arrays) => {
    const maxLength = Math.max(...arrays.map(x => x.length))
    const result = Array.from({length: maxLength}).map((_, i) => {
       return Array.from({length: arrays.length}, (_, k) => arrays[k][i])
    })
   console.log(result)
}

zip([1, 2], [3, 4])