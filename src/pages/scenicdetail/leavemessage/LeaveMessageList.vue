<template>
  <div id="leaveMessageList" class='l-m-list-container'>
    <navi title="留言列表" :isFixed="true"></navi>
    <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
      <ul>
        <li v-for="(item, index) of leaveMessageList" :key="index">
          <leave-message-item :item="item"></leave-message-item>
        </li>
      </ul>
    </mescroll-vue>
    <router-link :to="{name: 'askMessage'}">
      <p class="l-m-list-ask">我要提问</p>
    </router-link>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import LeaveMessageItem from './components/LeaveMessageItem'
export default {
  name: 'leaveMessageList',
  components: {
    navi,
    MescrollVue,
    LeaveMessageItem
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('leaveMessageList', this.upCallback),
      leaveMessageList: []
    }
  },
  methods: {
    upCallback (page, mescroll) {
      setTimeout(() => {
        this.leaveMessageList.push({
          name: '请问这是一个好玩的地方吗？请问这是一个好玩的地方吗？请问这是一个好玩的地方吗？请问这是一个好玩的地方吗？请问这是一个好玩的地方吗？'
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
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.mescroll
    mescroller()
    top $headerHeight
    height 100%
    padding-bottom $headerHeight * 2
    box-sizing border-box
.l-m-list-ask
    line-height $headerHeight
    textStyle(#ffffff, .3)
    background $primary
    position fixed
    bottom 0
    left 0
    right 0
    text-align center
</style>
