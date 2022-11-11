let str = '123a'

//숫자가 아닌것만 추출
let temp = str.match(/\D/g)
console.log(temp)

//한국어만 추출(시작과 끝이 한국어로 끝나는지도)
str = '마가나다가'
temp = str.match(/^[ㄱ-ㅎ가-힣]+$/gi)
console.log(temp)

str = 'a123'
temp = str.replace(/[0-9]/g, '')
console.log(temp)


str = 'The car parked ar'
temp = str.match(/ar/g)
console.log(temp)

str = 'The car parked ar'
temp = str.match(/[a-z]*/g)
console.log(temp)

// \s는 공백. 공백이 하나 있거나 없거나
str = 'The fat cat sat on the concatenation.'
temp = str.match(/\s*cat\s*/g)
console.log(temp)

// c로 최소 한 문자열 이상 반복 하고 t로 끝남
str = 'The fat cat sat on the ma.'
temp = str.match(/c.+t/g)
console.log(temp)


// ?은 옵션으로 만듦
str = ' The car is parked in the garage.'
temp = str.match(/[T]?he/g)
console.log(temp)

// 숫자중에서 2~3번 반복되는 숫자만 추출
str = 'The number was 9934.9997 but we rounded it off to 10.0.'
temp = str.match(/[0-9]{2,3}/g)
console.log(temp)

// 숫자중에서 2번 이상 반복되는 숫자만 추출 ,를 제거하면 2번만 반복되는 숫자 추출
str = 'The number was 9934.9997 but we rounded it off to 10.0.'
temp = str.match(/[0-9]{2,}/g)
console.log(temp)

str = 'The car is parked in the garage'
temp = str.match(/(T|t)he|car/g)
console.log(temp)

str = 'The fat cat. sat. on the mat.'
temp = str.match(/(at\.)/g)
console.log(temp)

//$는 문자열중에서 끝인지 확인
str = 'The fat cat. sat. on the mat.'
temp = str.match(/(at\.)$/g)
console.log(temp)

//$는 문자열중에서 끝인지 확인
str = 'The fat cat. sat. on the mat.'
temp = str.match(/.at/g)
console.log(temp)

// . Period mathces any single character except a line break
// [] Character class. Matches any character contained between the square brackets
// [^] Negated character class Matches any character taht is not contained between the squre brackets
// * matchs 0 or more repetions of the preceding symbol
// + matches 1 or more repetions of the preceding symbol
// ? make preceding symbole optional
// {n, m} Braces. mathces at least n but not more than m repetions of the preceding symbole
// (xyz) Character gropup. Matches the characters xyz in taht exact order
// | Alteration. Matches either the characters before or the chracters after the symbol
// \ Escapes the next chracter. this allows you to match reserved characters
// ^ Matches the beginning of the input
// $ Matches the end of the input

// .	Any character except new line
// \w	Matches alphanumeric characters: [a-zA-Z0-9_]
// \W	Matches non-alphanumeric characters: [^\w]
// \d	Matches digits: [0-9]
// \D	Matches non-digits: [^\d]
// \s	Matches whitespace characters: [\t\n\f\r\p{Z}]
// \S	Matches non-whitespace characters: [^\s]