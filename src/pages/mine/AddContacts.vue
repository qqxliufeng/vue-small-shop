<template>
    <div class="c-container">
        <navi title="编辑联系人" :isRightAction="true">
             <template slot="rightAction">
               <span @click="addContacts" class="c-add-action">完成</span>
           </template>
        </navi>
        <div>
          <div class="c-a-item-container">
            <i>*</i><span class="c-a-item-left">姓名</span>
            <input type="text" placeholder="请输入姓名" maxlength="6" v-model="name">
          </div>
          <div class="c-a-item-container">
            <i>*</i><span class="c-a-item-left">手机号</span>
            <input type="text" placeholder="请输入手机号" maxlength="11" v-model="phone">
          </div>
          <div class="c-a-item-container">
            <i>&nbsp;</i><span class="c-a-item-left">身份证号</span>
            <input type="text" placeholder="请输入身份证号" maxlength="18" v-model="idCard">
          </div>
          <div class="c-a-item-container">
            <i>&nbsp;</i><span class="c-a-item-left">学生名称</span>
            <input type="text" placeholder="请输入学校名称" maxlength="16" v-model="schoolName">
          </div>
          <div class="c-a-item-container">
            <i>&nbsp;</i><span class="c-a-item-left">学生证号</span>
            <input type="text" placeholder="请输入学生证号" maxlength="16" v-model="schoolId">
          </div>
        </div>
    </div>
</template>
<script>
import navi from 'common/components/navigation'
export default {
  name: 'contacts',
  props: {
    tempConstacts: {
      type: Object,
      default: null
    }
  },
  components: {
    navi
  },
  data () {
    return {
      name: this.tempConstacts !== null ? this.tempConstacts.l_name : '',
      phone: this.tempConstacts !== null ? this.tempConstacts.l_mobile : '',
      idCard: this.tempConstacts !== null ? this.tempConstacts.l_id_no : '',
      schoolName: this.tempConstacts !== null ? this.tempConstacts.l_school : '',
      schoolId: this.tempConstacts !== null ? this.tempConstacts.l_stdnostring : '',
      constacts: null
    }
  },
  methods: {
    addContacts () {
      if (!this.name) {
        this.$toast('请输入姓名')
        return
      }
      if (!this.phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!this.$utils.validator.isPhone(this.phone)) {
        this.$toast('请输入合法的手机号')
        return
      }
      if (this.tempConstacts) {
        this.$http(this.$urlPath.editLinkManUrl, {
          l_id: this.tempConstacts.l_id,
          name: this.name,
          mobile: this.phone,
          id_no: this.idCard,
          school: this.schoolName,
          stdnostring: this.schoolId
        }, '正在修改…', (data) => {
          this.constacts = {l_id: this.tempConstacts.l_id, l_name: this.name, l_mobile: this.phone, l_id_no: this.idCard, l_school: this.schoolName, l_stdnostring: this.schoolId
          }
          this.$toast('修改成功')
          this.$router.back()
        }, (error) => {
          this.$toast(error)
        })
      } else {
        this.$http(this.$urlPath.addLinkManUrl, {
          name: this.name,
          mobile: this.phone,
          id_no: this.idCard,
          school: this.schoolName,
          stdnostring: this.schoolId
        }, '正在添加…', (data) => {
          this.constacts = {l_name: this.name, l_mobile: this.phone, l_id_no: this.idCard, l_school: this.schoolName, l_stdnostring: this.schoolId}
          this.$toast('添加成功')
          this.$router.back()
        }, (error) => {
          this.$toast(error)
        })
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'contacts' && this.constacts !== null) {
      to.query.constacts = this.constacts
    }
    next()
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.c-container
    position relative
    .c-add-action
        color #333333
        font-size .26rem
    .c-a-item-container
        borderBottom()
        position relative
        line-height 1rem
        & i
          margin .5rem .1rem
          padding-top -.4rem
          color red
          font-size .4rem
          vertical-align bottom
        .c-a-item-left
          color #333333
          font-size .32rem
          margin .5rem .2rem
        & input
          display inline-block
          position absolute
          min-width 55%
          top 0
          bottom .01rem
          left 2.5rem
          right 0
          font-size .3rem

</style>
