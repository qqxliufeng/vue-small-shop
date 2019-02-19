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
import '../theme/index.css'
// VueAwesomeSwiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(Toast)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.prototype.$http = axios
Vue.prototype.$userInfo = userInfo
Vue.prototype.$validator = validator
Vue.prototype.$isWeiXin = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
