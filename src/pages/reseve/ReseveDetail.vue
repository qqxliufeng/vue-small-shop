<template>
    <div>
        <navi title="提交订单" :isFixed="true"></navi>
        <div class="r-d-detail-wrapper">
            <ticket-info></ticket-info>
        </div>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
import TicketInfo from './components/TicketInfo'
export default {
  name: 'ReseveDetail',
  components: {
    navi,
    TicketInfo
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.r-d-detail-wrapper
    position absolute
    top $headerHeight
    left 0
    right 0
</style>
