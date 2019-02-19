<template>
    <div>
        <navi title="我的订单" :isFixed="true"></navi>
        <el-tabs value="allItem" :stretch="true" class="o-tabs" @tab-click="tabClick">
            <el-tab-pane name="allItem" label="全部" class="o-tabs-item" :lazy="true">
                <order-list-item ref="allItem"></order-list-item>
            </el-tab-pane>
            <el-tab-pane name="waitingPayItem" label="待付款" class="o-tabs-item" :lazy="true">
                <order-list-item ref="waitingPayItem"></order-list-item>
            </el-tab-pane>
            <el-tab-pane name="waitingUseItem" label="待使用" class="o-tabs-item" :lazy="true">
                <order-list-item ref="waitingUseItem"></order-list-item>
            </el-tab-pane>
            <el-tab-pane name="waitingCommentItem" label="待评价" class="o-tabs-item" :lazy="true">
                <order-list-item ref="waitingCommentItem"></order-list-item>
            </el-tab-pane>
            <el-tab-pane name="afterServiceItem" label="售后" class="o-tabs-item" :lazy="true">
                <order-list-item ref="afterServiceItem"></order-list-item>
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
      refsArray: ['allItem', 'waitingPayItem', 'waitingUseItem', 'waitingCommentItem', 'afterServiceItem']
    }
  },
  methods: {
    tabClick (tab, target) {
      this.$nextTick(vm => {
        this.currentRefs = this.$refs[tab.name].$refs
      })
    }
  },
  mounted () {
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
.o-tabs
    tabsFixed()
    .o-tabs-item
        tabFixed()
</style>
