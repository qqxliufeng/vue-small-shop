const userInfo = {
  debug: true,
  state: {
    id: sessionStorage.getItem('userId'),
    name: sessionStorage.getItem('userName'),
    phone: sessionStorage.getItem('userPhone')
  },
  isLogin () {
    return this.state.id && this.state.id !== '0'
  },
  setUserInfo () {
    this.state.id = '1'
    this.state.phone = '12233435543534'
    this.state.name = '哈哈'
    sessionStorage.setItem('userId', '1')
    sessionStorage.setItem('userName', '哈哈')
    sessionStorage.setItem('userPhone', '13453333')
  },
  clearInfoAction () {
    this.state.id = '0'
    this.state.name = null
  }
}

export default userInfo
