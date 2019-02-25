// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import './assets/style/reset.css'
// import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/common/http/http.js'
import userInfo from '@/common/data/user-info'
import './assets/style/iconfont.css'
import './assets/style/element-variables.styl'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import validator from 'common/utils/validator'
import utils from 'common/utils/utils'
import '../theme/index.css'
// VueAwesomeSwiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// VueLazyLoad
import VueLazyLoad from 'vue-lazyload'

import logo from 'images/logo.png'

// loading
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
Vue.prototype.$http = axios
// Vue.prototype.$userInfo = userInfo
Vue.prototype.$validator = validator
Vue.prototype.$utils = utils
Vue.prototype.$isWeiXin = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    if (userInfo.isLogin()) {
      next()
    } else {
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
    userInfo
  }
})
