<template>
    <div id="ticket_collection">
        <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
            <ul>
                <li v-for="(item,index) of ticketList" :key="index">
                    <el-card shadow="always"  :body-style="{ padding: '.2rem' }" class="c-item-card">
                        <div class="s-t-content-container">
                            <div>
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550046367219&di=9e4765dc6953bf2e0ab8c3dfbd47855a&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft01d8dbb2157c53cc27.jpg">
                            </div>
                            <div class="s-t-info-container">
                                <span class="s-t-info-title">{{item.name}}</span>
                                <span class="s-t-info-remark">请在游玩1天前预订请在游玩1天前预订请在游玩1天前预订请在游玩1天前预订请在游玩1天前预订</span>
                                <div class="s-t-info-info">
                                    <span class="s-t-info-tag-1">立减1元</span>
                                    <span class="s-t-info-tag-2">即买即用</span>
                                    <span><i>￥</i><i>89</i><i>起</i></span>
                                </div>
                            </div>
                        </div>
                        <div class="s-c-line"></div>
                        <div class="s-c-bottom-action-container">
                            <span>剩余时间:2天10时10分</span>
                            <el-button type="primary" size="small" class="s-c-bottom-action">查看详情</el-button>
                            <el-button plain size="small" class="s-c-bottom-action">取消收藏</el-button>
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
  name: 'ticketCollection',
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('ticket_collection', this.upCallBack),
      ticketList: []
    }
  },
  methods: {
    upCallBack (page, mescroll) {
      setTimeout(() => {
        this.ticketList.push({
          name: '卧虎山滑雪场成人票'
        })
        if (page.num > 4) {
          mescroll.endSuccess(0)
        } else {
          mescroll.endSuccess(10)
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
    .c-item-card
        margin .2rem
        .s-t-content-container
            display flex
            overflow hidden
            & div:nth-child(1)
                flex 1.5
                background-color red
                height 1.7rem
                & img
                    width 100%
                    height 100%
                    object-fit cover
            .s-t-info-container
                flex 3
                padding-left .1rem
                box-sizing border-box
                display flex
                flex-direction column
                justify-content space-between
                .s-t-info-title
                    color #333333
                    font-size .3rem
                    line-height .35rem
                .s-t-info-remark
                    line-height .3rem
                    color #888888
                    font-size .25rem
                    margin .2rem 0
                .s-t-info-info
                    .s-t-info-tag-1
                        border .01rem solid #EFA184
                        color #EFA184
                        padding .03rem .08rem
                        border-radius .05rem
                        font-size .15rem
                    .s-t-info-tag-2
                        border .01rem solid $primary
                        color $primary
                        padding .03rem .08rem
                        border-radius .05rem
                        font-size .15rem
                        margin-left .1rem
                        margin-bottom .1rem
                    & span:nth-child(3)
                        float right
                        & i:nth-child(1)
                            color $primary
                            font-size .2rem
                        & i:nth-child(2)
                            color $primary
                            font-size .35rem
                        & i:nth-child(3)
                            color #cccccc
                            font-size .2rem
        .s-c-line
            border .01rem solid #f5f5f5
            margin .2rem 0
        .s-c-bottom-action-container
            line-height .7rem
            overflow hidden
            .s-c-bottom-action
                float right
                margin-left .1rem
            & span
                color #EFA184
                font-size .25rem
                align-self center
                float left
</style>
