<template>
    <div class="r-d-detail-container">
        <navi title="提交订单" :isFixed="true"></navi>
        <div class="r-d-detail-wrapper">
            <ticket-info></ticket-info>
            <ticket-user-info></ticket-user-info>
            <ticket-discount></ticket-discount>
            <div class="r-d-detail-pay-action-wrapper">
                <span class="r-d-pay-action-price">总价：<i>￥45.00</i></span>
                <div class="r-d-pay-action-collection">
                  <p class="el-icon-star-off"></p>
                  <p>收藏</p>
                </div>
                <span class="r-d-pay-action-pay">立即预定</span>
            </div>
        </div>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
import TicketInfo from './components/TicketInfo'
import TicketDiscount from './components/TicketDiscount'
import TicketUserInfo from './components/TicketUserInfo'
export default {
  name: 'ReseveDetail',
  components: {
    navi,
    TicketInfo,
    TicketDiscount,
    TicketUserInfo
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.slide-fade-enter-active, .slide-fade-leave-active
    transition all .3s
.slide-fade-enter, .slide-fade-leave-to
    transform translateY($headerHeight)
    opacity 0
.r-d-detail-container
    z-index 0
    .r-d-detail-wrapper
        contentFixed()
        padding-bottom $headerHeight * 2
        .r-d-detail-pay-action-wrapper
            display flex
            height $headerHeight
            background-color #ffffff
            position fixed
            left 0
            right 0
            bottom 0
            align-items center
            border-top 1px solid #f5f5f5
            .r-d-pay-action-price
                flex 1
                text-align center
                & i
                   color $orangeColor
            .r-d-pay-action-collection
                display flex
                padding 0 rem(.3)
                flex-direction column
                align-items center
                & p:nth-child(1)
                    textStyle($orangeColor, .35)
                & p:nth-child(2)
                    margin-top rem(.1)
                    textStyle(#555555, .25)
            .r-d-pay-action-pay
                background-color $orangeColor
                textStyle(#fff, .32)
                display flex
                align-items center
                height 100%
                padding 0 rem(.3)
</style>
