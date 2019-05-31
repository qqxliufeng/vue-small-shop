<template>
    <div>
        <navi title="订单详情" :isFixed="true"></navi>
        <div class="o-i-container">
            <order-info-waiting-pay v-if="orderType === '1'" :detail="detail"></order-info-waiting-pay>
            <order-info-waiting-use v-else-if="orderType === '2'" :detail="detail"></order-info-waiting-use>
            <order-info-waiting-comment v-else-if="orderType === '3'" :detail="detail"></order-info-waiting-comment>
            <!-- <order-info-after-service v-else-if="orderType === '4'" :orderId="orderId"></order-info-after-service> -->
            <order-info-other v-else :detail="detail"></order-info-other>
        </div>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
import orderInfoWaitingPay from './OrderInfoWaitingPay'
// import orderInfoWaitingUse from './OrderInfoWaitingUse'
import orderInfoWaitingUse from './orderInfo/OrderInfoUse'
import orderInfoWaitingComment from './OrderInfoWaitingComment'
import orderInfoAfterService from './OrderInfoAfterService'
import orderInfoOther from './OrderInfoOther'
export default {
  name: 'orderInfo',
  props: {
    orderId: {
      type: String,
      default: '1'
    },
    orderType: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      detail: null
    }
  },
  watch: {
    '$route' (newVal, oldVal) {
      if (newVal.name === 'orderInfo') {
        this.detail = null
        this.getData()
      }
    }
  },
  components: {
    navi,
    orderInfoWaitingPay,
    orderInfoWaitingUse,
    orderInfoWaitingComment,
    orderInfoAfterService,
    orderInfoOther
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.orderDetails, {
        ord_id: this.orderId
      }, '', (data) => {
        this.detail = data.data
        if (this.orderType === '1') {
          this.detail.time = data.time
        }
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  mounted () {
    // if (this.orderType !== '4') {
    this.getData()
    // }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.o-i-container
    margin-top $headerHeight
</style>
