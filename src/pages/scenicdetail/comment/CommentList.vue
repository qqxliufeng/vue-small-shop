<template>
    <div id="commentList" class='c-l-comment-list-container'>
        <navi title="评论列表" :isFixed="true"></navi>
        <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp" @init="mescrollInit">
          <comment :commentList="commentList" :tagCanSelected="true" @tagClick="handleTagClick"></comment>
        </mescroll-vue>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import Comment from '../components/ScenicDetailComment'
export default {
  name: 'commentList',
  components: {
    navi,
    MescrollVue,
    Comment
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('commentList', this.upCallback),
      mescroll: null,
      commentList: [
        {
          content: '这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方',
          isShowMore () {
            return this.content.length > 100
          }
        }
      ]
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      setTimeout(() => {
        this.commentList.push({
          content: '这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方',
          isShowMore () {
            return this.content.length > 100
          }
        })
        this.commentList.push({
          content: '这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方',
          isShowMore () {
            return this.content.length > 100
          }
        })
        this.commentList.push({
          content: '这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方',
          isShowMore () {
            return this.content.length > 100
          }
        })
        this.commentList.push({
          content: '这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方这是一个好地方，真的是一个好地方',
          isShowMore () {
            return this.content.length > 100
          }
        })
        if (page.num > 4) {
          mescroll.endSuccess(0)
        } else {
          mescroll.endSuccess(10)
        }
      }, 1000)
    },
    handleTagClick (tag) {
      this.commentList.splice(0, this.commentList.length)
      this.mescroll.resetUpScroll(true)
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.mescroll
    mescroller()
    top $headerHeight
    height 100%
    padding-bottom $headerHeight
    box-sizing border-box
</style>
