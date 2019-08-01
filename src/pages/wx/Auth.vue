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
      if (this.code && this.$root.userInfo.isLogin() && (!this.$root.userInfo.state.openid || this.$root.userInfo.state.openid === 'null')) {
        this.$http(this.$urlPath.wxLogin, {
          code: this.code
        }, '正在授权登录…', (data) => {
          this.$root.userInfo.setUserInfoOpenId(data.data.openid)
          // this.$router.go(-1)
          window.location.href = this.href
        }, (errorCode, error) => {
          // this.$router.go(-1)
          window.location.href = this.href
          console.log(error)
        })
      } else {
        // this.$router.go(-1)
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
