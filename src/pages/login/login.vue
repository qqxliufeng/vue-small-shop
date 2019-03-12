<template>
    <div class="login-container">
        <navi title="登录"></navi>
        <div class="input-container">
            <div>
                <span class="iconfont input-close" @click="clear">&#xe604;</span>
                <input placeholder="请输入手机号" class="user-name" maxlength="11" v-model="userName"/>
            </div>
            <div class="input-password-container">
                <input placeholder="请输入密码" class="user-password" maxlength="16" v-model="userPassword" type="password"/>
                <router-link to="/forgetpasswordstepone">
                  <span class="input-forget-password">忘记密码</span>
                </router-link>
            </div>
            <el-button type="primary" class="input-login" @click="login">登录</el-button>
            <div>
                <router-link to="/fastlogin">
                  <span class="input-fast-phone">手机快捷登录</span>
                </router-link>
                <router-link to="/register">
                    <span class="input-regist">注册</span>
                </router-link>
            </div>
        </div>
        <loading v-if="loading.show" loadingTip="正在登录…"></loading>
    </div>
</template>
<script>
import navi from 'common/components/navigation'
export default {
  name: 'login',
  props: {
    backName: {
      type: String,
      default: 'home'
    }
  },
  components: {
    navi
  },
  data () {
    return {
      userName: '',
      userPassword: '',
      loading: this.$loading()
    }
  },
  methods: {
    clear () {
      this.userName = ''
    },
    login () {
      if (!this.userName) {
        this.$toast('请输入手机号码')
        return
      }
      if (!this.$utils.validator.isPhone(this.userName)) {
        this.$toast('请输入正确的手机号码')
        return
      }
      if (!this.userPassword) {
        this.$toast('请输入密码')
        return
      }
      this.$http('user/user/login', {
        account: this.userName,
        password: this.userPassword
      },
      '正在登录…',
      (data) => {
        this.$toast(data.msg)
        if (data.data) {
          this.$root.$data.userInfo.setUserInfo(data.data.userinfo)
          this.$router.replace({ name: this.backName })
        } else {
          this.$toast('登录失败，请重试…')
        }
      }, (error) => {
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
  .user-name
    width 100%
    border: 0 none
    border-bottom: 1px solid #ccc
    border-radius: 0px
    padding-bottom .1rem
    font-size .3rem
  .input-close
    font-size .5rem
    position absolute
    right 0
    top 0
    color #aaaaaa
  .user-password
    font-size .3rem
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
  .input-fast-phone
    float left
    font-size .3rem
    color #ccc
  .input-regist
    float right
    font-size .3rem
    color #ccc
</style>
