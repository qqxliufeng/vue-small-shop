<template>
    <div id="my_question_item">
        <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
            <ul>
                <li v-for="(item,index) of questionList" :key="index">
                    <el-card shadow="always" class="l-q-card" :body-style="{ padding:'.2rem' }">
                        <div class="l-q-title-container">
                            <span>{{item.title}}</span>
                            <span class="iconfont">景区详情&#xe64c;</span>
                        </div>
                        <div class="l-q-content-container">
                            <span>问</span>
                            <span>请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？</span>
                        </div>
                        <div class="l-q-no-reply" v-if="item.isReply">
                            很遗憾暂时还没有人回复您的问题呢，请耐心等待哦~
                        </div>
                        <div v-else class="l-q-content-r-container">
                            <span>答</span>
                            <span>请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？</span>
                        </div>
                        <div class="l-q-footer-container">
                            <span class="iconfont">&#xe790; 1天前</span>
                            <span>查看其它答案</span>
                        </div>
                    </el-card>
                </li>
            </ul>
        </mescroll-vue>
    </div>
</template>
<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
export default {
  name: 'question',
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('my_question_item', this.upCallback),
      questionList: []
    }
  },
  methods: {
    upCallback (page, mescroll) {
      setTimeout(() => {
        for (let index = 0; index < 4; index++) {
          this.questionList.push({ title: '滑雪场', isReply: false })
        }
        if (page.num > 4) {
          mescroll.endSuccess(0)
        } else {
          mescroll.endSuccess(100)
        }
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.mescroll
    mescroller()
    .l-q-card
        margin .2rem
        .l-q-title-container
            borderBottom()
            padding-bottom .2rem
            & span:nth-child(1)
                color #333333
                font-size .32rem
            & span:nth-child(2)
                color #aaaaaa
                font-size .28rem
                float right
        .l-q-content-container
            margin-top .3rem
            askAnswerWrapper($primary)
            align-items flex-start
        .l-q-no-reply
            margin-top .2rem
            color #aaaaaa
            margin-left .4rem
            line-height .45rem
        .l-q-content-r-container
            margin-top .3rem
            askAnswerWrapper(#EA741F)
            align-items flex-start
        .l-q-footer-container
            margin-top .3rem
            padding-left .4rem
            & span:nth-child(1)
                color #D0D0D0
                font-size .25rem
            & span:nth-child(2)
                color $primary
                float right
                font-size .25rem
</style>
