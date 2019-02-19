<template>
    <div class="login-container">
        <navi title="找回密码"></navi>
        <div class="input-container">
            <div>
                <span class="iconfont input-close" @click="clear(1)">&#xe604;</span>
                <input placeholder="请输入密码" class="user-name" maxlength="16" minlength="6" v-model="firstPassword" type="password"/>
            </div>
            <div class="input-fp-next">
                <span class="iconfont input-close" @click="clear(2)">&#xe604;</span>
                <input placeholder="请再次输入密码" class="user-name" maxlength="16" minlength="6" v-model="secondPassword" type="password"/>
            </div>
            <el-button type="primary" class="input-login" @click="submit">确定</el-button>
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
      firstPassword: '',
      secondPassword: ''
    }
  },
  methods: {
    clear (type) {
      if (type === 1) {
        this.firstPassword = ''
      } else {
        this.secondPassword = ''
      }
    },
    submit () {
      if (!this.firstPassword) {
        this.$toast('请输入密码')
        return
      }
      if (this.firstPassword.length < 6) {
        this.$toast('请至少输入6位密码')
        return
      }
      if (!this.secondPassword) {
        this.$toast('请再次输入密码')
        return
      }
      if (this.firstPassword !== this.secondPassword) {
        this.$toast('两次密码不一致')
        return
      }
      // 返回当前页面
      this.$router.back()
      // 把第一步返回了
      this.$router.back()
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
  .input-fp-next
    margin-top .5rem
    position relative
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
  .input-login
    background-color $primary
    border 0 none
    width 100%
    margin-top 1rem
    margin-bottom .5rem
</style>
