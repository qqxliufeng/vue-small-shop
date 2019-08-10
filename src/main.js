// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import './assets/style/reset.css'
import axios from 'common/http/http.js'
import userInfo from 'common/data/user-info'
import state from 'common/data/state'
import './assets/style/iconfont.css'
import './assets/style/element-variables.styl'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import utils from 'common/utils/utils'
import * as urlPath from 'common/http/urlConfig'
import '../theme/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueLazyLoad from 'vue-lazyload'
// import VueAMap from 'vue-amap'
import 'common/utils/weixin.js'
import SlideVerify from 'common/components/slideverify/index'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Toast)
Vue.use(VueAwesomeSwiper)
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//   key: '9caebd5712374a94a3d247f7ff51de9f',
//   plugin: ['AMap.Geolocation'],
//   v: '1.4.4'
// })
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: require('images/img_loading_failed_list.png'),
  loading: require('images/img_loading_list.png'),
  attempt: 1
})
Vue.use(SlideVerify)
Vue.prototype.$isWeiXin = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
Vue.prototype.$isAliPay = navigator.userAgent.toLowerCase().indexOf('alipay') !== -1
Vue.prototype.$utils = utils
Vue.prototype.$urlPath = urlPath
Vue.prototype.NODE_DEVELOPMENT = process.env.NODE_ENV === 'development'
Vue.prototype.$isMobile = function () {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}
Vue.prototype.$http = function (url, params = {}, loadingTip, onRequestSuccess, onRequestFail) {
  try {
    if (!url) {
      this.$toast('url 参数不正确')
      return
    }
    if (loadingTip !== null) {
      this.$loading(loadingTip || '正在加载…')
    }
    if (userInfo.isLogin()) {
      params.token = userInfo.state.token
    }
    return axios.post(url, params)
      .then(response => {
        // 判断是否是正常的http请求状态
        if (response.status === 200) {
          if (response.data) {
            if (response.data.code === 1) {
              if (this.NODE_DEVELOPMENT) {
                console.log(response.data)
              }
              onRequestSuccess(response.data)
            } else {
              onRequestFail(200, response.data.msg)
            }
          } else {
            onRequestFail(-1, '请求失败，请重试…')
          }
        } else if (response.status === 401) {
          this.$toast('当前账号已过期，请重新登录')
          userInfo.clearInfoAction()
          router.replace({name: 'loginContainer'})
        } else {
          if (onRequestFail) {
            onRequestFail(-1, '请求失败，请重试…')
          } else {
            this.$toast('请求失败，请重试…')
          }
        }
      })
      .catch((error) => {
        if (this.NODE_DEVELOPMENT) {
          console.log(error)
        }
        if (error && error.toString().indexOf('401') !== -1) {
          this.$toast('当前账号已过期，请重新登录')
          userInfo.clearInfoAction()
          router.replace({name: 'loginContainer'})
        } else {
          if (onRequestFail) {
            onRequestFail(-1, '请求失败，请重试…')
          }
        }
      })
      .then(() => {
        this.$loading.close()
      })
  } catch (error) {
    if (this.NODE_DEVELOPMENT) {
      console.log(error)
    }
    this.$loading.close()
  }
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    if (userInfo.isLogin()) {
      // 如果已经登录了，但是在微信是没有openId，则需要进行授权（此场景应用于 不是在微信公众号里面打开页面）
      if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 && (!userInfo.state.openid || userInfo.state.openid === 'null')) {
        state.setBackPage(to)
        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10a7de3814315ba1&redirect_uri=http://www.store.liuyiqinzi.com&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
      } else {
        next()
      }
    } else {
      // 如果是在微信公众号里面打开的，且没有登录过，则需要进行授权
      if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
        state.setBackPage(to)
        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10a7de3814315ba1&redirect_uri=http://www.store.liuyiqinzi.com&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
      } else {
        autoLogin(to, from, next)
      }
    }
  } else {
    next()
  }
})

function autoLogin (to, from, next) {
  if (userInfo.state.token) {
    axios.post(urlPath.userInfo, {
      token: userInfo.state.token
    }).then(response => {
      new Promise((resolve, reject) => {
        if (response.status === 200 && response.data.code === 1) {
          response.data.data.token = state.token
          userInfo.setUserInfo(response.data.data)
          resolve()
        } else {
          reject(new Error('auto error'))
        }
      }).then(() => {
        next()
      }).catch((error) => {
        console.log(error)
        state.setBackPage(to)
        next({name: 'loginContainer'})
        // next({name: 'loginContainer', params: { backName: to }})
      })
    }).catch(error => {
      console.log(error)
      state.setBackPage(to)
      next({name: 'loginContainer'})
    })
  } else {
    state.setBackPage(to)
    next({name: 'loginContainer'})
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    userInfo,
    state,
    report: null
  }
})
