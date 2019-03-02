<template>
<div class='h-n-notice-container'>
    <span>公告：这个店铺很好哦，马上来吧这个店铺很好哦，马上来吧这个店铺很好哦，马上来吧这个店铺很好哦，马上来吧</span>
    <span>详情<i class="el-icon-arrow-right"></i></span>
</div>
</template>

<script>

export default {
  name: 'homeNotice',
  data () {
    return {

    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-n-notice-container
    border-top #f5f5f5 solid rem(.1)
    border-bottom #f5f5f5 solid rem(.1)
    padding rem(.2)
    display flex
    align-items center
    & span:nth-child(1)
        ellipsis()
        textStyle(#333, .3)
        flex 1
    & span:nth-child(2)
        textStyle(#888, .28)
</style>
