<template>
  <div class='o-i-result-container' v-if="detail">
    <div class="navi-fixed navi-container">
        <span class="iconfont navi-back" @click="back">&#xe625;</span>
        <span class="navi-title">
            支付结果
        </span>
    </div>
    <div style="height: .86rem"></div>
    <order-info-header stateTip="待使用">
        <template slot="headerTitleInfo">
            <p class="o-i-use-info">
                {{'产品已出票，' + detail.ord_play_time + '可用，请尽快使用产品'}}
            </p>
        </template>
    </order-info-header>
    <order-info-content :scenic="detail.scenic"
                        :voucher="detail.voucher"
                        :ticketName="detail.ord_product_name"
                        :ticketNum="detail.ord_ticket_num"
                        :refundTickets="detail.refund_tickets"
                        :sendCode="detail.send_code"
                        :timeLog="detail.order_log">
    </order-info-content>
    <!-- <div class="result-icon-container">
      <span class="result-icon" :class="{'el-icon-success' : state === 1, 'el-icon-circle-close' : state === 0}"></span>
      <p class="result-icon-tip">{{state === 1 ? '支付成功' : '支付失败'}}</p>
    </div> -->
    <div class="result-action-container">
      <el-button size="mini" type="danger" class="button" @click="seeMore">继续购买</el-button>
      <el-button size="mini" type="primary" class="button" v-if="no && state === 1" @click="seeOrder">查看订单</el-button>
    </div>
    <scenic-detail-hot :hotGoodsList="hotGoodsList" v-if="hotGoodsList && hotGoodsList.length > 0" @reseve-detail="reseveDetail"></scenic-detail-hot>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import OrderInfoHeader from './orderInfo/components/OrderInfoHeader'
import OrderInfoContent from './orderInfo/components/OrderInfoContent'
import ScenicDetailHot from '@/pages/scenicdetail/components/ScenicDetailHot'
export default {
  name: 'orderPayResult',
  components: {
    navi,
    OrderInfoHeader,
    OrderInfoContent,
    ScenicDetailHot
  },
  data () {
    return {
      no: this.$route.query.out_trade_no || '',
      orderId: this.$route.query.order_id,
      state: parseInt(this.$route.query.state || 0),
      scenicId: this.$route.query.scenic_id,
      detail: null,
      hotGoodsList: null
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
    },
    getData () {
      this.$http(this.$urlPath.orderDetails, {
        ord_id: this.orderId
      }, '', (data) => {
        this.detail = data.data
        this.getScenicInfo()
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    getScenicInfo () {
      this.$http(this.$urlPath.scenicDetailUrl, {
        s_id: this.scenicId,
        identity: this.$root.state.getSallerInfo().identity,
        store_id: this.$root.state.getSallerInfo().storeId
      }, '', (data) => {
        this.hotGoodsList = data.data.hot_goods
      }, (errorCode, error) => {
      })
    },
    reseveDetail (item) {
      this.$router.replace({name: 'reseveDetail', query: { goods_id: item.goodsId, scenicId: this.scenicId }})
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
        vm.getData()
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
.o-i-use-info
    color #eeeeee
    font-size .25rem
    margin-top .2rem
    line-height .3rem
.result-action-container
    margin rem(.3)
    text-align center
    display flex
    .button
        flex 1
        width 50%
        line-height 1
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
