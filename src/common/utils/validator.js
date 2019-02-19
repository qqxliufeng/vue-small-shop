export default {
  phoneReg: /^1(3|4|5|7|8)\d{9}$/,
  isPhone (phone) {
    return this.phoneReg.test(phone)
  }
}
