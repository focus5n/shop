
const pad = (num, padlen) => {
  const pad = new Array(1 + padlen).join(0)
  return (pad + num).slice(-pad.length)
}

const hexLookup = (bin) => {
  let binary = bin
  if (binary.length < 4) {
    binary = pad(binary, 4)
  }
  switch (binary) {
    case '0000': return '0'
    case '0001': return '1'
    case '0010': return '2'
    case '0011': return '3'
    case '0100': return '4'
    case '0101': return '5'
    case '0110': return '6'
    case '0111': return '7'
    case '1000': return '8'
    case '1001': return '9'
    case '1010': return 'A'
    case '1011': return 'B'
    case '1100': return 'C'
    case '1101': return 'D'
    case '1110': return 'E'
    case '1111': return 'F'
  }
}
const binaryToHex = (binaryString) => {


  let result = ''
  binaryString = binaryString.split('')
  for (let i = binaryString.length - 1; i >= 0; i = i - 4) {
    if (i >= 3) {
      result += hexLookup(binaryString.slice(i - 3, i + 1).join(''))
    } else {
      result += hexLookup(binaryString.slice(0, i + 1).join(''))
    }
  }
  return result.split('').reverse().join('')
}

const result = binaryToHex("1111")
console.log(result)