<template>
<div class='ads-detail-container'>
  <vue-progress-bar></vue-progress-bar>
  <navi :isFixed="true"></navi>
  <div class="ads-container">
    <iframe :src="path"></iframe>
  </div>
</div>
</template>

<script>
import navi from 'common/components/navigation'
export default {
  name: 'adsDetail',
  props: {
    path: String
  },
  components: {
    navi
  },
  mounted () {
    this.$loading('正在加载…')
    setTimeout(() => {
      this.$loading.close()
    }, 3000)
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.ads-container
    width 100%
    height 100%
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin-top $headerHeight
    & iframe
        width 100%
        height 100%
        border 0
</style>
