// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import './assets/style/reset.css'
import axios from '@/common/http/http.js'
import userInfo from '@/common/data/user-info'
import state from '@/common/data/state'
import './assets/style/iconfont.css'
import './assets/style/element-variables.styl'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import utils from 'common/utils/utils'
import * as urlPath from 'common/urlConfig'
import '../theme/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueLazyLoad from 'vue-lazyload'
import logo from 'images/logo.png'
import Loading from 'common/components/Loading'

Vue.use(Toast)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(Loading)
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: logo,
  loading: logo,
  attempt: 1
})
Vue.prototype.$isWeiXin = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
Vue.prototype.$utils = utils
Vue.prototype.$urlPath = urlPath
Vue.prototype.$loading = () => {
  return {
    tip: '正在加载…',
    show: false
  }
}
Vue.prototype.$http = function (url, params = {}, loadingTip = '', onRequestSuccess, onRequestFail) {
  try {
    if (!url) {
      this.$toast('url 参数不正确')
      return
    }
    if (this.loading) {
      this.loading.tip = loadingTip || '正在加载…'
      this.loading.show = true
    }
    if (userInfo.isLogin()) {
      params.token = userInfo.state.token
    }
    return axios.post(url, params)
      .then(response => {
        if (response.data) {
          console.log(response)
          if (response.data.code === 1) {
            onRequestSuccess(response.data)
          } else {
            onRequestFail(200, response.data.msg)
          }
        } else {
          onRequestFail(-1, '请求失败，请重试…')
        }
      })
      .catch(() => {
        this.$toast('请求失败，请重试…')
      })
      .then(() => {
        if (this.loading) {
          this.loading.show = false
        }
      })
  } catch (error) {
    console.log(error)
    if (this.loading) {
      this.loading.show = false
    }
  }
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    if (userInfo.isLogin()) {
      console.log('登录了……')
      next()
    } else {
      console.log('没有登录')
      next({name: 'login', params: { backName: to.name }})
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    userInfo,
    state
  }
})
