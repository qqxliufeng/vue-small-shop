<template>
    <div>
        <ticket-header></ticket-header>
        <ticket-images></ticket-images>
        <ticket-info>
            <template slot="info">
                <p class="t-d-intro-title">产品介绍</p>
                <p class="t-d-intro-content">趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼趵突泉位于济南市是全国最好的泉眼</p>
            </template>
        </ticket-info>
        <div class="t-d-detail-buy-info">
            <p class="t-d-detail-buy-info-title">购买须知</p>
            <p class="t-d-detail-buy-info-content" :style="bugInfoHeight">请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，请拿好你的身份证、钱和人，</p>
            <p class="t-d-detail-buy-info-see-more" @click="seeMore">
                <span :class="[isSeeMore ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"></span>
            </p>
        </div>
        <ticket-comment></ticket-comment>
        <!-- <transition name="slide-fade"> -->
            <div class="t-d-detail-order-info-wrapper">
                <p class="t-d-detail-order-info-price">
                    总价：<span>￥55.00</span>
                </p>
                <p class="t-d-detail-order-info-action" @click="reseve">立即预定</p>
            </div>
        <!-- </transition> -->
    </div>
</template>

<script>
import TicketHeader from './components/ScenicDetailHeader'
import TicketImages from './components/ScenicDetailImages'
import TicketInfo from './components/ScenicDetailInfo'
import TicketComment from './components/ScenicDetailComment'
export default {
  name: 'TicketDetail',
  components: {
    TicketHeader,
    TicketImages,
    TicketInfo,
    TicketComment
  },
  data () {
    return {
      bugInfoHeight: {
        maxHeight: '1.85rem'
      },
      isSeeMore: true,
      showBuyAction: true
    }
  },
  methods: {
    seeMore () {
      if (this.isSeeMore) {
        this.bugInfoHeight.maxHeight = '10rem'
      } else {
        this.bugInfoHeight.maxHeight = '1.85rem'
      }
      this.isSeeMore = !this.isSeeMore
    },
    reseve () {
      this.$router.push({name: 'reseveDetail'})
    }
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
.t-d-intro-title
    textStyle(#333, .35)
.t-d-intro-content
    margin-top rem(.2)
    normalTextStyle(#888, .3)
.t-d-intro-back-money
    padding rem(.2)
    overflow hidden
    border-top #f5f5f5 solid 1px
    display flex
    justify-content space-between
    align-items center
    & span
        textStyle(#333, .28)
        & i
            color $orangeColor
    & button
        color #ffffff
        background-color $orangeColor
        border-radius rem(.1)
        padding rem(.1) rem(.2)
.t-d-detail-buy-info
    padding rem(.2)
    .t-d-detail-buy-info-title
        textStyle(#333, .35)
        padding rem(.2) 0
        borderBottom()
    .t-d-detail-buy-info-content
        overflow hidden
        normalTextStyle(#888, .3)
        padding rem(.2) 0
    .t-d-detail-buy-info-see-more
        normalTextStyle(#aaa, .4)
        text-align center
.t-d-detail-order-info-wrapper
    display flex
    // position fixed
    // bottom 0
    // left 0
    // right 0
    border-top #f5f5f5 solid 1px
    height $headerHeight
    & p
        flex 1
    .t-d-detail-order-info-price
        text-align center
        background-color #ffffff
        line-height $headerHeight
        textStyle(#333, .3)
        & span
            color $orangeColor
    .t-d-detail-order-info-action
        textStyle(#fff, .3)
        text-align center
        background-color $orangeColor
        line-height $headerHeight
</style>
