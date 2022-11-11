const numbers = [1, 2, 3]
const res = []

numbers.forEach((value, index) => {
    res.push(value)
})

console.log(res)

//배열을 순회하며 각 요소에 대하여 인자로 주어진 콜백함수를 실행
// 콜백 함수의 매개변수를 통해 값, 인덱스, 배열 즉 this를 전달 받을수 있다
// 원본 배열을 변경할수 있다