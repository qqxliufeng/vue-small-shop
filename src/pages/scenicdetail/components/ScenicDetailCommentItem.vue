<template>
    <div class="s-d-comment-item-container">
        <div class="s-d-comment-item-title-wrapper">
            <img v-lazy="$utils.image.getImagePath(item.avatar)" :key="item.avatar">
            <span class="s-d-comment-item-title-nickname">{{item.name || $utils.common.hiddenMobile(item.username)}}</span>
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
        <div v-if="item.images && item.images.length > 0" class="s-d-comment-item-imags-wrapper" v-lazy-container="{ selector: 'img' }">
            <img v-for="(image, index) of item.images" :key="index" :data-src="$utils.image.getImagePath(image)" @click="imageClick">
        </div>
        <div class="reply-container" v-if="item.answer && item.answer.content">
            <div>
              <span class="reply-title">商家回复:</span>
              <span class="reply-content">{{item.answer.content}}</span>
              <div class="reply-time">{{item.answer.add_time}}</div>
            </div>
        </div>
        <div class="report-wrapper">
          <span class="time">{{item.create_time}}</span>
          <el-dropdown :command="command" v-if="$root.report">
            <span class="report">举报<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item v-for="reportItem of report" :key="reportItem.id" @click.native="doReport(1, item.cid, reportItem.name)">{{reportItem.name}}</el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
        </div>
    </div>
</template>

<script>
import report from 'common/mixins/report-mixin'
export default {
  name: 'scenicDetailCommentItem',
  mixins: [report],
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
    },
    command (index) {
      console.log(index)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-comment-item-container
    padding rem(.2)
    border-bottom 5px solid #f5f5f5
    .s-d-comment-item-title-wrapper
        display flex
        align-items center
        & img
            width rem(.6)
            height rem(.6)
            object-fit cover
            background #f5f5f5
            border-radius 50%
        & span:nth-child(2)
            flex 1
        .s-d-comment-item-title-nickname
            normalTextStyle(#333, .3)
            margin-left rem(.2)
        & >>> .el-rate__icon
            margin-right 0
            font-size 15px
    .s-d-comment-item-content-wrapper
        font-size rem(.28)
        color #333
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
            border-radius rem(.1)
    .report-wrapper
      overflow hidden
      display flex
      justify-content space-between
      align-items center
      padding rem(.1) 0
      margin-top rem(.3)
      & >>> .el-dropdown
          display block
      .report
          border-radius rem(.3)
          border 1px solid #eee
          padding rem(.05) rem(.2)
          textStyle(#888, .25)
      .time
          textStyle(#888, .24)
    .reply-container
        background-color #f5f5f5
        padding rem(.2)
        border-radius rem(.05)
        margin-top rem(.3)
        font-size rem(.25)
        overflow hidden
        .reply-title
            color $primary
        .reply-content
            color #666
            margin-left rem(.1)
            line-height rem(.35)
        .reply-time
            textStyle(#888, .25)
            text-align right
            margin rem(.1) 0 0 0
</style>
