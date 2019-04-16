<template>
<div class='m-i-container'>
  <navi title="消息详情" :isFixed="true"></navi>
  <div class="content" v-if="info">
    <h1 class="title">{{info.title}}</h1>
    <div v-html="info.content"></div>
  </div>
</div>
</template>

<script>
import navi from 'common/components/navigation'
export default {
  name: 'messageInfo',
  components: {
    navi
  },
  data () {
    return {
      info: null
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.messageDetails, {
        id: this.$route.query.mid
      }, '', (data) => {
        this.info = data.data
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.content
    padding-top $headerHeight
    padding-left rem(.2)
    padding-right rem(.2)
    .title
        text-align center
        padding rem(.2)
        textStyle(#333, .35)
</style>
