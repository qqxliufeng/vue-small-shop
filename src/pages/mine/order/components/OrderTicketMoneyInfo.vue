<template>
    <div class="o-i-ticket-info-container">
        <safe-protect></safe-protect>
        <p class="o-i-ticket-info-title">
            <span>{{storeInfo.ticketName}}</span>
            <span class="play-time">游玩日期：{{storeInfo.playTime}}</span>
        </p>
        <div class="o-i-ticket-info-money">
            <span>{{storeInfo.money.title}}</span>
            <span>￥{{storeInfo.money.money}}</span>
            <span @click="toggleShowDetail">明细<i class="iconfont">{{ isShowDetail ? '&#xe63d;' : '&#xe797;'}}</i></span>
        </div>
        <div class="o-i-ticket-info-money-detail" v-show="isShowDetail">
            <slot name="ticketMoneyDetail" :moneyDetail="storeInfo.money.detail"></slot>
        </div>
    </div>
</template>

<script>
import SafeProtect from '@/common/components/safe-protect'
export default {
  name: 'orderTicketMoneyInfo',
  props: {
    storeInfo: Object
  },
  components: {
    SafeProtect
  },
  data () {
    return {
      isShowDetail: true
    }
  },
  methods: {
    toggleShowDetail () {
      this.isShowDetail = !this.isShowDetail
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-ticket-info-container
    .o-i-ticket-info-title
        padding .2rem
        color #333333
        font-size .3rem
        line-height .4rem
        border-bottom .01rem solid #f5f5f5
        & .play-time
            textStyle($orangeColor, .25)
            float right
    .o-i-ticket-info-money
        overflow hidden
        line-height .4rem
        border-bottom .01rem solid #f5f5f5
        padding .2rem
        & span:nth-child(1)
            color #333333
            font-size .28rem
            float left
        & span:nth-child(2)
            color $orangeColor
            font-size .28rem
            float left
            margin-left .2rem
        & span:nth-child(3)
            color #888888
            font-size .28rem
            float right
    .o-i-ticket-info-money-detail
        padding 0 .2rem
        border-bottom .01rem solid #f5f5f5
</style>
