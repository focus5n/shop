const validateNumber = n => {
    const num = parseFloat(n);
    return !Number.isNaN(num) && Number.isFinite(num) && Number(n) == n;
}

validateNumber('10'); // true
validateNumber('a'); // false