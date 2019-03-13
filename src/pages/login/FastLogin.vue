<template>
    <div class="login-container">
        <navi title="手机快捷登录"></navi>
        <div class="input-container">
            <div>
                <span class="iconfont input-close" @click="clear">&#xe604;</span>
                <input placeholder="请输入手机号" class="user-name" maxlength="11" v-model="phone">
            </div>
            <div class="input-password-container">
                <input placeholder="请输入验证码" class="user-password" maxlength="6" v-model="verifyCode" type="number"/>
                <button class="input-forget-password" @click="countDown" :disabled="disabled">{{countTitle}}</button>
            </div>
            <el-button type="primary" class="input-login" @click="login">登录</el-button>
        </div>
        <loading :loadingTip="loading.tip" v-show="loading.show"></loading>
    </div>
</template>
<script>
import navi from 'common/components/navigation'
export default {
  name: 'login',
  components: {
    navi
  },
  data () {
    return {
      phone: '',
      verifyCode: '',
      disabled: false,
      countTitle: '获取验证码',
      loading: this.$loading()
    }
  },
  methods: {
    clear () {
      this.phone = ''
    },
    login () {
      if (!this.phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!(this.$utils.validator.isPhone(this.phone))) {
        this.$toast('请输入正确的手机号')
        this.phone = ''
        return
      }
      if (!this.verifyCode) {
        this.$toast('请输入验证码')
        return
      }
      this.$http(this.$urlPath.userInfoModileLoginUrl, {
        mobile: this.phone,
        captcha: this.verifyCode
      }, '正在登录…',
      (data) => {
        this.$toast(data.msg)
        this.$root.$data.userInfo.setUserInfo(data.data.userinfo)
        this.$router.back()
      },
      (errorCode, error) => {
        this.$toast(error)
      })
    },
    countDown () {
      if (!this.phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!(this.$utils.validator.isPhone(this.phone))) {
        this.$toast('请输入正确的手机号')
        return
      }
      this.disabled = true
      let count = 60
      let time = setInterval(() => {
        this.disabled = true
        count--
        this.countTitle = count + ' s'
        if (count <= 0) {
          clearInterval(time)
          this.disabled = false
          this.countTitle = '重新获取？'
        }
      }, 1000)
      this.$http(this.$urlPath.userInfoGetSMSCodeUrl, {
        mobile: this.phone,
        event: 'mobilelogin'
      }, null, (data) => {
        this.$toast('短信发送成功，请注意查收')
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.input-container
  margin 1rem .5rem
  position relative
  font-size .3rem
  .user-name
    width 100%
    border: 0 none
    border-bottom: 1px solid #ccc
    border-radius: 0px
    padding-bottom .1rem
  .input-close
    font-size .5rem
    position absolute
    right 0
    top 0
    color #aaaaaa
  .input-password-container
    margin-top .6rem
    border: 0 none
    border-bottom: 1px solid #ccc
    border-radius: 0px
    padding-bottom .1rem
    position relative
    overflow hidden
    .input-forget-password
      position absolute
      right 0
      font-size .3rem
      background-color #00000000
      color $primary
      text-align center
      width 2rem
      display inline-block
      &::before
       content '|'
       position absolute
       right 1.8rem
       margin-right .5rem
  .input-login
    background-color $primary
    border 0 none
    width 100%
    margin-top 1rem
    margin-bottom .5rem
  .register-protocol-container
    margin-top .3rem
    text-align right
    .register-input-protocol
      &:focus
        color $primary
    .register-protocol
      color $primary
      font-size .28rem
</style>
