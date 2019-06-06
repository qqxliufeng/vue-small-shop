<template>
  <div class='t-c-container'>
    <p class="title">联系人</p>
    <div class="user-info-container">
      <span>联系人姓名：</span>
      <input type="text" maxlength="6" placeholder="请输入联系人姓名" v-model="tempUserInfo.name">
    </div>
    <div class="user-info-container">
      <span>联系人手机：</span>
      <input type="text" maxlength="11" placeholder="请输入联系人手机号" v-model="tempUserInfo.phone">
    </div>
    <div class="user-info-container"  v-if="visitorInfo.indexOf('id') !== -1">
      <span>身份证号：</span>
      <input type="text" placeholder="请输入身份证号" v-model="tempUserInfo.idCard" maxlength="18">
    </div>
    <div class="user-info-container"  v-if="visitorInfo.indexOf('u') !== -1">
      <span>学校名称：</span>
      <input type="text" placeholder="请输入学校名称" v-model="tempUserInfo.schoolName" maxlength="15">
    </div>
    <div class="user-info-container" v-if="visitorInfo.indexOf('s') !== -1">
      <span>学生证号：</span>
      <input type="text" placeholder="请输入学生证号" v-model="tempUserInfo.studentId" maxlength="20">
    </div>
    <el-dialog :visible.sync="showVerifyDialog" :modal="false" width="90%">
      <slide-verify
      :w="width"
      @success="onSlideSuccess"
      ref="slideVerfiy"></slide-verify>
    </el-dialog>
    <div class="modal" v-if="showVerifyDialog" @click="dismissDialog"></div>
  </div>
</template>

<script>
export default {
  name: 'ticketContact',
  props: {
    visitorInfo: String
  },
  data () {
    return {
      tempUserInfo: {
        name: '',
        phone: this.$root.userInfo.state.phone || '',
        idCard: '',
        schoolName: '',
        studentId: ''
      },
      showVerifyDialog: false,
      width: document.body.clientWidth * 0.9 - 40,
      codeTip: '获取验证码',
      disabled: false
    }
  },
  methods: {
    getCode () {
      this.showVerifyDialog = true
    },
    onSlideSuccess () {
      this.showVerifyDialog = false
      if (this.$refs.slideVerfiy) {
        this.$refs.slideVerfiy.reset()
      }
      let timeOut = 60
      this.disabled = true
      let time = setInterval(() => {
        timeOut = timeOut - 1
        this.codeTip = timeOut + ' s'
        if (timeOut <= 0) {
          clearInterval(time)
          this.disabled = false
          this.codeTip = '重新获取？'
        }
      }, 1000)
    },
    dismissDialog () {
      this.showVerifyDialog = false
    },
    clearUserInfo () {
      this.tempUserInfo.name = null
      this.tempUserInfo.phone = null
      this.tempUserInfo.idCard = null
      this.tempUserInfo.schoolName = null
      this.tempUserInfo.studentId = null
      this.tempUserInfo.code = null
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.t-c-container
    & >>> .slide-verify
        width 100%
    & >>> .slide-verify-slider
        width 100%
    .title
        textStyle(#333, .3)
        padding rem(.3)
        borderBottom()
    .user-info-container
        padding rem(.2) rem(.3)
        display flex
        align-items center
        & span
            color #666
            font-size rem(.26)
        & input
            flex 1
            background #f9f9f9
            padding rem(.12)
            font-size rem(.24)
        .get-code
            margin-left rem(.3)
            min-width rem(1.6)
    .modal
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        opacity .5
        background-color #000
        z-index 1001
</style>
