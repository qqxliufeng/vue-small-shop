<template>
  <div class='o-i-container'>
    <order-info-header stateTip="tipTitle">
        <template slot="headerTitleInfo">
            <p class="o-i-use-info">
                sdfsdfweef
            </p>
        </template>
        <template slot="headerBottomInfo">
            <div class="after-service-wrapper">
                <span>退票记录：2</span>
                <span>查看进度></span>
            </div>
        </template>
    </order-info-header>
    <order-info-content></order-info-content>
    <ticket-notice></ticket-notice>
    <div class="sperator-1"></div>
    <ticket-notice></ticket-notice>
    <div class="sperator-1"></div>
    <ticket-notice></ticket-notice>
  </div>
</template>

<script>
import orderInfoHeader from './components/OrderInfoHeader'
import orderInfoContent from './components/OrderInfoContent'
import ticketNotice from 'common/components/ticket-notice'
export default {
  name: 'orderInfoUse',
  components: {
    orderInfoHeader,
    orderInfoContent,
    ticketNotice
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
</style>
