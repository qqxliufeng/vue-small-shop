<!--
 * @Author: your name
 * @Date: 2020-04-27 17:53:31
 * @LastEditTime: 2020-04-28 10:02:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/src/pages/mine/MyWallet.vue
 -->
<template>
  <div>
    <navi title="我的钱包" class="navi" :isFixed="true"></navi>
    <div class="content">
       <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
          <ul id="wallet_content">
            <li class="flex solid-bottom padding-sm bg-white" v-for="item of list" :key="item.id">
              <div class="tip-wrapper flex justify-center align-center text-bold text-white text-lg" :class="item.type === 1 ? 'bg-gradual-orange' : 'bg-gradual-blue'">
                {{item.type === 1 ? '返' : '消'}}
              </div>
              <div class="info-wrapper flex-sub flex flex-direction justify-between margin-left-sm">
                <div class="text-df text-black">当前余额：<text class="text-red text-price text-bold text-lg">{{item.after}}</text></div>
                <div class="text-sm text-gray">{{$utils.common.dateFormat(item.createtime * 1000)}}</div>
              </div>
              <div class="money-wrapper flex flex-direction justify-center align-center flex">
                <span class="text-red text-bold text-lg">{{item.type === 1 ? '+' : '-'}}{{item.money}}</span>
                <span class="text-gray text-sm" v-if="item.type === 1">{{item.cash_reward_status === 1 ? '消费后返现' : '已返现'}}</span>
              </div>
            </li>
          </ul>
       </mescroll-vue>
     </div>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'MyWallet',
  mixins: [listMixin],
  components: {
    navi,
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('wallet_content', this.upCallback),
      list: []
    }
  },
  methods: {
    upCallback (page, mescroll) {
      this.$http(this.$urlPath.myMoneyLog, {
        page: page.num
      }, '', (data) => {
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.$toast(error)
        this.loadError(mescroll)
      })
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
    height 94%
</style>
