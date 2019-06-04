<template>
    <div class='r-n-container' v-if="goods">
      <span class="el-icon-close close-icon" @click="close"></span>
      <div class="scenic-info-wrapper" v-if="scenic">
        <div class="scenic-info-image-wrapper">
          <img v-lazy="$utils.image.getImagePath(scenic.scenicimages)">
        </div>
        <div class="scenic-info">
          <p class="scenic-title">
            {{scenic.s_title}}
          </p>
          <div class="ticket-title-wrapper">
            <span class="ticket-title">
              {{goods.goods_title}}
            </span>
            <span class="ticket-price">
              ￥{{scenic.minPrice}}
              <i>起</i>
            </span>
          </div>
          <div class="scenic-detail">
            <div class="scenic-detail-rate">
              <el-rate disabled :value="Number(scenic.mark) || 0" show-score text-color="#444"></el-rate>
            </div>
            <span class="scenic-detail-sale-count">
              已售{{scenic.totalSales}}张
            </span>
          </div>
        </div>
      </div>
      <div class="sperator-1"></div>
      <ticket-notice title="入园须知" :remarks="goods.entrance"></ticket-notice>
      <div class="sperator-1"></div>
      <ticket-notice title="退还说明" :remarks="goods.refund"></ticket-notice>
      <div class="sperator-1"></div>
      <ticket-notice title="商家说明" :remarks="goods.explain"></ticket-notice>
      <div class="sperator-2"></div>
      <div class="next" @click="close">下一步</div>
    </div>
</template>

<script>
import TicketNotice from 'common/components/ticket-notice'
export default {
  name: 'reseveNotice',
  props: {
    goods: Object,
    scenic: Object
  },
  components: {
    TicketNotice
  },
  data () {
    return {

    }
  },
  methods: {
    close () {
      this.$root.$emit('closeDialog')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.r-n-container
    position relative
    .close-icon
        position absolute
        right rem(.2)
        textStyle(#888, .4)
    .scenic-info-wrapper
        display flex
        padding rem(.3)
        overflow hidden
        box-sizing border-box
        .scenic-info-image-wrapper
            height rem(1.5)
            width rem(1.5)
            flex-shrink 0
            border-radius rem(.1)
            overflow hidden
            & img
                width 100%
                height 100%
                object-fit cover
        .scenic-info
            flex 1
            margin-left rem(.2)
            display flex
            flex-direction column
            justify-content space-between
            overflow hidden
            .scenic-title
                ellipsis()
                textStyle(#333, .3)
            .ticket-title-wrapper
                display flex
                overflow hidden
                .ticket-title
                    flex 1
                    ellipsis()
                    textStyle(#333, .28)
                .ticket-price
                    margin-left rem(.2)
                    textStyle($orangeColor, .3)
                    & i
                        textStyle(#333, .2)
            .scenic-detail
                display flex
                align-items center
                .scenic-detail-rate
                    flex 1
                    & >>> .el-rate__icon
                        font-size 16px !important
                        margin-right 2px
                .scenic-detail-sale-count
                    textStyle(#333, .25)
                    margin-left rem(1)
    .sperator-1
        height 2px
        background-color #f5f5f5
        width 90%
        margin 0 auto
    .sperator-2
        height $headerHeight
    .next
        height $headerHeight
        line-height $headerHeight
        background-color $primary
        text-align center
        textStyle(#fff, .3)
        position fixed
        bottom 0
        left 0
        right 0
</style>
