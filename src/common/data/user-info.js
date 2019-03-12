const userInfo = {
  debug: true,
  state: {
    id: sessionStorage.getItem('userId'),
    token: sessionStorage.getItem('token'),
    name: sessionStorage.getItem('name'),
    realName: sessionStorage.getItem('realName'),
    phone: sessionStorage.getItem('phone'),
    avatar: sessionStorage.getItem('avatar'),
    gender: sessionStorage.getItem('gender'),
    email: sessionStorage.getItem('email'),
    qq: sessionStorage.getItem('qq')
  },
  isLogin () {
    // return this.state.id !== '' && this.state.id !== null && this.state.token !== '' && this.state.token !== null && this.state.phone !== '' && this.state.phone !== null
    return this.state.id && this.state.token && this.state.phone
  },
  setUserInfo (userInfo) {
    console.log(userInfo)
    this.state.id = userInfo.id
    this.state.token = userInfo.token
    this.state.phone = userInfo.mobile
    this.state.name = userInfo.username
    this.state.realName = userInfo.realname
    this.state.avatar = userInfo.avatar
    this.state.gender = userInfo.gender
    this.state.email = userInfo.email
    this.state.qq = userInfo.qq
    sessionStorage.setItem('userId', this.state.id)
    sessionStorage.setItem('token', this.state.token)
    sessionStorage.setItem('name', this.state.name)
    sessionStorage.setItem('phone', this.state.phone)
    sessionStorage.setItem('avatar', this.state.avatar)
    sessionStorage.setItem('realName', this.state.realName)
    sessionStorage.setItem('email', this.state.email)
    sessionStorage.setItem('qq', this.state.qq)
    sessionStorage.setItem('gender', this.state.gender)
  },
  clearInfoAction () {
    this.state.id = ''
    this.state.token = ''
    this.state.phone = ''
  }
}

export default userInfo
