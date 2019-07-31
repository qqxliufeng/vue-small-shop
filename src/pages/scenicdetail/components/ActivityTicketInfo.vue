<template>
  <div class='activity-ticket-info-container' v-if="assist">
    <div class="tip-wrapper">
      <div class="tip-bg"></div>
      <div class="tip" v-if="assist.join.status === 1">
        恭喜，任务已完成
      </div>
      <div class="tip" v-else>再邀请<span class="num">{{assist.join.status === 1 ? 0 : assist.number - assist.join.join_number}}</span>位好友助力，即可购买此票</div>
    </div>
    <div class="time-wrapper">
      <p class="time-relase-tip">剩余时间</p>
      <count-down :time="Math.max(0, (assist.end_time - time) * 1000)" @end="countDownEnd">
        <template slot-scope="props">
            <span class="time">
                <span class="time-bg">{{ props.days }}</span><i>天</i><span class="time-bg">{{ props.hours }}</span><i>时</i><span  class="time-bg">{{ props.minutes }}</span><i>分</i><span  class="time-bg">{{ props.seconds }}</span><i>秒</i>
            </span>
        </template>
      </count-down>
    </div>
  </div>
</template>

<script>
import CountDown from 'common/components/countdown/countdown'
export default {
  name: 'activityTicketInfo',
  props: {
    assist: Object,
    time: Number
  },
  components: {
    CountDown
  },
  data () {
    return {
    }
  },
  methods: {
    countDownEnd () {
      this.$emit('countDownEnd')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.activity-ticket-info-container
    display flex
    justify-content center
    align-items center
    height rem(1)
    border-bottom 1px solid #f5f5f5
    .tip-wrapper
        flex 2.5
        position relative
        height 100%
        line-height rem(1)
        .tip-bg
            width 100%
            background #FF5353
            position absolute
            top 0
            bottom 0
            left 0
            right 0
            z-index -1
            margin-left rem(-.3)
            transform skewX(-30deg)
        .tip
            color #fff
            padding-left rem(.2)
            font-size rem(.25)
            .num
                font-size rem(.4)
                margin 0 rem(.1)
    .time-wrapper
        flex 1
        text-align center
        min-width rem(2.6)
        .time-relase-tip
            color #666
            font-size rem(.28)
            margin-bottom rem(.1)
        .time
            color #333
            font-size rem(.3)
            & > i
                textStyle(#666, .22)
                margin 0 rem(.05)
</style>
