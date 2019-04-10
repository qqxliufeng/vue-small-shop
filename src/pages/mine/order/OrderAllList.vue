<template>
    <div class="o-a-list-container">
        <navi title="全部订单" :isFixed="true"></navi>
        <order-list-item ref="allItem" :state="0"></order-list-item>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
import orderListItem from './components/OrderListItem'
export default {
  name: 'orderAllList',
  components: {
    navi,
    orderListItem
  },
  data () {
    return {
      currentRefs: null,
      index: 'allItem'
    }
  },
  watch: {
    '$route' () {
      this.index = this.$route.query.index
    }
  },
  mounted () {
    this.index = this.$route.query.index
    this.currentRefs = this.$refs['allItem'].$refs
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$data.currentRefs.mescroll && vm.$data.currentRefs.mescroll.beforeRouteEnter()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.currentRefs.mescroll && this.currentRefs.mescroll.beforeRouteLeave()
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-a-list-container >>> .mescroll
    top $headerHeight
    height 93%
</style>
