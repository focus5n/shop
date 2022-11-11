const notPlayer = (participant, completion) => {
    const result = participant.find()
}

const participant = ['mislav', 'stanko', 'mislav', 'ana']
const completion = ['stanko', 'ana', 'mislav']

notPlayer(participant, completion)

// function notPlayer2(participant, completion) {
//     const result = participant.find(p => !completion[p]--, completion.map(c => completion[c] = (completion[c] | 0) + 1))
// }

// notPlayer2(participant, completion)

// function notPlayer3(participant, completion) {
//     const map = new Map()

//     for (let i = 0; i < participant.length; i++) {
//         const p = participant[i]
//         const c = completion[i]

//         map.set(p, (map.get(p || 1) + 1))
//         map.set(c, (map.get(c || 1) - 1))
//     }

//     for (let [k, v] of map) {
//         if (v > 0) return k
//     }
// }
