<template>
  <div class='o-d-detail-container'>
    <p class="title"><span class="title-info">订单信息</span></p>
    <div class="content-wrapper">
      <p class="content-title">
        联系人
      </p>
      <p class="content-info">
        姓名：王大宝
      </p>
      <p class="content-info">
        手机号：15910101111
      </p>
    </div>
    <div class="content-wrapper">
      <p class="content-title">
        游玩人1
      </p>
      <p class="content-info">
        姓名：王大宝
      </p>
      <p class="content-info">
        手机号：15910101111
      </p>
    </div>
    <div class="sperator-1"></div>
    <div class="content-wrapper">
      <p class="content-title">
        订单金额
      </p>
      <p class="content-info">
        门票价格：￥{{detail.ord_price}}      X{{detail.ord_ticket_num}}
      </p>
      <p class="content-info">
        合计金额：￥{{detail.ord_amount}}
      </p>
    </div>
    <div class="sperator-1"></div>
    <ticket-remark :remark="{ title: '下单店铺', value: detail.shop_name }"></ticket-remark>
    <ticket-remark :remark="{ title: '订单编号', value: detail.out_trade_no }"></ticket-remark>
    <ticket-remark v-for="(item, index) of detail.order_log" :key="index" :remark="{ title: item.type, value: item.ctime}"></ticket-remark>
  </div>
</template>

<script>
import TicketRemark from 'common/components/ticket-remark'
export default {
  name: 'orderDetail',
  props: {
    detail: Object
  },
  components: {
    TicketRemark
  },
  data () {
    return {
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-d-detail-container
    .title
        padding rem(.2)
        &:before
            content ''
            width 3px
            height rem(.3)
            background-color $primary
            display inline-block
            vertical-align middle
        .title-info
            display inline-block
            margin-left rem(.3)
            color #333
            font-size rem(.32)
            vertical-align middle
    .content-wrapper
        padding-left rem(.55)
        .content-title
            textStyle(#333, .3)
            margin rem(.2) 0
        .content-info
            margin-left rem(.2)
            textStyle(#888, .26)
            line-height rem(.5)
    .sperator-1
        height 2px
        width 90%
        margin rem(.2) auto
        background-color #f5f5f5
</style>
