<template>
  <div class='help-and-register-container'>
    <div class="title">活动注册</div>
    <div class="user-phone-wrapper">
      <span class="el-icon-mobile-phone phone-icon"></span>
      <input type="text" placeholder="请输入手机号" maxlength="11" v-model="phone">
    </div>
    <div class="code-wrapper">
      <div class="user-code-wrapper">
        <span class="el-icon-first-aid-kit code-icon"></span>
        <input type="text" placeholder="请输入验证码" maxlength="6" v-model="captche">
      </div>
      <span class="code-button" @click="getCaptche">{{countTitle}}</span>
    </div>
    <div class="help-action" @click="help">
      为他助力
    </div>
    <div class="register-tip">
      成功注册后您也可以参与此活动哦~~
    </div>
  </div>
</template>

<script>

export default {
  name: 'helpAndRegister',
  components: {},
  data () {
    return {
      phone: '',
      captche: '',
      countTitle: '获取验证码',
      disabled: false
    }
  },
  methods: {
    getCaptche () {
      if (this.disabled) {
        return
      }
      if (!this.phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!(this.$utils.validator.isPhone(this.phone))) {
        this.$toast('请输入合法的手机号')
        this.phone = ''
        return
      }
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
    },
    help () {
      if (!this.phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!(this.$utils.validator.isPhone(this.phone))) {
        this.$toast('请输入合法的手机号')
        this.phone = ''
        return
      }
      if (!this.captche) {
        this.$toast('请输入验证码')
        return
      }
      this.$emit('help', {
        phone: this.phone,
        captche: this.captche
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.help-and-register-container
    border-radius rem(.1)
    background-color #fff
    padding rem(.1)
    margin-top rem(.3)
    .title
        textStyle(#333, .3)
        margin rem(.2)
    .user-phone-wrapper
        border-radius rem(.1)
        background-color #F8F4D8
        line-height rem(.8)
        margin rem(.2)
        & > input
            background-color transparent
            height rem(.7)
            width 80%
            margin-left rem(.1)
        .phone-icon
            color #666666
            font-size rem(.4)
            vertical-align middle
            margin-left rem(.1)
            &::after
                content "|"
                color #666
                margin-left rem(.1)
    .code-wrapper
        display flex
        align-items center
        justify-content space-between
        line-height rem(.8)
        margin rem(.4) rem(.2) rem(.2) rem(.2)
        .user-code-wrapper
            border-radius rem(.1)
            background-color #F8F4D8
            & > input
                background-color transparent
                height rem(.7)
                width 55%
                margin-left rem(.1)
            .code-icon
                color #666666
                font-size rem(.4)
                vertical-align middle
                margin-left rem(.1)
                &::after
                    content "|"
                    color #666
                    margin-left rem(.1)
        .code-button
            border-radius rem(.4)
            color #fff
            background #EC8B5B
            display inline-block
            font-size rem(.25)
            padding 0 rem(.2)
            flex 1
            text-align center
            margin-left rem(.1)
            min-width rem(1.3)
            height rem(.6)
            line-height rem(.6)
    .help-action
        background-color #FBE868
        border-radius rem(.4)
        height rem(.8)
        line-height rem(.8)
        text-align center
        width 90%
        margin 0 auto
        margin-top rem(.4)
        color #E4674D
        font-weight bold
        font-size rem(.32)
    .register-tip
        textStyle(#888, .28)
        padding rem(.3)
</style>
