import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://192.168.0.102:8001/index/index'

axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
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
