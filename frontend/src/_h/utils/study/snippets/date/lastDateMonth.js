const lastDateOfMonth = (date = new Date()) => {
    console.log(date.getMonth() + 1)
    let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.toISOString().split('T')[0];
};

lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'