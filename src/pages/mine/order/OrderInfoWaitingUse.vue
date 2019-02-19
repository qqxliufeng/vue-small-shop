<template>
    <div>
      <order-info-header>
            <template slot="headerTitleInfo">
                <p class="o-i-use-info">
                    产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用
                </p>
            </template>
            <template slot="headerBottomInfo">
                <div>
                    <order-step></order-step>
                </div>
            </template>
        </order-info-header>
        <div class="o-i-waiting-use-action-wrapper">
            <span @click="backMoney">退票</span>
            <span @click="isShowCanlendarDialog = true">变更时间</span>
        </div>
        <el-dialog title="选择日期" :visible.sync="isShowCanlendarDialog" center width="100%">
            <calander :events="calendar1.events" :lunar="calendar1.lunar" :begin="calendar1.begin" :end="calendar1.end" :weeks="calendar1.weeks" :months="calendar1.months" @select="calendar1.select">
                <template slot="event">
                    <div class="c-e-wrapper">
                        <p>补￥278</p>
                        <p>(余10244)</p>
                    </div>
                </template>
            </calander>
        </el-dialog>
    </div>
</template>

<script>
import orderInfoHeader from './components/OrderInfoHeader'
import orderStep from './components/OrderStep'
import calander from 'common/components/calendar/calendar.vue'
export default {
  name: 'orderInfoWaitingUse',
  components: {
    orderInfoHeader,
    orderStep,
    calander
  },
  data () {
    return {
      calendar1: {
        value: [2018, 2, 16], // 默认日期
        // lunar:true, //显示农历
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        events: {
          '2018-2-14': '$408', '2018-2-15': '$460', '2018-2-16': '$500\n111'
        },
        select (value) {
          console.log(value.toString())
        }
      },
      isShowCanlendarDialog: false
    }
  },
  methods: {
    backMoney () {
      this.$router.push({name: 'orderBackMoney'})
    }
  },
  mounted () {
    let date = new Date()
    this.calendar1.value = [date.getFullYear, date.getMonth, date.getDay]
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.o-i-use-info
    color #eeeeee
    font-size .25rem
    margin-top .2rem
    line-height .3rem
.o-i-waiting-use-action-wrapper
    display flex
    border-top .01rem solid #cccccc
    height .8rem
    text-align center
    & span
        flex 1
        display flex
        flex-direction column
        justify-content center
        font-size .3rem
    & span:nth-child(1)
        color #333333
    & span:nth-child(2)
        background-color $primary
        color #ffffff
.c-e-wrapper
    font-size .2rem
    margin 0 auto
    & p:nth-child(1)
        color $orangeColor
        margin-top .1rem
    & p:nth-child(2)
        color #cccccc
        margin-top .1rem
</style>
