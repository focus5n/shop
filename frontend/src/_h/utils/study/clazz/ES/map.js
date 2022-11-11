const numbers = [1, 2, 3]
const res = numbers.map((value, index) => value + 1)
console.log(res)

// 콜백 함수의 반환값으로 새로운 배열을 생성하여 반환함
// forEach메소드는 배열을 순회하며 요소 값을 참조하여 무언가를 하기 위한 함수이며 map 메소드는
// 배열을 순회하며 요소값을 다른 값으로 맵핑하기 위한 함수이다