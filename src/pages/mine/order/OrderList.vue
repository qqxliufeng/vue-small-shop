<template>
    <div>
        <navi title="我的订单" :isFixed="true"></navi>
        <el-tabs :value="index" :stretch="true" class="o-tabs" @tab-click="tabClick">
            <el-tab-pane name="waitingPayItem" label="待付款" class="o-tabs-item">
                <order-list-item ref="waitingPayItem" :state="1"></order-list-item>
            </el-tab-pane>
            <el-tab-pane name="waitingUseItem" label="待使用" class="o-tabs-item" :lazy="true" >
                <order-list-item ref="waitingUseItem" :state="2"></order-list-item>
            </el-tab-pane>
            <el-tab-pane name="waitingCommentItem" label="待评价" class="o-tabs-item" :lazy="true" >
                <order-list-item ref="waitingCommentItem" :state="3"></order-list-item>
            </el-tab-pane>
            <el-tab-pane name="afterServiceItem" label="售后" class="o-tabs-item" :lazy="true" >
                <order-list-item ref="afterServiceItem" :state="4"></order-list-item>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
import orderListItem from './components/OrderListItem'
export default {
  name: 'orderList',
  components: {
    navi,
    orderListItem
  },
  data () {
    return {
      currentRefs: null,
      refsArray: ['waitingPayItem', 'waitingUseItem', 'waitingCommentItem', 'afterServiceItem'],
      index: 'waitingPayItem'
    }
  },
  methods: {
    tabClick (tab, target) {
      this.$nextTick(vm => {
        this.currentRefs = this.$refs[tab.name].$refs
      })
    }
  },
  watch: {
    '$route' (newVal, oldVal) {
      if (newVal.name === 'orderList') {
        this.index = this.$route.query.index
      }
    }
  },
  mounted () {
    this.index = this.$route.query.index
    this.currentRefs = this.$refs['waitingPayItem'].$refs
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
.o-tabs
    // tabsFixed()
    padding-top $headerHeight
    .o-tabs-item
        // tabFixed()
        padding-top $headerHeight * 2
</style>
