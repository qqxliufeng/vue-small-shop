<template>
    <div>
        <order-info-header>
            <template slot="headerTitleInfo">
                <span class="o-i-release-pay-time">
                    剩余支付时间：2019-01-10
                </span>
            </template>
            <template slot="headerBottomInfo">
               <p class="o-i-pay">立即支付</p>
            </template>
        </order-info-header>
        <order-ticket-money-info>
            <template slot="ticketMoneyDetail">
                <div>
                    <p v-for="(item,index) of moneyDetailList" :key="index" class="o-i-info-money-detail">
                        <span class="span-color-1" :class="{'span-color-3': index == moneyDetailList.length - 1}">{{item.name}}</span>
                        <span class="span-color-2" :class="{'span-color-4': index == moneyDetailList.length - 1}">{{item.money}}</span>
                    </p>
                </div>
            </template>
        </order-ticket-money-info>
        <div class="sperator-line"></div>
        <order-ticket-info>
            <template slot="ticketInfoDetail">
                <order-info-key-value title="有效期" value="2019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-10"></order-info-key-value>
                <order-info-key-value title="入园凭证" value="只要是用钱的买"></order-info-key-value>
            </template>
        </order-ticket-info>
        <order-info-user-info v-for="(item,index) of ['游玩人信息','预定须知']" :title="item" :key="index">
            <template slot="userInfo">
                <order-info-key-value title="有效期" value="2019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-10"></order-info-key-value>
                <order-info-key-value title="入园凭证" value="只要是用钱的买"></order-info-key-value>
            </template>
        </order-info-user-info>
        <div class="sperator-line"></div>
        <div class="o-i-time-contianer">
            <order-info-key-value title="入园凭证" value="只要是用钱的买"></order-info-key-value>
            <order-info-key-value title="入园凭证" value="只要是用钱的买"></order-info-key-value>
            <order-info-key-value title="入园凭证" value="只要是用钱的买"></order-info-key-value>
            <order-info-key-value title="入园凭证" value="只要是用钱的买"></order-info-key-value>
            <order-info-key-value title="入园凭证" value="只要是用钱的买"></order-info-key-value>
        </div>
        <div class="o-i-pay-action-wrapper">
            <span>删除订单</span>
            <span @click="goPay">去支付</span>
        </div>
    </div>
</template>

<script>
import orderInfoHeader from './components/OrderInfoHeader'
import orderTicketMoneyInfo from './components/OrderTicketMoneyInfo'
import orderTicketInfo from './components/OrderTicketInfo'
import orderInfoKeyValue from './components/orderInfoKeyValue'
import orderInfoUserInfo from './components/orderInfoUserInfo'
export default {
  name: 'orderInfoWaitingPay',
  components: {
    orderInfoHeader,
    orderTicketMoneyInfo,
    orderTicketInfo,
    orderInfoKeyValue,
    orderInfoUserInfo
  },
  data () {
    return {
      moneyDetailList: [
        {
          name: '成人票',
          money: '￥29.00'
        },
        {
          name: '成人票',
          money: '￥29.00'
        },
        {
          name: '成人票',
          money: '￥29.00'
        },
        {
          name: '成人票',
          money: '￥29.00'
        }
      ]
    }
  },
  methods: {
    goPay () {
      this.$router.push({name: 'orderInfoPay'})
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.o-i-release-pay-time
    color #ffffff
    font-size .25rem
    float right
    line-height .3rem
.o-i-pay
    border .01rem solid #ffffff
    margin 0 auto
    color #ffffff
    text-align center
    padding .2rem 0
    border-radius .1rem
    margin-top .5rem
    font-size .3rem
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
.sperator-line
    background-color #f5f5f5
    height .1rem
.o-i-time-contianer
    padding .2rem
.o-i-pay-action-wrapper
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
        color #333333
    & span:nth-child(2)
        background-color $orangeColor
        color #ffffff
</style>
