<template>
    <div class="o-a-list-container">
        <navi title="全部订单" :isFixed="true" :isShowBack="false"></navi>
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
      currentRefs: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$root.$emit('changeTab', {index: '3'})
      vm.$refs.allItem.$refs.mescroll && vm.$refs.allItem.$refs.mescroll.beforeRouteEnter()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.allItem.$refs.mescroll && this.$refs.allItem.$refs.mescroll.beforeRouteLeave()
    next()
  },
  mounted () {
    this.$root.$on('onRefreshOrderList', () => {
      this.$refs.allItem.reload()
    })
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
