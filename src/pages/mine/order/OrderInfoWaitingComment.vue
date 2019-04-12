<template>
    <div v-if="detail">
      <order-info-header stateTip="待评价">
            <template slot="headerTitleInfo">
                <p class="o-i-use-info">
                    快来和小伙伴们分享一下这次出游的感受吧
                </p>
            </template>
        </order-info-header>
        <order-ticket-money-info :storeInfo="storeInfo">
            <template slot="ticketMoneyDetail" slot-scope="props">
                <div>
                    <p v-for="(item,index) of props.moneyDetail" :key="index" class="o-i-info-money-detail">
                        <span class="span-color-1" :class="{'span-color-3': index == props.moneyDetail.length - 1}">{{item.key}}</span>
                        <span class="span-color-2" :class="{'span-color-4': index == props.moneyDetail.length - 1}">{{item.value}}</span>
                    </p>
                </div>
            </template>
        </order-ticket-money-info>
        <order-ticket-info v-for="item of detail.voucher" :key="item.v_id" :itemInfo="item" :ticketName="detail.ord_product_name">
        </order-ticket-info>
        <div class="sperator-line"></div>
        <order-info-user-info title="游客信息" :tourist="detail.tourist">
        </order-info-user-info>
        <order-info-user-info title="预定须知" :remarks="remarks">
        </order-info-user-info>
        <div class="sperator-line"></div>
        <order-time-info :shopName="detail.shop_name" :outTradeNo="detail.out_trade_no" :remarks="times"></order-time-info>
        <div class="o-i-waiting-use-action-wrapper" @click="comment">
            <span>评价</span>
        </div>
    </div>
</template>

<script>
import orderInfoHeader from './components/OrderInfoHeader'
import orderTicketMoneyInfo from './components/OrderTicketMoneyInfo'
import orderTicketInfo from './components/OrderTicketInfo'
import orderInfoKeyValue from './components/orderInfoKeyValue'
import orderInfoUserInfo from './components/orderInfoUserInfo'
import OrderTimeInfo from './components/OrderTimeInfo'
import TicketRemark from 'common/components/ticket-remark'
import orderStep from './components/OrderStep'
import calander from 'common/components/calendar/calendar.vue'
import orderMixin from 'common/mixins/order-mixin'
export default {
  name: 'orderInfoWaitingUse',
  mixins: [orderMixin],
  props: {
    detail: Object
  },
  components: {
    orderInfoHeader,
    orderTicketMoneyInfo,
    orderTicketInfo,
    orderInfoKeyValue,
    orderInfoUserInfo,
    OrderTimeInfo,
    TicketRemark,
    orderStep,
    calander
  },
  data () {
    return {
    }
  },
  watch: {
    detail (newVal, oldVal) {
      if (newVal.status !== 'NO_COMMENT') {
        this.$router.go(-1)
      }
    }
  },
  methods: {
    comment () {
      this.$router.push({name: 'orderComment', query: {orderId: this.detail.ord_id}})
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.o-i-use-info
    color #eeeeee
    font-size .25rem
    margin-top .2rem
    line-height .3rem
.o-i-waiting-use-action-wrapper
    display flex
    border-top .01rem solid #cccccc
    height .8rem
    text-align center
    & span
        flex 1
        display flex
        flex-direction column
        justify-content center
        font-size .3rem
    & span:nth-child(1)
        background-color $primary
        color #ffffff
.c-e-wrapper
    font-size .2rem
    margin 0 auto
    & p:nth-child(1)
        color $orangeColor
        margin-top .1rem
    & p:nth-child(2)
        color #cccccc
        margin-top .1rem
.o-i-info-money-detail
    overflow hidden
    margin .2rem 0
    line-height .3rem
    & span:nth-child(1)
        float left
    & span:nth-child(2)
        float right
    .span-color-1
        color #888888
        font-size .25rem
    .span-color-2
        color #333333
        font-size .25rem
    .span-color-3
        color #333333
        font-size .28rem
    .span-color-4
        color $orangeColor
        font-size .28rem
</style>
