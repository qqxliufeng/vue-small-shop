<template>
  <div class='o-i-result-container'>
    <div class="navi-relative navi-container">
        <span class="iconfont navi-back" @click="back">&#xe625;</span>
        <span class="navi-title">
            支付结果
        </span>
    </div>
    <div class="result-icon-container">
      <span class="result-icon" :class="{'el-icon-success' : state === 1, 'el-icon-circle-close' : state === 0}"></span>
      <p class="result-icon-tip">{{state === 1 ? '支付成功' : '支付失败'}}</p>
    </div>
    <div class="result-action-container">
      <p><el-button size="mini" type="danger" class="button" @click="seeMore">继续购买</el-button></p>
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
      state: parseInt(this.$route.query.state || 0),
      scenicId: this.$route.query.scenic_id,
      from: null
    }
  },
  methods: {
    seeMore () {
      this.$router.replace({name: 'scenicDetail', query: {s: this.scenicId, i: this.$root.state.identity, t: this.$root.state.storeId}})
    },
    seeOrder () {
      this.$router.replace({name: 'orderInfo', params: {orderId: this.orderId.toString(), orderType: '2'}})
    },
    back () {
      this.$router.replace({name: 'personal'})
    }
  },
  mounted () {
    if (!this.$root.userInfo.isLogin()) {
      let state = this.$root.state
      if (state.token) {
        this.$http(this.$urlPath.userInfo, {
          token: state.token
        }, null, (data) => {
          data.data.token = state.token
          this.$root.$data.userInfo.setUserInfo(data.data)
        }, null)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (Number(vm.$route.query.state) === 0) {
        vm.$router.replace({name: 'orderInfo', params: {orderId: vm.$route.query.order_id.toString(), orderType: '1'}})
      } else {
        vm.from = from
        if (from.name) {
          if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
            console.log('在微信里面')
          } else {
            vm.$router.replace({name: 'personal'})
          }
        }
      }
    })
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
.navi-container
    height $headerHeight
    line-height $headerHeight
    background-color #f5f5f5
    opacity 1
    text-align center
    font-size .32rem
    top 0
    left 0
    right 0
    z-index 999
    .navi-back
        font-size .4rem
        position absolute
        left 0
        top 0
        margin-left .3rem
    .navi-right-action
        position absolute
        right  0
        top 0
        margin-right .3rem
        font-size .3rem
.navi-relative
    position relative
.navi-fixed
    position fixed
</style>
