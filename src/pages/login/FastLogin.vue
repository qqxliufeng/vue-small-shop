<template>
    <div class="login-container">
        <div class="input-container">
            <div>
                <span class="iconfont input-close" @click="clear">&#xe604;</span>
                <input placeholder="请输入手机号" class="user-name" maxlength="11" v-model="phone" type="tel" style="letter-spacing: .02rem">
            </div>
            <div class="input-password-container">
                <input placeholder="请输入验证码" class="user-password" maxlength="6" v-model="verifyCode" type="number"/>
                <button class="input-forget-password" @click="countDown" :disabled="disabled">{{countTitle}}</button>
            </div>
            <el-button type="primary" class="input-login" @click="login">登录</el-button>
        </div>
        <el-dialog :visible.sync="showVerifyDialog" modal width="80%">
          <slide-verify
          :w="width"
          @success="onSlideSuccess"
          ref="slideVerfiy"></slide-verify>
        </el-dialog>
    </div>
</template>
<script>
import navi from 'common/components/navigation'
export default {
  name: 'login',
  props: {
    backName: Object
  },
  components: {
    navi
  },
  data () {
    return {
      phone: '',
      verifyCode: '',
      disabled: false,
      countTitle: '获取验证码',
      showVerifyDialog: false,
      width: document.body.clientWidth * 0.8 - 40
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
        this.$root.state.saveUserInfo(data.data.userinfo.token)
        this.$root.$emit('onRefreshOrderList')
        let backPage = this.$root.state.getBackPage()
        if (backPage) {
          this.$router.replace({name: backPage.name, query: backPage.query, params: backPage.params}, () => {
            this.$root.state.setBackPage(null)
          })
        } else {
          this.$router.go(-1)
        }
        // if (this.backName) {
        //   this.$router.replace({name: this.backName.name, query: this.backName.query, params: this.backName.params})
        // } else {
        //   this.$router.go(-1)
        // }
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
      this.showVerifyDialog = true
    },
    onSlideSuccess () {
      if (this.$refs.slideVerfiy) {
        this.$refs.slideVerfiy.reset()
      }
      this.showVerifyDialog = false
      this.$http(this.$urlPath.userInfoGetSMSCodeUrl, {
        mobile: this.phone,
        event: 'mobilelogin'
      }, null, (data) => {
        this.$toast('短信发送成功，请注意查收')
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
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  mounted () {
    window.onresize = () => {
      this.width = document.body.clientWidth * 0.8 - 40
      if (this.$refs.slideVerfiy) {
        this.$refs.slideVerfiy.reset()
      }
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
  .input-fast-phone
    float left
    font-size .3rem
    color #ccc
  .input-regist
    float right
    font-size .3rem
    color #ccc
</style>
