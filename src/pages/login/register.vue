<template>
    <div class="login-container">
        <navi title="注册"></navi>
        <div class="input-container">
            <div>
                <span class="iconfont input-close" @click="clear">&#xe604;</span>
                <input placeholder="请输入手机号" class="user-name" maxlength="11"/>
            </div>
            <div class="input-password-container">
                <input placeholder="请输入验证码" class="user-password" maxlength="16"/>
                <span class="input-forget-password">获取验证码</span>
            </div>
            <div class="input-password-container">
                <span class="iconfont input-close" @click="clear">&#xe604;</span>
                <input placeholder="请输入密码" maxlength="16"/>
            </div>
            <div class="register-protocol-container">
                <el-checkbox v-model="checked" class="register-input-protocol" label="我同意"></el-checkbox>
                <router-link to='/protocol'>
                    <span class="register-protocol">《用户协议》</span>
                </router-link>
            </div>
            <el-button type="primary" class="input-login">注册</el-button>
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
      checked: true
    }
  },
  methods: {
    clear () {
      this.userName = ''
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
      margin-top .1rem
      margin-right .3rem
      color $primary
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
    .register-input-protocol
      &:focus
        color $primary
    .register-protocol
      color $primary
      font-size .28rem
</style>
