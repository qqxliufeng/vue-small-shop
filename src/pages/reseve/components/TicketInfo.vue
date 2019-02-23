<template>
    <div class="r-d-ticket-info-container">
        <div class="r-d-ticket-info-title-wrapper">
            <span class="r-d-ticket-info-title">【趵突泉成人票】</span>
            <span class="r-d-ticket-info-title-info" @click="showRemark = !showRemark">使用须知<i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="r-d-ticket-info-title-wrapper">
            <span class="r-d-ticket-info-time-title">使用日期<i>当日可用</i></span>
            <span class="r-d-ticket-info-time-more" @click="isShowCanlendarDialog = true">更多日期<i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="r-d-ticket-info-time-wrapper">
            <div class="r-d-ticket-info-time-item" v-for="(item, index) of times" :key="index" @click="timeItemClick(item)" :class="[{'r-d-ticket-info-time-selected': item.isSelected},{'r-d-ticket-info-time-uneable' : !item.isEnable}]">
                <p>{{item.date}}</p>
                <p>{{item.price}}</p>
            </div>
        </div>
        <div class="r-d-ticket-info-count-wrapper">
            <span class="r-d-ticket-info-count-title">购买数量</span>
            <div class="r-d-ticket-info-count-info">
                <span class="r-d-ticket-info-count-info-price">￥88</span>
                <span class="r-d-ticket-info-count-info-release-count">剩余112张</span>
                <el-input-number v-model="num" size="mini" :max="10" :min="1"></el-input-number>
            </div>
        </div>
       <el-dialog title="选择日期" :visible.sync="isShowCanlendarDialog" center width="92%" :modal="false" @open="showModal = true" @close="showModal = false">
            <calander :events="calendar.events" :lunar="calendar.lunar" :begin="calendar.begin" :end="calendar.end" :weeks="calendar.weeks" :months="calendar.months" @select="select">
                <template slot="event">
                    <div class="c-e-wrapper">
                        <p>补￥278</p>
                        <p>(余10244)</p>
                    </div>
                </template>
            </calander>
        </el-dialog>
        <transition name="slide-fade" @before-enter="beforeEnter" @before-leave="beforeLeave">
            <div v-show="showRemark" class="r-d-ticket-info-remark-wrapper">
                <div class="r-d-ticket-info-remark-title-wrapper">
                    <span>预定须知</span>
                    <!-- <span class="el-icon-circle-close-outline" @click="showRemark = false"></span> -->
                </div>
                <div class="r-d-ticket-info-remark-content-wrapper">
                    <div v-for="(item, index) of remarks" :key="index">
                        <p class="r-d-ticket-info-remark-content-title">商家信息</p>
                        <p class="r-d-ticket-info-remark-content-title-info">
                            <span>
                                title
                            </span>
                            <span>
                                这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
                            </span>
                        </p>
                    </div>
                    <p class="r-d-ticket-info-remark-content-confirm" @click="showRemark = false">确定</p>
                </div>
            </div>
        </transition>
        <div class="v-modal" v-show="showModal" @click="showRemark = false"></div>
    </div>
</template>

<script>
import calander from 'common/components/calendar/calendar.vue'
export default {
  name: 'TicketInfo',
  components: {
    calander
  },
  data () {
    return {
      num: 1,
      isShowCanlendarDialog: false,
      showRemark: false,
      showModal: false,
      calendar: {
        value: [2018, 2, 16], // 默认日期
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        events: {
          '2018-2-14': '$408', '2018-2-15': '$460', '2018-2-16': '$500\n111'
        }
      },
      times: [
        {
          date: '2018-02-29',
          price: '￥24',
          isEnable: true,
          isSelected: true
        },
        {
          date: '02-29',
          price: '￥25',
          isEnable: true,
          isSelected: false
        },
        {
          date: '02-29',
          price: '￥26',
          isEnable: false,
          isSelected: false
        },
        {
          date: '02-29',
          price: '￥27',
          isEnable: true,
          isSelected: false
        }
      ],
      remarks: []
    }
  },
  mounted () {
    for (let index = 0; index < 100; index++) {
      this.remarks.push('这是备注' + index)
    }
    let date = new Date()
    this.times.forEach((it, index) => {
      it.date = this.$utils.dateAdd(date, index)
    })
  },
  methods: {
    timeItemClick (item) {
      this.times.forEach(element => {
        element.isSelected = element === item
      })
    },
    select (startDate) {
      let date = new Date(startDate[0], startDate[1] - 1, startDate[2])
      this.times.forEach((it, index) => {
        it.date = this.$utils.dateAdd(date, index)
      })
      this.isShowCanlendarDialog = false
    },
    beforeEnter (el) {
      this.showModal = true
    },
    beforeLeave (el) {
      this.showModal = false
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
            height rem(1)
            margin 0 1.25%
            border #f5f5f5 solid 1px
            display flex
            justify-content center
            align-items center
            flex-direction column
            border-radius rem(.1)
            color #333
            & p:nth-child(2)
                margin-top rem(.1)
                color $orangeColor
        .r-d-ticket-info-time-selected
            border $primary solid 1px
        .r-d-ticket-info-time-uneable
            color #888
            pointer-events none
            & p:nth-child(2)
                color #888
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
        .r-d-ticket-info-remark-content-wrapper
            position absolute
            top rem(.95)
            left 0
            right 0
            .r-d-ticket-info-remark-content-title
                padding rem(.25)
                vertical-align bottom
                font-size rem(.3)
                &::before
                    content ""
                    display inline-block
                    width 2px
                    height rem(.3)
                    margin-right rem(.2)
                    background-color $primary
                    vertical-align bottom
            .r-d-ticket-info-remark-content-title-info
                margin-left .7rem
                & span
                    display inline-block
                & span:nth-child(1)
                    color #333333
                    width 30%
                    font-size rem(.3)
                    vertical-align top
                & span:nth-child(2)
                    width 60%
                    margin-left 5%
                    vertical-align middle
                    color #888888
            .r-d-ticket-info-remark-content-confirm
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
