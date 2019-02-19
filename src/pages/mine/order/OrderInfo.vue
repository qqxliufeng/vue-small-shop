<template>
    <div>
        <navi title="订单详情" :isFixed="true"></navi>
        <div class="o-i-container">
            <order-info-waiting-pay v-if="orderType === '1'"></order-info-waiting-pay>
            <order-info-waiting-use v-else-if="orderType === '2'"></order-info-waiting-use>
            <order-info-waiting-comment v-else-if="orderType === '3'"></order-info-waiting-comment>
            <order-info-after-service v-else-if="orderType === '4'"></order-info-after-service>
        </div>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
import orderInfoWaitingPay from './OrderInfoWaitingPay'
import orderInfoWaitingUse from './OrderInfoWaitingUse'
import orderInfoWaitingComment from './OrderInfoWaitingComment'
import orderInfoAfterService from './OrderInfoAfterService'
export default {
  name: 'orderInfo',
  props: {
    orderType: {
      type: String,
      default: '1'
    }
  },
  components: {
    navi,
    orderInfoWaitingPay,
    orderInfoWaitingUse,
    orderInfoWaitingComment,
    orderInfoAfterService
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.o-i-container
    margin-top $headerHeight
</style>
