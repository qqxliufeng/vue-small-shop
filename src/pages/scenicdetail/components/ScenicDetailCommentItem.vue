<template>
    <div class="s-d-comment-item-container">
        <div class="s-d-comment-item-title-wrapper">
            <img v-lazy="$utils.image.getImagePath(item.avatar)" :key="item.avatar">
            <span class="s-d-comment-item-title-nickname">{{item.username}}</span>
            <span></span>
            <span class="s-d-comment-item-title-rating">
                <el-rate disabled :value="item.mark"></el-rate>
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
            <img v-for="(image, index) of item.images" :key="index" :data-src="$utils.image.getImagePath(image)" @click="imageClick">
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
      isSeeMore: this.isShowMore(),
      isCollapse: !this.isSeeMore
    }
  },
  methods: {
    isShowMore () {
      return this.item.content.length > 100
    },
    seeMoreContent () {
      if (this.isCollapse) {
        this.contentHeight.maxHeight = '10rem'
      } else {
        this.contentHeight.maxHeight = '1rem'
      }
      this.isCollapse = !this.isCollapse
    },
    imageClick () {
      this.$router.push({name: 'gallary', params: {imgs: this.item.images}})
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
            background #f5f5f5
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
