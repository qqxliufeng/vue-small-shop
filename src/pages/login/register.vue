<template>
    <div class="login-container">
        <navi title="注册"></navi>
        <div class="input-container">
            <div>
                <span class="iconfont input-close" @click="clear('phone')">&#xe604;</span>
                <input placeholder="请输入手机号" class="user-name" maxlength="11" v-model="userPhone"/>
            </div>
            <div class="input-password-container">
                <input placeholder="请输入验证码" class="user-password" maxlength="6" v-model="verifyCode"/>
                <button class="input-forget-password" @click="getVerifyCode" :disabled="disabled">{{countTitle}}</button>
            </div>
            <div class="input-password-container">
                <span class="iconfont input-close" @click="clear('password')">&#xe604;</span>
                <input placeholder="请输入密码" maxlength="16" v-model="password" type="password"/>
            </div>
            <div class="register-protocol-container">
                <el-checkbox v-model="checked" class="register-input-protocol" label="我同意"></el-checkbox>
                <router-link to='/protocol'>
                    <span class="register-protocol">《用户协议》</span>
                </router-link>
            </div>
            <el-button type="primary" class="input-login" @click="register">注册</el-button>
        </div>
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
      checked: true,
      userPhone: '',
      verifyCode: '',
      password: '',
      countTitle: '获取验证码',
      disabled: false,
      intervalId: null
    }
  },
  methods: {
    clear (type) {
      switch (type) {
        case 'phone':
          this.userPhone = ''
          break
        case 'password':
          this.password = ''
          break
      }
    },
    getVerifyCode () {
      if (!this.userPhone) {
        this.$toast('请输入手机号')
        return
      }
      if (!this.$utils.validator.isPhone(this.userPhone)) {
        this.$toast('请输入合法的手机号')
        this.userPhone = ''
        return
      }
      this.disabled = true
      let count = 60
      this.intervalId = setInterval(() => {
        this.disabled = true
        count--
        this.countTitle = count + ' s'
        if (count <= 0) {
          clearInterval(this.intervalId)
          this.disabled = false
          this.countTitle = '重新获取？'
        }
      }, 1000)
      this.$http(this.$urlPath.userInfoGetSMSCodeUrl, {
        mobile: this.userPhone,
        event: 'register'
      }, null, (data) => {
        this.$toast('短信发送成功，请注意查收')
      }, (errorCode, error) => {
        if (this.intervalId) {
          clearInterval(this.intervalId)
        }
        this.$toast(error)
      })
    },
    register () {
      if (!this.userPhone) {
        this.$toast('请输入手机号')
        return
      }
      if (!this.$utils.validator.isPhone(this.userPhone)) {
        this.$toast('请输入合法的手机号')
        this.userPhone = ''
        return
      }
      if (!this.verifyCode) {
        this.$toast('请输入验证码')
        return
      }
      if (!this.password) {
        this.$toast('请输入密码')
        return
      }
      if (!this.$utils.validator.isPassword(this.password)) {
        this.$toast('请输入6-16位密码')
        return
      }
      if (!this.checked) {
        this.$toast('请先阅读并同意用户协议')
        return
      }
      this.$http(this.$urlPath.userInfoRegisterUrl, {
        mobile: this.userPhone,
        password: this.password,
        captcha: this.verifyCode
      }, '正在注册…', (data) => {
        this.$toast('注册成功，请登录！')
        // this.$root.$data.userInfo.setUserInfo(data.data.userinfo)
        this.$router.back()
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
      margin-right .3rem
      color $primary
      background #ffffff
      &::before
       content '|'
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
    & >>> .el-checkbox
      margin-right 0
    .register-input-protocol
      &:focus
        color $primary
    .register-protocol
      color $primary
      font-size .28rem
</style>
