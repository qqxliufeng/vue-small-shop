<template>
  <div class='home-activity-container'>
    <div class="h-h-title">-&nbsp;热门活动&nbsp;-
      <span class="see-more" @click="seeMore">查看更多></span>
    </div>
    <div class="activity-wrapper">
      <swiper :options="swiperOption" class="h-h-hot-card">
            <swiper-slide v-for="item of assist" :key="item.assist_id">
                <el-card shadow="always" :body-style="{padding: '0'}">
                  <div class="content-wrapper" @click="itemClick(item)">
                    <div class="img-wrapper">
                      <img v-lazy="$utils.image.getImagePath(item.scenicimages)">
                      <div class="bottom-title-wrapper">
                        <div class="bottom-title-bg"></div>
                        <div class="bottom-title">
                          <span class="price"><i>￥</i>{{item.min_price}}</span>
                          <span class="price-tip">助力价</span>
                        </div>
                      </div>
                      <div class="activity-tip">
                        <div class="tip-bg"></div>
                        <div class="tip-wrapper">
                          <span class="tip">距结束
                            <count-down :time="Math.max(0, (item.end_time - time) * 1000)">
                                <template slot-scope="props">
                                    <span class="time-wrapper"><span>{{ props.days }}</span><i>天</i><span>{{ props.hours }}</span><i>:</i><span>{{ props.minutes }}</span><i>:</i><span>{{ props.seconds }}</span>
                                    </span>
                                </template>
                            </count-down>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="info-wrapper">
                      <p class="title">{{item.scenic_name}}</p>
                      <p class="ticke-name">{{item.goods_title}}</p>
                    </div>
                  </div>
                </el-card>
            </swiper-slide>
        </swiper>
    </div>
  </div>
</template>

<script>
import CountDown from 'common/components/countdown/countdown'
export default {
  name: 'homeActivity',
  props: {
    assist: Array,
    time: {
      type: Number,
      default: 0
    }
  },
  components: {
    CountDown
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 2.5,
        spaceBetween: 10
      },
      releaseDays: 0
    }
  },
  methods: {
    itemClick (item) {
      window.location.href = 'http://www.store.liuyiqinzi.com/atdetail?s=' + item.scenic_id + '&i=' + this.$root.state.getSallerInfo().identity + '&t=' + this.$root.state.getSallerInfo().storeId + '&g=' + item.goods_id + '&p=' + item.assist_id
    },
    seeMore () {
      this.$router.push({ name: 'activityList' })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.home-activity-container
    border-bottom #f5f5f5 solid rem(.2)
    .h-h-title
        normalTextStyle(#333, .32)
        padding rem(.2) rem(.1)
        border-bottom #f5f5f5 solid rem(.02)
        margin 0 rem(.2)
        text-align center
        .see-more
            float right
            textStyle(#888, .28)
    .h-h-hot-card
        padding rem(.3)
        .content-wrapper
            .img-wrapper
                position relative
                height rem(2.5)
                overflow hidden
                & > img
                    width 100%
                    height 100%
                    object-fit cover
                    position absolute
                    top 0
                    left 0
                    right 0
                    bottom 0
                .bottom-title-wrapper
                    position absolute
                    left 0
                    bottom 0
                    right 0
                    width 100%
                    z-index 1
                    .bottom-title-bg
                        background-color $orangeColor
                        opacity .8
                        position absolute
                        top 0
                        left 0
                        right 0
                        bottom 0
                    .bottom-title
                        ellipsis()
                        color #fff
                        padding rem(.1) rem(.05)
                        font-size rem(.25)
                        box-sizing border-box
                        position relative
                        z-index 10
                        .price
                            font-size rem(.3)
                            font-style italic
                            & > i
                              font-size rem(.2)
                        .price-tip
                            background #fff
                            color $orangeColor
                            border-radius rem(.05)
                            padding 0 rem(.1)
                            margin-left rem(.1)
                .activity-tip
                    position absolute
                    top 0
                    left 0
                    line-height rem(.3)
                    font-size rem(.25)
                    color #ffffff
                    padding rem(.05) rem(.1)
                    z-index 11
                    .tip-bg
                        background red
                        opacity .5
                        border-bottom-right-radius rem(.3)
                        position absolute
                        top 0
                        left 0
                        right 0
                        bottom 0
                    .tip-wrapper
                        position relative
                        z-index 1
                        .tip
                            font-size rem(.25)
                        .tip-price
                            font-size rem(.25)
                            font-weight bold
                            font-style italic
              .info-wrapper
                  padding rem(.2) 0
                  overflow hidden
                  text-align left
                  .title
                      color $orangeColor
                      font-size rem(.3)
                      padding rem(.1)
                  .ticke-name
                      padding rem(.1)
                      textStyle(#666, .25)
                  .time-count-down-wrapper
                      text-align center
                      margin-top rem(.1)
                      .time-wrapper
                          color #fff
                          text-align center
                          & > i
                              color #333
                              margin 0 rem(.05)
                              font-size rem(.2)
                          .time-bg
                              background-color #424242
                              display inline-block
                              min-width rem(.4)
                              text-align center
</style>
