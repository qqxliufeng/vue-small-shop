<template>
    <div class="s-d-comment-container">
        <div class="s-d-comment-title-wrapper">
            <span>综合评价：<i>4.7</i></span>
            <span>123次评价</span>
        </div>
        <div class="s-d-comment-tags-wrapper">
            <span v-for="(item, index) of tagsList" :key="index" :class="{'s-d-comment-tags-selected': item.select}" @click="tagsClick(index)">{{item.name}}</span>
        </div>
        <ul>
            <li v-for="(item, index) of commentList" :key="index">
                <scenic-detail-comment-item :item="item"></scenic-detail-comment-item>
            </li>
        </ul>
        <div v-if="commentList.length > 2" class="s-d-l-m-comment-info-see-more">
            查看更多
        </div>
    </div>
</template>

<script>
import ScenicDetailCommentItem from './ScenicDetailCommentItem'
export default {
  name: 'scenicDetailComment',
  components: {
    ScenicDetailCommentItem
  },
  data () {
    return {
      select: true,
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
      ],
      commentList: [
        {
          content: '这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方',
          isShowMore () {
            return this.content.length > 100
          }
        },
        {
          content: '这是一个好地方，真的是一个好地方这是一地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方',
          isShowMore () {
            return this.content.length > 100
          }
        },
        {
          content: '这是一个好地方，真的是一个好地方这是一个好地方',
          isShowMore () {
            return this.content.length > 100
          }
        },
        {
          content: '这是一个好地方，真的是一个好地方这是一个好地方，真的的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方',
          isShowMore () {
            return this.content.length > 100
          }
        }
      ]
    }
  },
  methods: {
    tagsClick (index) {
      this.tagsList.forEach((element, i) => {
        element.select = index === i
      })
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
    .s-d-l-m-comment-info-see-more
        normalTextStyle(#333, .32)
        padding rem(.2)
        text-align center
        border-top #f5f5f5 solid rem(.05)
</style>
