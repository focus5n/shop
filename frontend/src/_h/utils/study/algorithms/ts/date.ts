const addDaysToDate = (date: string | number | Date, n: number) => {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

const addMinutesTodate = (date: string | number | Date, n: number) => {
  const d = new Date(date)
  d.setTime(d.getTime() + n * 60000)
  return d.toISOString().split('T')[0].replace('T', ' ')
}

const daysAgo = (n: number) => {
  let d = new Date()
  d.setDate(d.getDate() - Math.abs(n))
  return d.toISOString().split('T')[0]
}

const dayFormNow = (n: number) => {
  let d = new Date()
  d.setDate(d.getDate() + Math.abs(n))
  return d.toISOString().split('T')[0]
}

const dayInMonth = (year: number, month: number) => new Date(year, month, 0).getDate()

const formatDuration = (ms: number) => {
  if (ms < 0) ms = -ms
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  }
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ')
}

const fromTimestamp = (timestamp: number) => {
  return new Date(timestamp * 1000)
}

//fromTimestamp(1602162242); // 2020-10-08T13:04:02.000Z

const getColonTimeFromDate = (date: {toTimeString: () => string | any[]}) =>
  date.toTimeString().slice(0, 8)

const getDaysDiffBetweenDates = (dateIntial: number, dateFinal: number) => {
  ;(dateFinal - dateIntial) / (1000 * 3600 * 24)
}

const getHoursDiffBetweenDates = (dateIntial: number, dateFinal: number) => {
  ;(dateFinal - dateIntial) / (1000 * 3600)
}

const getMeridiemSuffixOfInteger = (num: number) => {
  num === 0 || num == 24
    ? 12 + 'am'
    : num === 12
    ? 12 + 'pm'
    : num < 12
    ? (num % 12) + 'am'
    : (num % 12) + 'pm'
}

const getMonthsDiffBetweenDates = (
  dateInitial: {getFullYear: () => number; getMonth: () => number},
  dateFinal: {getFullYear: () => number; getMonth: () => number}
) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  )

const getSecondsDiffBetweenDates = (dateInitial: number, dateFinal: number) =>
  (dateFinal - dateInitial) / 1000

const getTimeStamp = (date = new Date()) => Math.floor(date.getTime() / 1000)

const getCurrentTimeKorea = (date = new Date()) => {
  date.setTime(date.getTime() + 9 * 60 * 60000)
  console.log(date.toISOString().split('.')[0].replace('T', ' '))
}

const isAfterDate = (dateA: Date, dateB: Date) => {
  return dateA > dateB
}

//isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); // true

const isBetweenDates = (dateStart: Date, dateEnd: Date, date: Date) => {
  date > dateStart && date < dateEnd
}

const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return d.toISOString().split('T')[0]
}

const maxDate = (...dates: any[]) => new Date(Math.max(...dates))

export {
  maxDate,
  lastDateOfMonth,
  isBetweenDates,
  isAfterDate,
  getCurrentTimeKorea,
  getTimeStamp,
  getSecondsDiffBetweenDates,
  getMonthsDiffBetweenDates,
  getMeridiemSuffixOfInteger,
  getHoursDiffBetweenDates,
  getDaysDiffBetweenDates,
  getColonTimeFromDate,
  fromTimestamp,
  formatDuration,
  dayInMonth,
  addMinutesTodate,
  addDaysToDate,
  daysAgo,
  dayFormNow,
}
