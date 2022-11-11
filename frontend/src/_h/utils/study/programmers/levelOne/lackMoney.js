const lackMoney = (price, money, count) => {
    if(count === 0 || price === 0) return 0
    const sum = Array.from({ length: count }, (value, index) => (price * (index + 1))).reduce((acc, value) => acc + value, 0)
    return (money - sum) > 0 ? 0 : Math.abs(money - sum)
}

lackMoney(0, 20, 4)