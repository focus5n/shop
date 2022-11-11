const getCurrentTimeKorea = (date = new Date()) => {
    date.setTime(date.getTime() + 9 * 60 * 60000);
    return date.toISOString().split('.')[0].replace('T', ' ')
}

