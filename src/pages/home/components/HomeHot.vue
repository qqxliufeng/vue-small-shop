<template>
    <div class="h-h-hot-container">
        <swiper :options="swiperOption" class="h-h-hot-card">
            <swiper-slide v-for="(item, index) of hotList" :key="index">
                <el-card shadow="always" :body-style="{padding: '0'}">
                    <div class="h-h-hot-wrapper">
                        <div class="h-h-hot-image-wrapper">
                            <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2373144604,3573823380&fm=27&gp=0.jpg">
                        </div>
                        <p class="h-h-hot-wrapper-title">卧虎山滑雪场卧虎山滑雪场卧虎山滑雪场</p>
                        <el-rate
                            :value="3.7"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}"
                            class="h-h-hot-rating">
                        </el-rate>
                        <div class="h-h-hot-tag-wrapper" v-if="index < 3">
                            <p>TOP</p>
                            <p>{{index+1}}</p>
                        </div>
                    </div>
                </el-card>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
export default {
  name: 'homeHot',
  data () {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      hotList: [
        {
          name: '1'
        },
        {
          name: '2'
        },
        {
          name: '3'
        },
        {
          name: '4'
        },
        {
          name: '5'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-h-hot-container
    .h-h-hot-card
        padding rem(.3)
        .h-h-hot-wrapper
            position relative
            .h-h-hot-image-wrapper
                height 1.6rem
                & img
                    width 100%
                    height 100%
                    object-fit cover
            .h-h-hot-wrapper-title
                normalTextStyle(#333, .25)
                ellipsis()
                text-align center
                padding rem(.25) rem(.1) rem(.05) rem(.1)
            .h-h-hot-rating
                text-align center
            & >>> .el-rate__icon
                font-size 12px
                margin-right 3px
            & >>> .el-rate__text
                font-size 12px
            .h-h-hot-tag-wrapper
                position absolute
                top 0
                left 0
                background-color #D66962
                color #fff
                font-size .25rem
                padding .05rem
                text-align center
                & p:nth-child(1)
                  font-size .15rem
                  margin-bottom rem(.05)
</style>
