import axios from 'axios'
import qs from 'qs'
import { baseUrl } from 'common/urlConfig'

axios.defaults.timeout = 10000
axios.defaults.baseURL = baseUrl

axios.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data)
    console.log(config)
    config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    return config
  },
  error => {
    return Promise.reject(error.response)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.data.resultCode === '404') {
      console.log('找不到')
    } else {
      return response
    }
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default axios
