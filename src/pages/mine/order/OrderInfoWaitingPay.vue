<template>
    <div v-if="detail" class="container">
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
        <div class="sperator-line"></div>
        <!-- <order-ticket-info>
            <template slot="ticketInfoDetail">
                <order-info-key-value title="有效期" value="2019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-102019-01-10"></order-info-key-value>
                <order-info-key-value title="入园凭证" value="只要是用钱的买"></order-info-key-value>
            </template>
        </order-ticket-info> -->
        <order-info-user-info title="游客信息" >
            <template slot="userInfo">
                <div v-for="(item, index) of detail.tourist" :key="index" class="user-info-container">
                    <p class="wrapper">
                        <span class="user-key">姓名</span>
                        <span class="user-value">{{item.t_username ? item.t_username : '暂无'}}</span>
                    </p>
                    <p class="wrapper">
                        <span class="user-key">手机号</span>
                        <span class="user-value">{{item.t_phone ? item.t_phone : '暂无'}}</span>
                    </p>
                    <p class="wrapper">
                        <span class="user-key">身份证</span>
                        <span class="user-value">{{item.t_id_no ? item.t_id_no : '暂无'}}</span>
                    </p>
                    <p class="wrapper">
                        <span class="user-key">学校</span>
                        <span class="user-value">{{item.t_school ? item.t_school : '暂无'}}</span>
                    </p>
                </div>
            </template>
        </order-info-user-info>
        <order-info-user-info title="预定须知" >
            <template slot="userInfo">
                <ticket-remark v-for="(item, index) of remarks" :key="index" :remark="item"></ticket-remark>
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
import TicketRemark from 'common/components/ticket-remark'
export default {
  name: 'orderInfoWaitingPay',
  props: {
    detail: Object
  },
  components: {
    orderInfoHeader,
    orderTicketMoneyInfo,
    orderTicketInfo,
    orderInfoKeyValue,
    orderInfoUserInfo,
    TicketRemark
  },
  data () {
    return {
    }
  },
  computed: {
    storeInfo () {
      return {
        store: this.detail.store,
        ticketName: this.detail.ord_product_name,
        money: {
          title: '支付金额',
          money: this.detail.ord_amount,
          detail: [
            {
              key: '数量',
              value: 'X' + this.detail.ord_ticket_num
            },
            {
              key: '单价',
              value: '￥' + this.detail.ord_price
            },
            {
              key: '总价',
              value: '￥' + this.detail.ord_amount
            }
          ]
        }
      }
    },
    remarks () {
      if (this.detail) {
        let tempRemarks = []
        for (let key in this.detail.goods) {
          if (this.detail.goods[key] instanceof Object) {
            tempRemarks.push(this.detail.goods[key])
          }
        }
        return tempRemarks
      } else {
        return []
      }
    },
    tourist () {
      let tourist = []
      this.detail.tourist.forEach((element, index) => {
        console.log(element)
        for (let key in element) {
          tourist[index][key].push(element[key])
        }
      })
      console.log(tourist)
      return tourist
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
.container >>> .remark-key
    font-size .25rem
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
.user-info-container
    border-bottom 1px solid #f5f5f5
    .wrapper
        margin-left .2rem
        margin .3rem .2rem
        & span
            display inline-block
        & .user-key
            color #333333
            width 30%
            vertical-align top
        & .user-value
            width 60%
            margin-left 5%
            vertical-align middle
            color #888888
</style>
