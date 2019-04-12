<template>
    <div class="r-d-ticket-info-container">
        <div class="r-d-ticket-info-title-wrapper">
            <span class="r-d-ticket-info-title" v-if="ticketInfo.goods">【{{ticketInfo.goods.goods_title}}】</span>
            <span class="r-d-ticket-info-title-info" @click="showRemark = !showRemark">购买须知<i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="r-d-ticket-info-title-wrapper">
            <span class="r-d-ticket-info-time-title">使用日期</span>
            <span class="r-d-ticket-info-time-more" @click="isShowCanlendarDialog = true">更多日期<i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="r-d-ticket-info-time-wrapper">
            <div class="r-d-ticket-info-time-item" v-for="(item, index) of times" :key="index" @click="timeItemClick(item)" :class="[{'r-d-ticket-info-time-selected': item.isSelected},{'r-d-ticket-info-time-uneable' : !item.isEnable}]">
                <p>{{item.date}}</p>
                <p>周{{$utils.getWeekByWeek(item.week)}}</p>
                <p>￥{{item.price}}</p>
            </div>
        </div>
        <div class="r-d-ticket-info-count-wrapper">
            <span class="r-d-ticket-info-count-title">购买数量</span>
            <div class="r-d-ticket-info-count-info">
                <span class="r-d-ticket-info-count-info-price">￥{{tempTime.price || 0}}</span>
                <span class="r-d-ticket-info-count-info-release-count">剩余{{tempTime.count || 0}}张</span>
                <el-input-number v-model="num" size="mini" :max="tempTime.count || 1" :min="minNum" @change="onNumberChange"></el-input-number>
            </div>
        </div>
       <el-dialog title="选择日期" :visible.sync="isShowCanlendarDialog" center width="92%" :modal="false" @open="showModal = true" @close="showModal = false">
            <calander :events="events" :lunar="calendar.lunar" :begin="calendar.begin()" :end="calendar.end" :weeks="calendar.weeks" :months="calendar.months" @select="select">
                <template slot="event" slot-scope="slotProps">
                    <div class="c-e-wrapper">
                        <p :style="{ 'color' : slotProps.disabled ? '#ccc' : '#64BBAE'}">￥{{slotProps.event.sale_price}}</p>
                        <p :style="{ 'color' : slotProps.disabled ? '#ccc' : '#64BBAE'}">余{{slotProps.event.one_stock}}</p>
                    </div>
                </template>
            </calander>
        </el-dialog>
        <transition name="slide-fade" @before-enter="beforeEnter" @before-leave="beforeLeave">
            <div v-show="showRemark" class="r-d-ticket-info-remark-wrapper">
                <div class="r-d-ticket-info-remark-title-wrapper">
                    <span>购买须知</span>
                </div>
                <div class="remark-content-wrapper">
                    <ul>
                      <li v-for="(item, index) of remarks" :key="index">
                          <ticket-remark :remark="item"></ticket-remark>
                      </li>
                      <p class="remark-content-confirm" @click="showRemark = false">确定</p>
                    </ul>
                </div>
            </div>
        </transition>
        <div class="v-modal" v-show="showModal" @click="showRemark = false"></div>
    </div>
</template>

<script>
import calander from 'common/components/calendar/calendar.vue'
import TicketRemark from 'common/components/ticket-remark'
export default {
  name: 'TicketInfo',
  props: {
    ticketInfo: Object
  },
  components: {
    calander,
    TicketRemark
  },
  data () {
    return {
      num: 1,
      minNum: 1,
      isShowCanlendarDialog: false,
      showRemark: false,
      showModal: false,
      calendar: {
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        begin: () => {
          let date = new Date()
          return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        }
      },
      times: [
        {
          date: '',
          week: '',
          price: '0',
          count: 0,
          salesId: '',
          isEnable: false,
          isSelected: false,
          raw: {}
        },
        {
          date: '',
          week: '',
          price: '0',
          count: 0,
          salesId: '',
          isEnable: false,
          isSelected: false,
          raw: {}
        },
        {
          date: '',
          week: '',
          price: '0',
          count: 0,
          salesId: '',
          isEnable: false,
          isSelected: false,
          raw: {}
        },
        {
          date: '',
          week: '',
          price: '0',
          count: 0,
          salesId: '',
          isEnable: false,
          isSelected: false,
          raw: {}
        }
      ],
      events: {},
      tempTime: {
        date: '',
        price: '0',
        count: 0,
        isEnable: false,
        isSelected: false,
        raw: {}
      }
    }
  },
  computed: {
    remarks () {
      if (this.ticketInfo) {
        let tempRemarks = []
        for (let key in this.ticketInfo.goods) {
          if (this.ticketInfo.goods[key] instanceof Object) {
            tempRemarks.push(this.ticketInfo.goods[key])
          }
        }
        return tempRemarks
      } else {
        return []
      }
    }
  },
  watch: {
    ticketInfo (newVal, oldVal) {
      if (newVal) {
        let tempEvent = {}
        for (let key in this.ticketInfo.calendar) {
          let item = this.ticketInfo.calendar[key]
          tempEvent[item.date] = item
        }
        this.minNum = this.ticketInfo.goods.min_number
        this.num = this.minNum
        this.events = tempEvent
        this.initDate()
        this.showRemark = true
      }
    }
  },
  methods: {
    initDate () {
      let date = new Date()
      this.times.forEach((it, index) => {
        this.setTimesItem(date, it, index)
      })
      let tempArray = this.times.filter((item, index, array) => item.isEnable)
      if (tempArray && tempArray.length > 0) {
        tempArray[0].isSelected = true
        this.tempTime = tempArray[0]
        this.emit()
      }
    },
    timeItemClick (item) {
      this.tempTime = item
      this.num = 1
      this.times.forEach(element => {
        element.isSelected = element === item
      })
      this.emit()
    },
    select (startDate, child) {
      if (child.eventName) {
        let date = new Date(startDate[0], startDate[1] - 1, startDate[2])
        this.times.forEach((it, index) => {
          this.setTimesItem(date, it, index)
        })
        this.tempTime = this.times[0]
        this.emit()
        this.isShowCanlendarDialog = false
      } else {
        this.$toast('所选日期暂无票的信息，请重新选择…')
      }
    },
    setTimesItem (date, it, index) {
      it.date = this.$utils.dateAdd(date, index).date
      it.week = this.$utils.dateAdd(date, index).week
      let temp = this.events[it.date]
      it.isEnable = this.events.hasOwnProperty(it.date) && temp && parseInt(temp.one_stock) !== 0
      it.count = it.isEnable && temp ? temp.one_stock : 0
      it.price = temp ? temp.sale_price : '0'
      it.isSelected = it.isEnable && index === 0
      it.raw = temp
    },
    onNumberChange () {
      this.emit()
    },
    emit () {
      this.$emit('selected', {item: this.tempTime.raw, num: this.num})
    },
    beforeEnter (el) {
      this.showModal = true
    },
    beforeLeave (el) {
      this.showModal = false
    },
    showRemarkDialog () {
      this.showRemark = true
    },
    routeLeave () {
      this.showRemark = false
      this.isShowCanlendarDialog = false
      this.showRemark = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.slide-fade-enter-active, .slide-fade-leave-active
    transition all .3s
.slide-fade-enter, .slide-fade-leave-to
    transform translateY(10rem)
    opacity 0
.r-d-ticket-info-container
    z-index 0
    .c-e-wrapper
        & p:nth-of-type(1)
          textStyle($primary, .2)
        & p:nth-of-type(2)
          textStyle($primary, .2)
    .r-d-ticket-info-title-wrapper
        display flex
        padding rem(.2) 0
        margin 0 rem(.2)
        borderBottom()
        align-items center
        .r-d-ticket-info-title
            flex 1
            normalTextStyle(#333, .3)
        .r-d-ticket-info-title-info
            textStyle($primary, .3)
        .r-d-ticket-info-time-title
            flex 1
            normalTextStyle(#333, .3)
            & i
                color #888888
                font-size rem(.25)
                margin-left rem(.2)
        .r-d-ticket-info-time-more
            normalTextStyle(#888888, .28)
    .r-d-ticket-info-time-wrapper
        display flex
        padding rem(.2)
        borderBottom()
        .r-d-ticket-info-time-item
            width 25%
            height rem(1.35)
            margin 0 1.25%
            border #f5f5f5 solid 1px
            display flex
            justify-content center
            align-items center
            flex-direction column
            border-radius rem(.1)
            color #333
            & p:nth-child(2)
                color #888
                font-size rem(.2)
                margin-top rem(.05)
            & p:nth-child(3)
                margin-top rem(.2)
                color $orangeColor
        .r-d-ticket-info-time-selected
            border $primary solid 1px
        .r-d-ticket-info-time-uneable
            color #888
            pointer-events none
            & p
                color #ccc !important
    .r-d-ticket-info-count-wrapper
        display flex
        padding rem(.3)
        align-items center
        borderBottom()
        .r-d-ticket-info-count-title
            textStyle(#333, .3)
            flex 1
        .r-d-ticket-info-count-info
            display flex
            align-items center
            .r-d-ticket-info-count-info-price
                textStyle($orangeColor, .3)
            .r-d-ticket-info-count-info-release-count
                textStyle(#888, .28)
                margin 0 rem(.2)
            & >>> .el-input-number--mini
                width rem(2)
    .r-d-ticket-info-remark-wrapper
        position fixed
        bottom 0
        top 20%
        left 0
        right 0
        z-index 1001
        overflow-y scroll
        background-color #fff
        .r-d-ticket-info-remark-title-wrapper
            display flex
            padding rem(.2)
            background-color #f5f5f5
            position sticky
            top 0
            left 0
            right 0
            z-index 998
            align-items center
            & span:nth-child(1)
                text-align center
                flex 1
                textStyle(#333, .35)
            & span:nth-child(2)
                textStyle(#555, .5)
        .remark-content-wrapper
            position absolute
            top rem(.95)
            left 0
            right 0
            .remark-content-confirm
                line-height rem($headerHeight)
                text-align center
                background $primary
                textStyle(#fff, .35)
                margin-top rem(.2)
    .v-modal
        position fixed
        top 0
        left 0
        right 0
        height 100%
        background-color #000000
        z-index 1000
        opacity .5
</style>
