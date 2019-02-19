import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.baseURL = 'https://api.coindesk.com/v1/bpi/'

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
      console.log(response)
      return response
    }
  },
  error => {
    return Promise.reject(error.response)
  }
)

export default axios
