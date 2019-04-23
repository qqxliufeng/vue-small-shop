<template>
    <div>
        <navi title="修改密码"></navi>
        <div class="input-container">
            <div>
                <span class="iconfont input-close" @click="clear(0)">&#xe604;</span>
                <input placeholder="请输入原密码" class="user-name" maxlength="16" type="password" v-model="oldPassword"/>
            </div>
            <div>
                <span class="iconfont input-close" @click="clear(1)">&#xe604;</span>
                <input placeholder="请输入新密码" class="user-name" maxlength="16" type="password" v-model="newPassword"/>
            </div>
            <div>
                <span class="iconfont input-close" @click="clear(2)">&#xe604;</span>
                <input placeholder="请再次输入新密码" class="user-name" maxlength="16" type="password" v-model="repeatNewPassword"/>
            </div>
            <p>注：请设置6位以上密码</p>
            <button @click="resetPassword">确定</button>
        </div>
    </div>
</template>
<script>
import navi from 'common/components/navigation'
export default {
  name: 'resetPassword',
  components: {
    navi
  },
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: ''
    }
  },
  methods: {
    clear (type) {
      if (type === 0) {
        this.oldPassword = ''
      } else if (type === 1) {
        this.newPassword = ''
      } else {
        this.repeatNewPassword = ''
      }
    },
    resetPassword () {
      if (!this.oldPassword) {
        this.$toast('请输入原始密码')
        return
      }
      if (!this.$utils.validator.isPassword(this.oldPassword)) {
        this.$toast('请输入6-16原始位密码')
        return
      }
      if (!this.newPassword) {
        this.$toast('请输入新密码')
        return
      }
      if (!this.$utils.validator.isPassword(this.newPassword)) {
        this.$toast('请输入6-16新位密码')
        return
      }
      if (!this.repeatNewPassword) {
        this.$toast('请再次输入新密码')
        return
      }
      if (this.newPassword !== this.repeatNewPassword) {
        this.$toast('两次密码不一致')
        this.newPassword = ''
        this.repeatNewPassword = ''
        return
      }
      this.$http(this.$urlPath.userInfoResetPWUrl, {
        oldpassword: this.oldPassword,
        newpassword: this.newPassword
      }, '正在修改密码…',
      (data) => {
        this.$toast('密码修改成功，请牢记…')
        this.$router.back()
      },
      (errorCode, error) => {
        this.$toast(error)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.input-container
  margin .86rem .5rem
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
  & div
      margin-top .5rem
      position relative
  & p
      margin-top .5rem
      color #E96700
  & button
        display block
        width 80%
        border-radius 2rem
        background-color $primary
        height .8rem
        margin 1rem auto .5rem auto
        color #ffffff
        font-size .32rem
</style>
