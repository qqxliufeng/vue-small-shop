<template>
  <div class='o-i-container' v-if="detail">
    <order-info-header :stateTip="stateModel.stateTip">
        <template slot="headerTitleInfo">
            <p class="o-i-use-info">
                {{stateModel.discription}}
            </p>
        </template>
        <template slot="headerBottomInfo" v-if="detail.refund_mark !== 0">
            <div class="after-service-wrapper" @click="orderBackProgress">
                <span>退票记录：{{detail.refund_count}}</span>
                <span>查看进度></span>
            </div>
        </template>
    </order-info-header>
    <order-info-content :scenic="detail.scenic" :voucher="detail.voucher" :ticketName="detail.ord_product_name" :ticketNum="detail.ord_ticket_num" :timeLog="detail.order_log"></order-info-content>
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
      stateModel: {}
    }
  },
  watch: {
    detail (newVal, oldVal) {
      if (newVal) {
        switch (newVal.status) {
          case 'USE_STATUS_OFF': // 被取消
            this.stateModel.stateTip = '已取消'
            this.stateModel.discription = '订单已经取消，如有需要请重新下单购买'
            break
          case 'USE_STATUS_EXPIRD': // 已过期
            this.stateModel.stateTip = '已过期'
            this.stateModel.discription = '订单已经过期，如有需要请重新下单购买'
            break
          case 'USE_STATUS_OVER':
          case 'ALREADY_COMMENT': // 已经评价
            this.stateModel.stateTip = '已完成'
            this.stateModel.discription = '感谢您的本次消费，订单已经完结'
            break
          case 'USE_STATUS_REVOKE': // 已退款
            this.stateModel.stateTip = '退款/售后'
            this.stateModel.discription = '您的订单有退款申请，请及时查看'
            break
          case 'USE_STATUS_NO': // 待使用
            this.stateModel.stateTip = '待使用'
            this.stateModel.discription = '产品已出票，请尽快使用产品'
            break
          case 'NO_COMMENT': // 待评价
            this.stateModel.stateTip = '待评价'
            this.stateModel.discription = '快来和小伙伴们分享一下这次出游的感受吧'
            break
        }
      }
    }
  },
  methods: {
    orderBackProgress () {
      this.$router.push({name: 'orderBackProgress', query: {id: this.detail.ord_id}})
    },
    backTop () {
      this.$emit('backTop')
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
