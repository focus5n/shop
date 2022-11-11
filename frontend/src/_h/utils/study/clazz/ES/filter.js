const numbers = [1, 2, 3, 4, 5]

const res = numbers.filter((value, index, self) => {
    return value % 2
})

console.log(res)

// 콜백함수의 실행 결과가 true인 배열 요소의 값만 추출한 새로운 배열을 반환한다
