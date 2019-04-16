<template>
    <div id="my_reply_item">
        <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
            <ul>
                <li v-for="(item,index) of list" :key="index">
                    <el-card shadow="always" class="l-q-card" :body-style="{ padding:'.2rem' }">
                        <!-- <div class="l-q-title-container">
                            <span>{{item.title}}</span>
                            <span class="iconfont">景区详情&#xe64c;</span>
                        </div> -->
                        <div class="l-q-content-container">
                            <span>问</span>
                            <span>{{item.ask.content}}</span>
                        </div>
                        <div class="l-q-content-r-container">
                            <span>答</span>
                            <span>{{item.answer_text}}</span>
                        </div>
                        <div class="l-q-footer-container">
                            <span class="iconfont">&#xe790; {{item.ask.add_time}}</span>
                            <span class="iconfont">&#xe605; {{item.like}}个赞</span>
                            <span @click="startMessageInfo(item)">查看其它答案</span>
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
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'reply',
  mixins: [listMixin],
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('my_reply_item', this.upCallback),
      list: []
    }
  },
  methods: {
    upCallback (page, mescroll) {
      this.$http(this.$urlPath.myAnswerUrl, {
        page: page.num
      }, null, (data) => {
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.$toast(error)
        this.loadError(mescroll)
      })
    },
    startMessageInfo (item) {
      this.$router.push({name: 'leaveMessageInfo', query: {s_id: item.ask.sid, aid: item.a_id}})
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
                margin-left .15rem
                color #D0D0D0
                font-size .25rem
            & span:nth-child(3)
                color $primary
                float right
                font-size .25rem
</style>
