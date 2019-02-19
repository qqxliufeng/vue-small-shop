<template>
   <div>
     <navi title="我的消息" class="navi" :isFixed="true"></navi>
     <el-tabs :stretch="true" value="first" class="m-tabs">
        <el-tab-pane label="系统通知" name="first" class="m-tabs-item">
          <ul>
            <li v-for="(item,index) of systemNotifyList" :key="index" class="m-tabs-item-li" @click="itemClick(index)">
              <div class="m-s-title-container">
                <span class="m-s-title"><i v-show="item.isShowNotify"></i>{{item.title}}</span>
                <span class="m-s-time">{{item.time}}</span>
              </div>
              <p class="m-s-content">{{item.content}}</p>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="店铺公告" name="second" class="m-tabs-item">
          <ul>
            <li v-for="(item,index) of systemNotifyList" :key="index" class="m-tabs-item-li" @click="itemClick(index)">
              <div class="m-s-title-container">
                <span class="m-s-title"><i v-show="item.isShowNotify"></i>{{item.title}}</span>
                <span class="m-s-time">{{item.time}}</span>
              </div>
              <span class="m-s-content">{{item.content}}</span>
            </li>
          </ul>
        </el-tab-pane>
    </el-tabs>
   </div>
</template>
<script>
import navi from 'common/components/navigation'
export default {
  name: 'message',
  components: {
    navi
  },
  data () {
    return {
      systemNotifyList: [
        {
          isShowNotify: true,
          title: '订单提醒',
          time: '2019-01-01',
          content: '一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区'
        },
        {
          isShowNotify: false,
          title: '订单提醒',
          time: '2019-01-01',
          content: '一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区'
        },
        {
          isShowNotify: false,
          title: '订单提醒',
          time: '2019-01-01',
          content: '一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区'
        },
        {
          isShowNotify: false,
          title: '订单提醒',
          time: '2019-01-01',
          content: '一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区'
        },
        {
          isShowNotify: false,
          title: '订单提醒',
          time: '2019-01-01',
          content: '一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区一个独一无二的网络社区'
        }
      ]
    }
  },
  methods: {
    itemClick (index) {
      this.systemNotifyList[index].isShowNotify = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.m-tabs
  tabsFixed()
  .m-tabs-item
    tabFixed()
    .m-tabs-item-li
      borderBottom()
      padding .2rem 0
      .m-s-title-container
        overflow hidden
        .m-s-title
          float left
          color #333333
          font-size .32rem
          & i
            circleNotify($primary)
            margin-bottom .06rem
            margin-right .2rem
        .m-s-time
          float right
          color #888888
      .m-s-content
        display inline-block
        margin-top .2rem
        color #6F6F6F
        font-size .25rem
        line-height .32rem
        height 1.28rem
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 4
</style>
