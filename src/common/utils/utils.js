export default {
  dateAdd (startDate, num = 1) {
    startDate = new Date(startDate)
    startDate = +startDate + 1000 * 60 * 60 * 24 * num
    startDate = new Date(startDate)
    return startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate()
  },
  validator: {
    phoneReg: /^1(3|4|5|7|8)\d{9}$/,
    passwordReg: /^(\w){6,16}$/,
    isPhone (phone) {
      return this.phoneReg.test(phone)
    },
    isPassword (s) {
      return this.passwordReg.test(s)
    }
  }
}
