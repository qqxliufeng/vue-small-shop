<template>
<div>
    <navi></navi>
    <div class="empty-container">
      <p class="iconfont empty-icon">&#xe606;</p>
      <span class="empty-tip">404页面走丢了~</span>
    </div>
</div>
</template>

<script>
import navi from 'common/components/navigation'
export default {
  name: 'emptyPage',
  components: {
    navi
  },
  data () {
    return {

    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.empty-container
    height 100vh
    text-align center
    .empty-icon
        textStyle($primary, 2)
        padding-top rem(1)
    .empty-tip
        textStyle(#888, .3)
        display inline-block
        margin-top rem(.5)
</style>
