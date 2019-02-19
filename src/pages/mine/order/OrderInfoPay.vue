<template>
    <div>
        <navi title="支付"></navi>
        <div class="o-i-pay-container">
            <div class="o-i-pay-time-wrapper">
                <p>剩余支付时间</p>
                <p>99:99</p>
            </div>
            <div class="o-i-pay-goods-info-wrapper">
                <div>
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550315558341&di=5eb3ae6776ef018e8eadf3eaabbeb16f&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb3119313b07eca8043a138229c2397dda044834a.jpg">
                </div>
                <div>
                    <p>卧虎山滑雪场成人票</p>
                    <p>￥188</p>
                </div>
            </div>
            <div class="o-i-pay-goods-info-money">
                <span>支付金额</span>
                <span>￥25.50</span>
            </div>
            <div class="sperator-line"></div>
            <div class="o-i-pay-goods-info-money-add">
                <span>门票补差价</span>
                <span>￥23.99</span>
            </div>
            <div class="sperator-line-height"></div>
            <div class="o-i-pay-goods-info-money">
                <span>请选择支付方式</span>
            </div>
            <div class="sperator-line"></div>
            <div class="o-i-pay-type-wrapper">
                <div class="o-i-pay-type-zfb-wrapper" v-if="!this.$isWeiXin">
                    <span>支付宝</span>
                    <i class="el-icon-success"></i>
                </div>
                <div class="o-i-pay-type-zfb-wrapper" v-else>
                    <span>微信</span>
                    <i class="el-icon-success"></i>
                </div>
            </div>
            <p class="o-i-pay-action">支付</p>
            <div class="sperator-line"></div>
        </div>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
export default {
  name: 'orderInfoPay',
  components: {
    navi
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-pay-time-wrapper
    borderBottom()
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding .5rem
    & p:nth-child(1)
        color #888
        font-size .28rem
        line-height .32rem
    & p:nth-child(2)
        color #333
        font-size .5rem
        line-height .52rem
        margin-top .2rem
.o-i-pay-goods-info-wrapper
    display flex
    padding .2rem
    borderBottom()
    & div:nth-child(1)
        flex 1
        height 1rem
        overflow hidden
        & img
            width 100%
            height 100%
            object-fit cover
    & div:nth-child(2)
        flex 5
        padding-left .2rem
        box-sizing border-box
        display flex
        flex-direction column
        justify-content space-between
        overflow hidden
        & p:nth-child(1)
            ellipsis()
            color #333
            font-size .3rem
            line-height .32rem
        & p:nth-child(2)
            color $primary
            font-size .32rem
            line-height .34rem
.o-i-pay-goods-info-money
    overflow hidden
    padding rem(.3)
    & span:nth-child(1)
        float left
        normalTextStyle(#333, .3)
        &::before
            beforeLine()
    & span:nth-child(2)
        float right
        normalTextStyle($orangeColor, .28)
.sperator-line
    horizontalLine(#f5f5f5, .02, 0, .4)
.o-i-pay-goods-info-money-add
    overflow hidden
    padding rem(.3)
    borderBottom()
    & span:nth-child(1)
        float left
        normalTextStyle(#888888, .28)
    & span:nth-child(2)
        float right
        normalTextStyle(#333, .28)
.sperator-line-height
    horizontalLine(#f5f5f5, .2)
.o-i-pay-action
    padding rem(.2)
    background-color $primary
    position fixed
    left 0
    bottom 0
    right 0
    text-align center
    normalTextStyle(#ffffff, .3)
.o-i-pay-type-zfb-wrapper
    overflow hidden
    padding rem(.3)
    & span
        normalTextStyle(#333333, .3)
    & i
        normalTextStyle($primary, .3)
        float right
</style>
