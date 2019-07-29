<template>
  <div class='help-goods-info-container' v-if="info">
    <div class="user-info-wrapper">
      <img v-lazy="$utils.image.getImagePath(info.data.avatar)" class="img-face">
      <span class="nick-name">{{info.data.username}}:</span>
      <div class="tip">我正在参加优待客低价抢票活动，快来帮我助力吧！</div>
    </div>
    <div class="goods-info-wrapper">
      <div class="goods-image-wrapper">
        <img v-lazy="$utils.image.getImagePath(info.data.scenicimages)">
      </div>
      <div class="goods-info">
        <p class="goods-name">{{info.data.goods_title}}</p>
        <div class="release-time">剩余时间:
            <count-down :time="(info.data.end_time - info.time) * 1000">
              <template slot-scope="props">
                  <span class="time-wrapper">
                      <span class="time-bg">{{ props.days }}</span><i>天</i><span class="time-bg">{{ props.hours }}</span><i>时</i><span class="time-bg">{{ props.minutes }}</span><i>分</i><span class="time-bg">{{ props.seconds }}</span><i>秒</i>
                  </span>
              </template>
            </count-down>
        </div>
        <p class="goods-sales">已售{{info.data.sales_number}}</p>
        <div class="goods-price-wrapper">
          <span class="goods-old-price">￥{{info.data.retail_price}}</span>
          <span class="goods-now-price"><i>￥{{info.data.min_price}}</i>起</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountDown from 'common/components/countdown/countdown'
export default {
  name: 'goodsInfo',
  props: {
    info: Object
  },
  components: {
    CountDown
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
.help-goods-info-container
    background #ffffff
    border-radius rem(.1)
    padding rem(.1)
    .user-info-wrapper
        padding rem(.2)
        .img-face
            border-radius 50%
            width rem(.5)
            height rem(.5)
            object-fit cover
            vertical-align middle
        .nick-name
            color #333
            font-size rem(.3)
            margin-left rem(.1)
            vertical-align middle
        .tip
            margin-top rem(.1)
            testStyle(#333, .3)
            text-indent rem(.6)
            line-height rem(.4)
    .goods-info-wrapper
        display flex
        border 1px dashed #ccc
        padding rem(.2)
        margin rem(.2)
        overflow hidden
        .goods-image-wrapper
            width rem(2)
            height rem(1.8)
            background red
            & > img
                width 100%
                height 100%
                object-fit cover
        .goods-info
            display flex
            flex 1
            flex-direction column
            justify-content space-between
            overflow hidden
            padding-left rem(.2)
            .goods-name
                ellipsis()
                overflow hidden
                textStyle(#333, .3)
            .release-time
                textStyle(#88, .25)
            .goods-sales
                textStyle(#88, .25)
            .goods-price-wrapper
                textStyle(#88, .28)
                .goods-old-price
                    text-decoration line-through
                .goods-now-price
                    & > i
                        textStyle(rgb(234, 122, 50), .4)
                        margin 0 rem(.1)
</style>
