<template>
  <div class='t-u-s-i-info-container'>
    <p class="title">游客信息</p>
    <div class="user-info-container">
      <span>游客姓名：</span>
      <input type="text" maxlength="6" placeholder="请输入游客姓名" v-model="tempUserInfo.name">
    </div>
    <div class="user-info-container">
      <span>游客手机：</span>
      <input type="text" maxlength="11" placeholder="请输入游客手机号" v-model="tempUserInfo.phone">
    </div>
    <div class="user-info-container" v-if="visitorInfo.indexOf('id') !== -1">
      <span>身体证号：</span>
      <input type="text" placeholder="请输入身份证号" v-model="tempUserInfo.idCard">
    </div>
    <div class="user-info-container" v-if="visitorInfo.indexOf('u') !== -1">
      <span>学校名称：</span>
      <input type="text" placeholder="请输入学校名称" v-model="tempUserInfo.schoolName">
    </div>
    <div class="user-info-container" v-if="visitorInfo.indexOf('s') !== -1">
      <span>学生证号：</span>
      <input type="text" placeholder="请输入学生证号" v-model="tempUserInfo.studentId">
    </div>
  </div>
</template>

<script>

export default {
  name: 'ticketUserSingleInfo',
  props: {
    visitorInfo: String
  },
  components: {},
  data () {
    return {
      tempUserInfo: {
        name: '',
        phone: '',
        idCard: '',
        schoolName: '',
        studentId: ''
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.title
    textStyle(#333, .3)
    padding rem(.3)
    borderBottom()
.user-info-container
    padding rem(.2) rem(.3)
    display flex
    align-items center
    & input
        flex 1
        background #f5f5f5
        padding rem(.1)
</style>
