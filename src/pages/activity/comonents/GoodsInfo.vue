<template>
  <div class='help-goods-info-container'>
    <div class="user-info-wrapper">
      <img src="" class="img-face">
      <span class="nick-name">王大宝:</span>
      <div class="tip">我正在参加优待客低价抢票活动，快来帮我助力吧！</div>
    </div>
    <div class="goods-info-wrapper">
      <div class="goods-image-wrapper">
        <img src="">
      </div>
      <div class="goods-info">
        <p class="goods-name">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
        <p class="release-time">剩余时间:</p>
        <p class="goods-sales">已售1000</p>
        <div class="goods-price-wrapper">
          <span class="goods-old-price">￥200</span>
          <span class="goods-now-price"><i>￥89</i>起</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'goodsInfo',
  components: {},
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
            background red
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
            min-width rem(2)
            height rem(1.8)
            background red
            & > img
                width 100%
                height 100%
                object-fit cover
        .goods-info
            display flex
            flex-direction column
            justify-content space-between
            overflow hidden
            padding-left rem(.2)
            .goods-name
                ellipsis()
                overflow hidden
                textStyle(#333, .3)
            .release-time
                text-align right
                textStyle(#88, .25)
            .goods-sales
                text-align right
                textStyle(#88, .25)
            .goods-price-wrapper
                text-align right
                textStyle(#88, .28)
                .goods-old-price
                    text-decoration line-through
                .goods-now-price
                    & > i
                        textStyle(rgb(234, 122, 50), .4)
                        margin 0 rem(.1)
</style>
