<template>
    <div class="s-d-comment-item-container">
        <div class="s-d-comment-item-title-wrapper">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550639954262&di=22e710dcbc054ec67e789af150c6dda3&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fgif%2Fmore%2F11%2F2012%2F03%2F1162a0fe4e83420fe058c9324ecb9a7f.jpg">
            <span class="s-d-comment-item-title-nickname">王大宝</span>
            <span></span>
            <span class="s-d-comment-item-title-rating">
                <el-rate disabled :value="5"></el-rate>
            </span>
        </div>
        <div class="s-d-comment-item-content-wrapper">
            <p :style="contentHeight" class="s-d-comment-item-content" ref="commentContent">
                {{item.content}}
            </p>
            <p class="s-d-comment-item-content-see-more" v-show="isSeeMore">
                <span :class="[isCollapse ? 'el-icon-arrow-down' : 'el-icon-arrow-up']" @click="seeMoreContent"></span>
            </p>
        </div>
        <div class="s-d-comment-item-imags-wrapper" v-lazy-container="{ selector: 'img' }">
            <img v-for="(item, index) of imagesList" :key="index" :data-src="item">
        </div>
    </div>
</template>

<script>
export default {
  name: 'scenicDetailCommentItem',
  props: {
    item: Object
  },
  data () {
    return {
      contentHeight: {
        maxHeight: '1rem'
      },
      isSeeMore: this.item.isShowMore(),
      isCollapse: !this.isSeeMore,
      imagesList: ['http://img1.3lian.com/img013/v5/21/d/84.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550639954262&di=22e710dcbc054ec67e789af150c6dda3&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fgif%2Fmore%2F11%2F2012%2F03%2F1162a0fe4e83420fe058c9324ecb9a7f.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550639954262&di=22e710dcbc054ec67e789af150c6dda3&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fgif%2Fmore%2F11%2F2012%2F03%2F1162a0fe4e83420fe058c9324ecb9a7f.jpg']
    }
  },
  methods: {
    seeMoreContent () {
      if (this.isCollapse) {
        this.contentHeight.maxHeight = '10rem'
      } else {
        this.contentHeight.maxHeight = '1rem'
      }
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-comment-item-container
    padding rem(.2)
    borderBottom()
    .s-d-comment-item-title-wrapper
        display flex
        align-items center
        & img
            width rem(.8)
            height rem(.8)
            object-fit cover
            border-radius 50%
        & span:nth-child(2)
            flex 1
        .s-d-comment-item-title-nickname
            normalTextStyle(#333, .3)
            margin-left rem(.2)
    .s-d-comment-item-content-wrapper
        font-size rem(.28)
        color #aaaaaa
        margin-top rem(.2)
        line-height rem(.35)
        position relative
        .s-d-comment-item-content
            overflow hidden
        .s-d-comment-item-content-see-more
            margin-top rem(.2)
            text-align center
            font-size rem(.4)
    .s-d-comment-item-imags-wrapper
        overflow hidden
        margin-top rem(.2)
        height rem(2)
        text-align center
        & img
            float left
            width 30%
            height 100%
            object-fit cover
            margin-left 2.5%
</style>
