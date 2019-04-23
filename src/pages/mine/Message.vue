<template>
   <div>
     <navi title="我的消息" class="navi" :isFixed="true"></navi>
     <div class="content">
       <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
          <ul id="message_content">
            <li v-for="item of list" :key="item.id" class="m-tabs-item-li" @click="itemClick(item)">
              <div class="m-s-title-container">
                <span class="m-s-title"><i v-show="!item.is_read"></i>{{item.title}}</span>
                <span class="m-s-time">{{item.create_time}}</span>
              </div>
              <!-- <p class="m-s-content">{{item.content}}</p> -->
            </li>
          </ul>
       </mescroll-vue>
     </div>
     <!-- <el-tabs :stretch="true" value="first" class="m-tabs">
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
        </el-tab-pane> -->
        <!-- <el-tab-pane label="店铺公告" name="second" class="m-tabs-item">
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
    </el-tabs> -->
   </div>
</template>
<script>
import navi from 'common/components/navigation'
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'message',
  mixins: [listMixin],
  components: {
    navi,
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('message_content', this.upCallback),
      list: []
    }
  },
  methods: {
    upCallback (page, mescroll) {
      this.$http(this.$urlPath.messageList, {
        page: page.num
      }, '', (data) => {
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.$toast(error)
        this.loadError(mescroll)
      })
    },
    itemClick (item) {
      item.is_read = true
      this.$router.push({name: 'messageInfo', query: {mid: item.id}})
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'personal') {
        vm.$refs.mescroll.mescroll.resetUpScroll(true)
      } else {
        vm.$refs.mescroll.beforeRouteEnter()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.mescroll.beforeRouteLeave()
    next()
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
  .mescroll
    mescroller()
    top $headerHeight
    height 94%
  .content
    .m-tabs-item-li
      borderBottom()
      padding .2rem
      .m-s-title-container
        overflow hidden
        display flex
        .m-s-title
          flex 1
          color #333333
          font-size .32rem
          ellipsis()
          & i
            circleNotify($primary)
            margin-bottom .06rem
            margin-right .2rem
        .m-s-time
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
