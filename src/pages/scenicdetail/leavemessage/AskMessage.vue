<template>
<div class='a-m-message-container'>
  <loading v-show="showLoading"></loading>
  <navi title="我要提问"></navi>
  <div class="a-m-message-content-wrapper">
    <el-card :body-style="{ padding: '.2rem' }" shadow="always">
      <div class="a-m-message-scenic-info-wrapper">
        <div class="a-m-message-scenic-info-img-wrapper">
          <img src="http://pic36.photophoto.cn/20150812/0033033907240876_b.jpg">
        </div>
        <div class="a-m-message-scenic-info-content-wrapper">
          <p class="title">卧虎山滑雪场卧虎山滑雪场卧虎山滑雪场卧虎山滑雪场卧虎山滑雪场卧虎山滑雪场</p>
          <p class="info">4.5分 | 2000人消费</p>
        </div>
      </div>
    </el-card>
    <el-card :body-style="{ padding: '.2rem' }" shadow="always" class="ask-content-card">
      <div class="a-m-message-ask-info-wrapper">
        <div class="ask-title-wrapper">
            <span>问</span>
            <span>我的提问</span>
        </div>
        <textarea cols="30" rows="10" class="ask-content" placeholder="请输入您的问题哦~，最多50字"></textarea>
      </div>
    </el-card>
  </div>
  <div class="a-m-message-submit" @click="submitAsk">发 布</div>
  <!-- <el-dialog :visible.sync="showSuccessDialog" :show-close="false">
    提问成功
  </el-dialog> -->
</div>
</template>
<script>
import navi from 'common/components/navigation'
export default {
  name: 'askMessage',
  components: {
    navi
  },
  data () {
    return {
      showLoading: false
    }
  },
  methods: {
    submitAsk () {
      this.showLoading = true
      setTimeout(() => {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
        this.showLoading = false
      }, 1000)
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
@media (max-height: 400px)
    .a-m-message-submit
        display none
.a-m-message-container
    & >>> .el-dialog__header
        padding 0
    .a-m-message-submit
        position fixed
        left 0
        right 0
        bottom 0
        background-color $primary
        textStyle(#fff, .32)
        text-align center
        line-height $headerHeight
    .a-m-message-content-wrapper
        padding rem(.3)
        .a-m-message-scenic-info-wrapper
            display flex
        .a-m-message-scenic-info-img-wrapper
            height rem(1.3)
            width rem(1.5)
            background-color red
            overflow hidden
            & img
                width 100%
                height 100%
                object-fit cover
        .a-m-message-scenic-info-content-wrapper
            flex 1
            display flex
            flex-direction column
            justify-content space-around
            overflow hidden
            padding-left rem(.2)
            .title
                textStyle(#333, .3)
                ellipsis()
            .info
                textStyle(#888, .28)
        .ask-content-card
            margin-top rem(.2)
            .a-m-message-ask-info-wrapper
                .ask-title-wrapper
                    askAnswerWrapper($primary)
                    borderBottom()
                    padding-bottom rem(.2)
                .ask-content
                    border 1px solid #f5f5f5
                    width 100%
                    margin-top rem(.2)
                    background-color #F7F5F5
                    border-radius rem(.1)
                    padding rem(.2)
</style>
