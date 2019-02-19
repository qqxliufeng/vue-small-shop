<template>
    <div class="h-l-like-container">
        <ul>
            <li v-for="(item, index) of likeList" :key="index" class="h-l-like-wrapper">
                <div class="h-l-like-img-wrapper">
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2373144604,3573823380&fm=27&gp=0.jpg">
                </div>
                <div class="h-l-like-info-wrapper">
                    <p>{{item.name}}</p>
                    <p>{{item.name}}{{item.name}}{{item.name}}{{item.name}}{{item.name}}{{item.name}}{{item.name}}{{item.name}}{{item.name}}{{item.name}}</p>
                    <p><span>￥199</span><i>起</i><span>已售1234</span></p>
                </div>
            </li>
        </ul>
        <p class="h-l-sell-more" @click="seeMore" v-if="!isSeeMore">查看更多</p>
    </div>
</template>

<script>
export default {
  name: 'homeLike',
  data () {
    return {
      isSeeMore: false,
      likeList: [
        {
          name: '卧虎山滑雪场'
        },
        {
          name: '卧虎山滑雪场'
        },
        {
          name: '卧虎山滑雪场'
        }
      ]
    }
  },
  methods: {
    seeMore () {
      this.isSeeMore = true
      for (let index = 0; index < 3; index++) {
        this.likeList.push({
          name: '卧虎山滑雪场'
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-l-like-container
    // padding-bottom rem($headerHeight)
    .h-l-like-wrapper
        display flex
        padding rem(.2) rem(.3)
        borderBottom()
        .h-l-like-img-wrapper
            flex 1.5
            overflow hidden
            height rem(1.7)
            & img
                width 100%
                height 100%
                object-fit cover
        .h-l-like-info-wrapper
            flex 4
            padding-left .2rem
            overflow hidden
            display flex
            flex-direction column
            justify-content space-between
            & p:nth-child(1)
                ellipsis()
                normalTextStyle(#333, .32)
            & p:nth-child(2)
                muitlLineEllipsis(2)
                normalTextStyle(#888, .25)
                line-height rem(.28)
                margin-top rem(.1)
            & p:nth-child(3)
                overflow hidden
                margin-top rem(.1)
                & span:nth-child(1)
                    display inline-block
                    normalTextStyle($primary, .35)
                & i
                    display inline-block
                    normalTextStyle(#cccccc, .2)
                    line-height .2rem
                    margin-left rem(.1)
                & span:nth-child(3)
                    display inline-block
                    normalTextStyle(#888888, .22)
                    float right
                    margin-top rem(.11rem)
.h-l-sell-more
    margin 0 auto
    normalTextStyle(#333333, .3)
    text-align center
    padding .2rem
    border-bottom #f5f5f5 solid rem(.2)
</style>
