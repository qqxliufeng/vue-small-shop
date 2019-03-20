<template>
    <div class="h-l-like-container">
        <ul v-if="tempLikeList.length > 0">
            <li v-for="item of tempLikeList" :key="item.s_id" class="h-l-like-wrapper" @click="itemClick(item)">
                <div class="h-l-like-img-wrapper">
                    <img v-lazy="getImagePath(item.scenicimages)">
                </div>
                <div class="h-l-like-info-wrapper">
                    <p>{{item.s_title}}</p>
                    <p>{{item.brief}}</p>
                    <p><span>￥{{item.minPrice}}</span><i>起</i><span>已售{{item.totalSales}}</span></p>
                </div>
            </li>
            <p class="h-l-sell-more" @click="seeMore" v-if="showMore ">查看更多</p>
        </ul>
        <p v-else class="empty">暂无信息哦~</p>
    </div>
</template>

<script>
export default {
  name: 'homeLike',
  props: {
    likeList: Array
  },
  data () {
    return {
      tempLikeList: []
    }
  },
  methods: {
    seeMore () {
      this.tempLikeList = this.likeList
    },
    itemClick (item) {
      this.$router.push({name: 'scenicDetail'})
    },
    getImagePath (path) {
      return this.$utils.image.getImagePath(this, path)
    }
  },
  computed: {
    showMore () {
      return this.likeList.length > 3 && this.tempLikeList.length !== this.likeList.length
    }
  },
  watch: {
    likeList () {
      this.tempLikeList = this.likeList ? this.likeList.slice(0, 3) : []
      return this.tempLikeList
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
                line-height rem(.32)
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
    .empty
        textStyle(#888, .3)
        text-align center
        padding rem(1)
</style>
