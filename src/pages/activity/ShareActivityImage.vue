<template>
  <div class='share-activity-image-container'>
    <navi title="分享图片" :isFixed="true"></navi>
    <div class="share-message-wrapper"></div>
    <share-content></share-content>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import ShareContent from './comonents/ShareContent'
export default {
  name: 'shareActivityImage',
  components: {
    navi,
    ShareContent
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
.share-activity-image-container
    background #ff5353
    padding-top $headerHeight
    min-height 95vh
    .share-message-wrapper
        height rem(2)
</style>
