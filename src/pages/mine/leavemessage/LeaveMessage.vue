<template>
    <div>
        <navi title="留言板" :isFixed="true"></navi>
        <el-tabs :stretch="true" value='first' class="l-tabs">
            <el-tab-pane label="我的问题" name="first" class="l-tab-item">
                <my-question ref="myAsk"></my-question>
            </el-tab-pane>
            <el-tab-pane label="我的回复" name="second" class="l-tab-item" ref="myAnswer">
                <my-reply ref="myAnswer"></my-reply>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import navi from 'common/components/navigation'
import myQuestion from './components/MyQuestion'
import myReply from './components/MyReply'
export default {
  name: 'LeaveMessage',
  components: {
    navi,
    myQuestion,
    myReply
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'personal') {
        vm.$refs.myAsk.$refs.mescroll.mescroll.resetUpScroll(true)
        vm.$refs.myAnswer.$refs.mescroll.mescroll.resetUpScroll(true)
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.l-tabs
    tabsFixed()
    .l-tab-item
        tabFixed()
</style>
