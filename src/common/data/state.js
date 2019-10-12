let defaultCity = {
  value: '济南市',
  code: 100
}
let currentCity = JSON.parse(localStorage.getItem('currentCity')) || defaultCity
let token = localStorage.getItem('token')
let identity = localStorage.getItem('identity') || 2
let storeId = localStorage.getItem('storeId') || 2
let backPage = localStorage.getItem('backpage') || null

export default {
  currentCity,
  token,
  identity,
  storeId,
  backPage,
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
  },
  setBackPage (backPage) {
    if (backPage) {
      const tempPage = {
        name: backPage.name,
        query: backPage.query,
        params: backPage.params
      }
      localStorage.setItem('backpage', JSON.stringify(tempPage))
    } else {
      localStorage.removeItem('backpage')
    }
  },
  getBackPage () {
    let backPage = localStorage.getItem('backpage')
    if (backPage || backPage !== 'null') {
      this.backPage = JSON.parse(backPage)
      return this.backPage
    }
    return null
  }
}
