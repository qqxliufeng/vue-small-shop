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
    qq: sessionStorage.getItem('qq'),
    city: sessionStorage.getItem('city')
  },
  isLogin () {
    // return this.state.id !== '' && this.state.id !== null && this.state.token !== '' && this.state.token !== null && this.state.phone !== '' && this.state.phone !== null
    return this.state.id && this.state.token && this.state.phone
  },
  setUserInfo (userInfo) {
    this.state.id = userInfo.id
    this.state.token = userInfo.token
    this.state.phone = userInfo.mobile
    this.state.name = userInfo.username
    this.state.realName = userInfo.realname
    this.state.avatar = userInfo.avatar
    this.state.gender = userInfo.gender
    this.state.email = userInfo.email
    this.state.qq = userInfo.qq
    this.state.city = userInfo.province + userInfo.town
    sessionStorage.setItem('userId', this.state.id)
    sessionStorage.setItem('token', this.state.token)
    sessionStorage.setItem('name', this.state.name)
    sessionStorage.setItem('phone', this.state.phone)
    sessionStorage.setItem('avatar', this.state.avatar)
    sessionStorage.setItem('realName', this.state.realName)
    sessionStorage.setItem('email', this.state.email)
    sessionStorage.setItem('qq', this.state.qq)
    sessionStorage.setItem('gender', this.state.gender)
    sessionStorage.setItem('city', this.state.city)
  },
  setUserInfoAvatar (avatar) {
    this.state.avatar = avatar
    sessionStorage.setItem('avatar', this.state.avatar)
  },
  setUserInfoName (name) {
    this.state.name = name
    sessionStorage.setItem('name', this.state.name)
  },
  setUserInfoRealName (realName) {
    this.state.realName = realName
    sessionStorage.setItem('realName', this.state.realName)
  },
  setUserInfoEmail (email) {
    this.state.email = email
    sessionStorage.setItem('email', this.state.email)
  },
  setUserInfoGender (gender) {
    this.state.gender = gender
    sessionStorage.setItem('gender', this.state.gender)
  },
  setUserInfoQQ (qq) {
    this.state.qq = qq
    sessionStorage.setItem('qq', this.state.qq)
  },
  setUserInfoCity (city) {
    this.state.city = city
    sessionStorage.setItem('city', this.state.city)
  },
  clearInfoAction () {
    this.state.id = ''
    this.state.token = ''
    this.state.phone = ''
    sessionStorage.clear()
    if (localStorage) {
      localStorage.clear()
    }
  }
}

export default userInfo
