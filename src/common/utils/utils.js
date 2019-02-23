export default {
  dateAdd (startDate, num = 1) {
    startDate = new Date(startDate)
    startDate = +startDate + 1000 * 60 * 60 * 24 * num
    startDate = new Date(startDate)
    return startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate()
  }
}
