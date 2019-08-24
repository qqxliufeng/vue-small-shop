<template>
  <div class='activity-rule-info-container'>
    <navi title="活动详情" :isFixed="true"></navi>
    <div class="content-info" v-html="details">
    </div>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
export default {
  name: 'activityRuleInfo',
  components: {
    navi
  },
  data () {
    return {
      details: ''
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.getActivityRuleDetails, {
        assist_id: this.$route.query.pid
      }, '', (res) => {
        this.details = res.data
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
.content-info
    padding $headerHeight * 1.2 rem(.2) rem(.2) rem(.1)
    textStyle(#333, .32)
    line-height rem(.4)
</style>
