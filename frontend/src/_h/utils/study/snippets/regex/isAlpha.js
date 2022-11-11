const isAlpha = str => /^[a-zA-z]*$/.test(str)
const isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);

isAlpha('sampleInput'); // true
isAlpha('this Will fail'); // false
isAlpha('123'); // false

isAlphaNumeric('hello123'); // true
isAlphaNumeric('123'); // true
const result = isAlphaNumeric('hello 123'); // false (space character is not alphanumeric)
isAlphaNumeric('#$hello'); // false

