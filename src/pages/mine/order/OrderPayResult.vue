<template>
  <div class='o-i-result-container'>
    <navi title="支付结果"></navi>
    <div class="result-icon-container">
      <span class="el-icon-success result-icon" :class="{'el-icon-success' : state === 1, 'el-icon-circle-close' : state === 0}"></span>
      <p class="result-icon-tip">{{state === 1 ? '支付成功' : '支付失败'}}</p>
    </div>
    <div class="result-action-container">
      <p><el-button size="mini" type="danger" class="button" @click="seeMore">再看看</el-button></p>
      <p><el-button size="mini" type="primary" class="button" v-if="no && state === 1" @click="seeOrder">查看订单</el-button></p>
    </div>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
export default {
  name: 'orderPayResult',
  components: {
    navi
  },
  data () {
    return {
      no: this.$route.query.out_trade_no || '',
      orderId: this.$route.query.order_id,
      state: parseInt(this.$route.state || 1),
      scenicId: this.$route.query.scenic_id
    }
  },
  methods: {
    seeMore () {
      this.$router.replace({name: 'scenicDetail', query: {scenicId: this.scenicId, identity: this.$root.state.identity, storeId: this.$root.state.storeId}})
    },
    seeOrder () {
      this.$router.replace({name: 'orderInfo', params: {orderId: this.orderId.toString(), orderType: '2'}})
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.result-icon-container
    text-align center
    padding-top rem(1)
    .result-icon
        font-size rem(1.5)
        color $primary
    .result-icon-tip
        textStyle(#666, .3)
        margin-top rem(.4)
.result-action-container
    margin-top rem(1.5)
    text-align center
    & > p
        margin-top rem(.5)
    .button
        width 50%
        line-height 1.5
        font-size rem(.3)
</style>
