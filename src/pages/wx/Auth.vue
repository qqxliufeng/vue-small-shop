<!--
 * @Author: your name
 * @Date: 2019-08-24 17:19:25
 * @LastEditTime: 2020-04-29 13:49:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/src/pages/wx/Auth.vue
 -->
<template>
<div class=''></div>
</template>

<script>

export default {
  name: 'auth',
  components: {},
  data () {
    return {
      code: '',
      href: 'http://www.store.liuyiqinzi.com/index/' + this.$root.state.getSallerInfo().identity + '/' + this.$root.state.getSallerInfo().storeId
    }
  },
  methods: {
    wxLogin () {
      // this.code && this.$root.userInfo.isLogin() && (!this.$root.userInfo.state.openid || this.$root.userInfo.state.openid === 'null')
      if (this.code) {
        if (this.$root.userInfo.isLogin() && (!this.$root.userInfo.state.openid || this.$root.userInfo.state.openid === 'null')) {
          this.$http(this.$urlPath.getOpenId, {
            code: this.code
          }, '正在授权…', (data) => {
            if (data) {
              this.$root.userInfo.setUserInfoOpenId(data.data.openid)
              let backPage = this.$root.state.getBackPage()
              if (backPage) {
                this.$router.replace({name: backPage.name, query: backPage.query, params: backPage.params}, () => {
                  this.$root.state.setBackPage(null)
                })
              } else {
                window.location.href = this.href
              }
            } else {
              this.$router.replace({name: 'loginContainer'})
            }
          }, (errorCode, error) => {
            this.$router.replace({name: 'loginContainer'})
            console.log(error)
          })
        } else {
          this.$http(this.$urlPath.wxLogin, {
            code: this.code
          }, '正在授权登录…', (data) => {
            if (data) {
              this.$root.userInfo.setUserInfo(data.data.userinfo)
              this.$root.state.saveUserInfo(data.data.userinfo.token)
              let backPage = this.$root.state.getBackPage()
              console.log('backpage' + backPage)
              if (backPage) {
                console.log('backpage name' + backPage.name)
                if (backPage.name === 'reseveDetail') {
                  window.location.href = 'http://www.store.liuyiqinzi.com/resevedetail?goods_id=' + backPage.query.goods_id + '&scenicId=' + backPage.query.scenicId
                } else {
                  console.log('backpage')
                  this.$router.replace({name: backPage.name, query: backPage.query, params: backPage.params}, () => {
                    this.$root.state.setBackPage(null)
                  })
                }
              } else {
                window.location.href = this.href
              }
            } else {
              // 如果获取openid失败，则去登录页面
              this.$router.replace({name: 'loginContainer'})
            }
          }, (errorCode, error) => {
            this.$router.replace({name: 'loginContainer'})
            console.log(error)
          })
        }
      } else {
        window.location.href = this.href
      }
    }
  },
  mounted () {
    this.code = this.$route.query.code
    this.wxLogin()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'

</style>
