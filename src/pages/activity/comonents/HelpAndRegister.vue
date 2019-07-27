<template>
  <div class='help-and-register-container'>
    <div class="title">活动注册</div>
    <div class="user-phone-wrapper">
      <span class="el-icon-mobile-phone phone-icon"></span>
      <input type="text" placeholder="请输入手机号" maxlength="11">
    </div>
    <div class="code-wrapper">
      <div class="user-code-wrapper">
        <span class="el-icon-first-aid-kit code-icon"></span>
        <input type="text" placeholder="请输入验证码" maxlength="6">
      </div>
      <span class="code-button">获取验证码</span>
    </div>
    <div class="help-action">
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
        line-height rem(.8)
        margin rem(.4) rem(.2) rem(.2) rem(.2)
        .user-code-wrapper
            border-radius rem(.1)
            background-color #F8F4D8
            & > input
                background-color transparent
                height rem(.7)
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
            margin-left rem(.3)
            min-width rem(1.5)
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
