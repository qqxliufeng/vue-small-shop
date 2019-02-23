<template>
    <div class="s-d-comment-container">
        <div class="s-d-comment-title-wrapper">
            <span>综合评价：<i>4.7</i></span>
            <span>123次评价</span>
        </div>
        <div class="s-d-comment-tags-wrapper">
            <span v-for="(item, index) of tagsList" :key="index" :class="{'s-d-comment-tags-selected': item.select}" @click="tagsClick(item)">{{item.name}}</span>
        </div>
        <ul>
            <li v-for="(item, index) of mCommentList" :key="index">
                <scenic-detail-comment-item :item="item"></scenic-detail-comment-item>
            </li>
        </ul>
    </div>
</template>

<script>
import ScenicDetailCommentItem from './ScenicDetailCommentItem'
export default {
  name: 'scenicDetailComment',
  props: {
    commentList: {
      type: Array,
      default () {
        return []
      }
    },
    tagCanSelected: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ScenicDetailCommentItem
  },
  data () {
    return {
      select: true,
      mCommentList: this.commentList,
      tagsList: [
        {
          name: '较好',
          select: true
        },
        {
          name: '较好1',
          select: false
        },
        {
          name: '较好22',
          select: false
        },
        {
          name: '较好3333',
          select: false
        },
        {
          name: '较好4444',
          select: false
        },
        {
          name: '较好5555555',
          select: false
        },
        {
          name: '较好66666666666',
          select: false
        }
      ]
    }
  },
  methods: {
    tagsClick (item) {
      if (this.tagCanSelected) {
        this.tagsList.forEach(element => {
          element.select = element === item
        })
      }
      this.$emit('tagClick', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-comment-container
    border-top #f5f5f5 solid rem(.1)
    .s-d-comment-title-wrapper
        overflow hidden
        padding rem(.2)
        borderBottom()
        & span:nth-child(1)
            float left
            normalTextStyle(#333, .35)
            & i
                color $orangeColor
        & span:nth-child(2)
            float right
            normalTextStyle(#888, .3)
    .s-d-comment-tags-wrapper
        padding rem(.2)
        overflow hidden
        & span
            float left
            border #f5f5f5 solid 1px
            border-radius rem(.2)
            color #333
            margin-left rem(.2)
            margin-top rem(.2)
            padding rem(.1) rem(.2)
        .s-d-comment-tags-selected
            background-color $orangeColor
            color #fff
</style>
