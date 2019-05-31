<template>
  <div v-if="store">
    <order-business-info :store="store"></order-business-info>
    <div class="o-i-time-contianer">
        <ticket-remark :remark="{title: '下单店铺', value: shopName ? shopName :'暂无'}"></ticket-remark>
        <ticket-remark :remark="{title: '订单编号', value: outTradeNo}"></ticket-remark>
        <ticket-remark v-for="(item, index) of remarks" :key="index" :remark="item"></ticket-remark>
    </div>
  </div>
</template>

<script>
import TicketRemark from 'common/components/ticket-remark'
import OrderBusinessInfo from './OrderBusinessInfo'
export default {
  name: 'orderTimeInfo',
  props: {
    shopName: String,
    outTradeNo: String,
    ordAddTime: String,
    remarks: Array,
    store: Object
  },
  components: {
    TicketRemark,
    OrderBusinessInfo
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
.o-i-time-contianer
    padding-left .2rem
    &  >>> .remark-key
        font-size .25rem
</style>
