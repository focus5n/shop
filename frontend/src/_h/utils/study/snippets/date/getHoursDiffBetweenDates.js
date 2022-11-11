const getHoursDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600)

getHoursDiffBetweenDates(
  new Date('2021-04-24 10:25:00'),
  new Date('2021-04-25 10:25:00')
)

const getMinuteDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 60)

const result = getMinuteDiffBetweenDates(
  new Date('2021-04-25 10:25:00'),
  new Date('2021-04-25 10:23:00')
)

console.log(result)