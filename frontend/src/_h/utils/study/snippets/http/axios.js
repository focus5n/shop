const { cardHeaderClasses } = require("@mui/material")
const { default: axios } = require("axios")


const result = axios.get('https://online.seoulwomen.or.kr/wp-content/plugins/essays/api/api_select_course.php')

async function getResult() {
    const arr = []
    const { data } = await axios.get('https://online.seoulwomen.or.kr/wp-content/plugins/essays/api/api_select_course.php')
    data.data.map((res) => {
        arr.push(res)
    })
    return arr
}
const arr = getResult()
if (arr) console.log(arr.then((res) => console.log(res)))

const data = [
    { 'id': 1 },
    { 'id': 2 },
    { 'id': 3 },
]

const arr2 = []
data.map((res) => {

    arr2.push(res.id)
})
console.log(arr2)



// axios.post('https://www.naver.com', {
//     user: 'user',
//     pass: 'star8903'
// }).then((res) => console.log(res))

// axios.post('https://')