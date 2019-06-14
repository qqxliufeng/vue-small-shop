<template>
  <div class='o-i-container' v-if="detail">
    <order-info-header :stateTip="tipTitle">
        <template slot="headerTitleInfo">
            <p class="o-i-use-info">
                {{tipContent}}
            </p>
        </template>
        <template slot="headerBottomInfo" v-if="detail.refund_mark !== 0">
            <div class="after-service-wrapper">
                <span>退票记录：{{detail.refund_count}}</span>
                <span @click="orderBackProgress">查看进度></span>
            </div>
        </template>
    </order-info-header>
    <order-info-content :scenic="detail.scenic"
                        :voucher="detail.voucher"
                        :ticketName="detail.ord_product_name"
                        :ticketNum="detail.ord_ticket_num"
                        :sendCode="detail.send_code"
                        :timeLog="detail.order_log">
    </order-info-content>
    <ticket-notice title="购买须知" :remarks="detail.goods.buy_way"></ticket-notice>
    <div class="sperator-1"></div>
    <ticket-notice title="入园方式" :remarks="detail.goods.entrance"></ticket-notice>
    <div class="sperator-1"></div>
    <ticket-notice title="退票说明" :remarks="detail.goods.refund"></ticket-notice>
    <div class="sperator-1"></div>
    <ticket-notice title="商家说明" :remarks="detail.goods.explain"></ticket-notice>
    <order-business-info :store="detail.store"></order-business-info>
    <order-detail :detail="detail"></order-detail>
    <div class="sperator-3"></div>
    <div class="bottom-action-wrapper">
      <span class="back-top" @click="backTop">
        返回到顶部
      </span>
      <span class="back-money" @click="backMoney" v-if="detail.status === 'USE_STATUS_NO' && detail.is_refund === 1 && detail.refund_mark !== 2">
        申请退款
      </span>
      <span class="comment" @click="comment">
        评价
      </span>
    </div>
  </div>
</template>

<script>
import orderInfoHeader from './components/OrderInfoHeader'
import orderInfoContent from './components/OrderInfoContent'
import ticketNotice from 'common/components/ticket-notice'
import orderBusinessInfo from '../components/OrderBusinessInfo'
import orderDetail from './components/OrderDetail'
import orderMixin from 'common/mixins/order-mixin'
export default {
  name: 'orderInfoUse',
  mixins: [orderMixin],
  props: {
    detail: Object
  },
  components: {
    orderInfoHeader,
    orderInfoContent,
    ticketNotice,
    orderBusinessInfo,
    orderDetail
  },
  data () {
    return {
    }
  },
  computed: {
    tipTitle () {
      if (this.detail.status === 'USE_STATUS_NO') { // 部分退款包含待使用的票
        return this.detail.refund_mark === 2 ? '退款/售后' : '待使用'
      } else if (this.detail.status === 'USE_STATUS_REVOKE') { // 全部退款
        return '退款/售后'
      } else if (this.detail.status === 'NO_COMMENT') { // 验证完了，进入待评价状态
        return '待评价'
      }
    },
    tipContent () {
      if (this.detail.status === 'USE_STATUS_NO') {
        return this.detail.refund_mark === 2 ? '您的订单有退款申请，请及时查看' : '产品已出票，' + this.detail.ord_play_time + '可用，请尽快使用产品'
      } else if (this.detail.status === 'USE_STATUS_REVOKE') {
        return '您的订单有退款申请，请及时查看'
      } else if (this.detail.status === 'NO_COMMENT') {
        return '快来和小伙伴们分享一下这次出游的感受吧'
      }
    }
  },
  methods: {
    backTop () {
      this.$emit('backTop')
    },
    backMoney () {
      this.$router.push({name: 'orderBackMoney', query: {id: this.detail.ord_id}})
    },
    comment () {
      this.$toast('当前订单还未进行消费')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-container
    .o-i-use-info
        color #eeeeee
        font-size .25rem
        margin-top .2rem
        line-height .3rem
    .after-service-wrapper
        margin-top rem(.2)
        border-radius rem(.08)
        background #ffffff
        opacity .8
        line-height rem(.3)
        padding rem(.2)
        overflow hidden
        color #888
        font-size rem(.25)
        & span:nth-of-type(1)
            float left
        & span:nth-of-type(2)
            float right
    .sperator-1
        background-color #f5f5f5
        height 2px
        width 90%
        margin 0 auto
    .sperator-3
        height $headerHeight
    .bottom-action-wrapper
        overflow hidden
        padding rem(.2)
        box-sizing border-box
        border-top 1px solid #f5f5f5
        background-color #ffffff
        height $headerHeight
        position fixed
        left 0
        right 0
        bottom 0
        font-size rem(.25)
        .back-top
            border-radius rem(.3)
            border 1px solid $primary
            padding rem(.1) rem(.2)
            color $primary
            float left
        .comment
            border-radius rem(.3)
            border 1px solid $primary
            padding rem(.1) rem(.2)
            float right
            color $primary
            margin-right rem(.3)
        .back-money
            border-radius rem(.3)
            background-color $primary
            padding rem(.1) rem(.2)
            float right
            color #fff
</style>
