<template>
    <div class="h-s-list-container">
      <ul v-if="resultList && resultList.length > 0">
        <li v-for="item of resultList" :key="item.s_id" class="h-l-like-wrapper" @click="itemClick(item)">
            <div class="h-l-like-img-wrapper">
                <img v-lazy="$utils.image.getImagePath(item.scenicimages)" :key="item.scenicimages">
            </div>
            <div class="h-l-like-info-wrapper">
                <p>{{item.s_title}}</p>
                <p>{{item.brief}}</p>
                <p><span>￥{{item.minPrice}}</span><i>起</i><span>已售{{item.totalSales}}</span></p>
            </div>
        </li>
      </ul>
      <div v-else class="empty">
        暂无搜索内容
      </div>
    </div>
</template>

<script>
import ScenicListItem from '@/pages/sceniclist/components/ScenicListItem'
export default {
  name: 'homeSearchList',
  props: {
    resultList: Array
  },
  components: {
    ScenicListItem
  },
  methods: {
    itemClick (item) {
      this.$router.replace({name: 'scenicDetail', query: {scenicId: item.s_id}})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-s-list-container
    position fixed
    top $headerHeight
    left 0
    right 0
    height 100%
    padding-bottom rem($headerHeight)
    box-sizing border-box
    overflow-y scroll
    .empty
        display flex
        align-items center
        justify-content center
        height 100%
        textStyle(#888, .32)
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
</style>
