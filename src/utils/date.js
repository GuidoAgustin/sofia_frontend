import moment from 'moment'

export function parseToDate(date, isDateTime) {
  if (!date) return null

  if (date instanceof moment) {
    if (!isDateTime) return date.clone().startOf('day').toDate()

    return date.toDate()
  }

  if (date && typeof date === 'string') {
    const dateReg = /^\d{4}-\d{2}-\d{2}$/ // Regex for YYYY-MM-DD
    const dateRegLatin = /^\d{2}-\d{2}-\d{4}$/ // Regex for DD-MM-YYYY
    const dateTime = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/ // Regex for YYYY-MM-DD HH:mm
    const dateTimeLatin = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/ // Regex for DD-MM-YYYY HH:mm

    if (date.match(dateReg)) {
      return moment(date).startOf('day').toDate()
    } else if (date.match(dateRegLatin)) {
      return moment(date, 'DD-MM-YYYY').startOf('day').toDate()
    } else if (date.match(dateTime)) {
      return moment(date, 'DD-MM-YYYY HH:mm').toDate()
    } else if (date.match(dateTimeLatin)) {
      return moment(date, 'DD-MM-YYYY HH:mm').toDate()
    } else {
      return moment(date).toDate()
    }
  }
}
export function parseToString(date, isDateTime) {
  if (!date) return null

  if (!isDateTime) return moment(date).format('YYYY-MM-DD')

  return moment(date).format('YYYY-MM-DD HH:mm')
}
