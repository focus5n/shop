const calcMonthList = {
    1: 11,
    2: 12,
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
    9: 7,
    10: 8,
    11: 9,
    12: 10
}

const daysNameList = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}


const DateToDay = (date) => {
    if (typeof date !== 'string') {
        return new TypeError('Argument is not a string.')
    }

    const [day, month, year] = date.split('/').map((x) => Number(x))

    if (day < 0 || day > 31 || month > 12 || month < 0) {
        return new TypeError("Date is not valid")
    }
    const yearDigit = (year % 100)
    const century = Math.floor(year / 100)
    const weekDay = Math.abs((day + Math.floor((2.6 * calcMonthList[month]) - 0.2) - (2 * century) + yearDigit + Math.floor(yearDigit / 4) + Math.floor(century / 4)) % 7)
    return daysNameList[weekDay]
}

const result = DateToDay("20/7/2022")
console.log(result)