const isAfterDate = (dateA, dateB) => {
    return dateA - dateB
}

isAfterDate(new Date(2022, 10, 21), new Date(2022, 10, 20)) //true