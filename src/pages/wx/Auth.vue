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
          }, '正在授权登录…', (data) => {
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
              if (backPage) {
                this.$router.replace({name: backPage.name, query: backPage.query, params: backPage.params}, () => {
                  this.$root.state.setBackPage(null)
                })
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
