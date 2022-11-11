const FileSort = (arr) => {
    const datas = []


    for (let i = 0; i < arr.length; i += 1) {
        const pick = arr[i]
        const firstNum = pick.search(/[0-9]+/)
        const head = pick.slice(0, firstNum)
        const firstStr = pick.slice(firstNum).search(/[a-zA-Z-. ]/)
        const number = pick.slice(firstNum).slice(0, firstStr)
        const tail = pick.slice(firstNum).slice(firstStr)
        datas.push([head, number, tail])
    }
    datas.sort((dataA, dataB) => {
        if (dataA[0].toLowerCase() < dataB[0].toLowerCase()) {
            return -1
        } else if (dataA[0].toLowerCase() > dataB[0].toLowerCase()) {
            return 1
        } else {
            return parseInt(dataA[1]) - parseInt(dataB[1])
        }
    })

    const res = datas.map((data) => data.join(''))

    return res
}



FileSort(["F-49a000 Freedom Fighter.zip", "B-500 Superfortress.test", "A-10 Thunderbolt II", "F-50000 Tomcat"])


// const FileSort = (arr) => {
//     const datas = []
//     for (let i = 0; i < arr.length; i += 1) {
//         const pick = arr[i]
//         const head = pick.split('.')[0].match(/[a-zA-Z]/g).join('')
//         const number = pick.match(/[0-9]/g).join('')
//         const tail = '.' + pick.split('.')[1]
//         datas.push([head, number, tail])
//     }

//     const res = datas.map((data) => data.join(''))
//     return res
// }

