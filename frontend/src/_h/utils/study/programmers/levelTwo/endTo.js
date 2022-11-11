const endTo = (num, words) => {
    const list = []
    const res = words.findIndex((_, index) => {
        if(list.includes(words[index])) {
            return words[index]
        }
        if (index > 0) {
            list.push(words[index - 1], words[index])
            return words[index - 1][words[index - 1].length - 1] !== words[index][0]
        }
    }) + 1
    const answer = !res ? 0 : (res % num === 0) ? num : (res % num)
    return [answer, Math.ceil(res/ num)]
}

const res = endTo(5, ["hello", "observe", "effect", "take", "either", "recognize", "encourage", "ensure", "establish", "hang", "gather", "refer", "reference", "estimate", "executive"])
console.log(res)