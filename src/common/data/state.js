let defaultCity = {
  value: '济南市',
  code: 100
}
let currentCity = defaultCity
let token = ''
let identity = '1'
let storeId = '1'
try {
  if (localStorage) {
    currentCity = JSON.parse(localStorage.getItem('currentCity')) || defaultCity
    token = localStorage.getItem('token')
    identity = localStorage.getItem('identity')
    storeId = localStorage.getItem('storeId')
  }
} catch (error) {
  console.log(error)
}

export default {
  currentCity,
  token,
  identity,
  storeId,
  changeCity (city) {
    this.currentCity = city
    try {
      localStorage.setItem('currentCity', JSON.stringify(city))
    } catch (error) {
      console.log(error)
    }
  },
  saveUserInfo (token) {
    this.token = token
    try {
      localStorage.setItem('token', token)
    } catch (error) {
      console.log(error)
    }
  },
  saveSallerInfo (identity, storeId) {
    this.identity = identity
    this.storeId = storeId
    localStorage.setItem('identity', identity)
    localStorage.setItem('storeId', storeId)
  },
  getSallerInfo () {
    return {
      identity: localStorage.getItem('identity'),
      storeId: localStorage.getItem('storeId')
    }
  }
}
