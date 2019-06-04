<template>
  <div class='n-d-container'>
    <navi title="公告详情" :isFixed="true"></navi>
    <div class="content-wrapper" v-if="noticeInfo">
      <p class="title">{{noticeInfo.notice.notice_title}}</p>
      <p class="content">{{noticeInfo.notice.notice_content}}</p>
    </div>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
export default {
  name: 'noticeDetail',
  components: {
    navi
  },
  data () {
    return {
      noticeInfo: null
    }
  },
  mounted () {
    this.$http(this.$urlPath.noticeDetails, {
      identity: this.$route.query.identity,
      store_id: this.$route.query.storeId
    }, '', (data) => {
      this.noticeInfo = data.data
    }, (errorCode, error) => {
      this.$toast('加载失败')
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.content-wrapper
    padding-top $headerHeight
    .title
        padding rem(.2)
        text-align center
        textStyle(#333, .32)
    .content
        padding rem(.2)
        textStyle(#888, .28)
        line-height rem(.3)
</style>
