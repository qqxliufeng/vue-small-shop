<template>
    <div id="my_reply_item">
        <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
            <ul>
                <li v-for="(item,index) of replyList" :key="index">
                    <el-card shadow="always" class="l-q-card" :body-style="{ padding:'.2rem' }">
                        <div class="l-q-title-container">
                            <span>{{item.title}}</span>
                            <span class="iconfont">景区详情&#xe64c;</span>
                        </div>
                        <div class="l-q-content-container">
                            <span>问</span>
                            <span>请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？</span>
                        </div>
                        <div class="l-q-content-r-container">
                            <span>答</span>
                            <span>请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？</span>
                        </div>
                        <div class="l-q-footer-container">
                            <span class="iconfont">&#xe790; 1天前</span>
                            <span class="iconfont">&#xe605; 2333个赞</span>
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
  name: 'reply',
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('my_reply_item', this.upCallback),
      replyList: []
    }
  },
  methods: {
    upCallback (page, mescroll) {
      setTimeout(() => {
        for (let index = 0; index < 4; index++) {
          this.replyList.push({ title: '滑雪场', isReply: false })
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
            display flex
            & span:nth-child(1)
                color #ffffff
                font-size .2rem
                background-color $primary
                border-radius .08rem
                padding .05rem
                width .3rem
                height .25rem
                margin-top .05rem
                margin-right .1rem
                line-height .28rem
                flex 1
            & span:nth-child(2)
                color #555555
                font-size .3rem
                line-height .45rem
        .l-q-no-reply
            margin-top .2rem
            color #aaaaaa
            margin-left .4rem
            line-height .45rem
        .l-q-content-r-container
            margin-top .3rem
            display flex
            & span:nth-child(1)
                color #ffffff
                font-size .2rem
                background-color #EA741F
                border-radius .08rem
                padding .05rem
                width .3rem
                height .25rem
                margin-top .05rem
                margin-right .1rem
                line-height .28rem
                flex 1
            & span:nth-child(2)
                color #aaaaaa
                font-size .25rem
                line-height .45rem
        .l-q-footer-container
            margin-top .3rem
            padding-left .4rem
            & span:nth-child(1)
                color #D0D0D0
                font-size .25rem
            & span:nth-child(2)
                margin-left .15rem
                color #D0D0D0
                font-size .25rem
            & span:nth-child(3)
                color $primary
                float right
                font-size .25rem
</style>
