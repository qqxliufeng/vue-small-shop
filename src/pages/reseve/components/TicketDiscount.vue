<!--
 * @Author: your name
 * @Date: 2019-03-27 20:26:46
 * @LastEditTime: 2020-05-06 11:58:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/src/pages/reseve/components/TicketDiscount.vue
 -->
<template>
    <div class="r-d-discount-container">
        <div class="r-d-discount-title-wrapper">
            优惠
        </div>
        <div class="r-d-discount-item-wrapper">
            <span class="r-d-discount-item-tag">券</span>
            <span class="r-d-discount-item-name">优惠券</span>
            <span v-if="couponList && couponList.length > 0" class="text-black text-sm" @click="showRemark = true">选择优惠券<i class="el-icon-arrow-right"></i></span>
            <span v-else class="r-d-discount-item-des">暂无可用</span>
        </div>
        <!-- <div class="r-d-discount-item-wrapper">
            <span class="r-d-discount-item-tag">减</span>
            <span class="r-d-discount-item-name">立减</span>
            <span class="r-d-discount-item-des">下单减5元</span>
        </div> -->
        <transition name="slide-fade" @before-enter="beforeEnter" @before-leave="beforeLeave">
          <div v-if="showRemark" class="r-d-ticket-info-remark-wrapper">
            <div class="title bg-white flex justify-between padding-sm align-center solid-bottom">
              <span class="text-black text-bold text-lg">优惠券列表</span>
              <i class="el-icon-circle-close close-icon" @click="close" style="font-size: 22px"></i>
            </div>
            <div class="content">
                <div class="flex margin-sm bg-white" v-for="item of couponList" :key="item.id">
                    <div class="coupon-left flex flex-direction justify-center align-center" :class="item.isSelected ? 'bg-gradual-blue' : 'bg-gray text-gray'">
                        <span class="text-price text-bold text-lg">
                            {{item.money}}
                        </span>
                        <span class="text-sm" style="margin-top: 5px;">
                            满{{item.condition}}元可用
                        </span>
                    </div>
                    <div class="flex-sub flex flex-direction justify-between padding-sm">
                        <div class="text-red text-bold">{{item.name}}</div>
                        <div class="text-black text-sm">{{item.use_start_date}} - {{item.use_end_date}}</div>
                    </div>
                    <div style="width: 20px; margin-right: 10px;" class="flex justify-center align-center" @click="itemSelected(item)">
                        <div class="el-icon-circle-check" style="color: #ff0000; font-size: 20px;" v-if="item.isSelected"></div>
                        <div class="un-selected" style="font-size: 20px;" v-else></div>
                    </div>
                </div>
            </div>
            <div style="height: 60px;">
            </div>
            <div class="flex flex-direction button-confirm-wrapper bg-white">
                <button class="cu-btn bg-red margin-tb-sm lg" style="height: 30px;" @click="conponConfirm">确定</button>
            </div>
          </div>
        </transition>
        <div class="v-modal" v-show="showModal" @click="showRemark = false"></div>
    </div>
</template>

<script>
export default {
  name: 'TicketDiscount',
  props: {
    couponList: Array,
    totalPrice: [Number, String]
  },
  data () {
    return {
      showRemark: false,
      showModal: false
    }
  },
  watch: {
    couponList (newVal, oldVal) {
      if (newVal) {
        newVal.forEach(it => {
          this.$set(it, 'isSelected', false)
        })
      }
    }
  },
  methods: {
    beforeEnter (el) {
      this.showModal = true
    },
    beforeLeave (el) {
      this.showModal = false
    },
    close () {
      this.showRemark = false
      this.showModal = false
    },
    conponConfirm () {
      this.close()
      const temp = this.couponList.filter(it => it.isSelected)
      if (temp.length > 0) {
        this.selectedItem = temp[0]
      } else {
        this.selectedItem = null
      }
      this.$emit('selectedCoupon', this.selectedItem)
    },
    itemSelected (item) {
      if (item.isSelected) {
        item.isSelected = false
      } else {
        if (Number(item.condition) > this.totalPrice) {
          this.$toast('满 ￥' + item.condition + ' 方能使用此优惠券')
          return
        }
        this.couponList.forEach(it => {
          it.isSelected = it.id === item.id
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
>>> .v-modal
      z-index 1
.slide-fade-enter-active, .slide-fade-leave-active
    transition all .3s
.slide-fade-enter, .slide-fade-leave-to
    transform translateY(10rem)
    opacity 0
.r-d-discount-container
    border-top rem(.2) solid #f5f5f5
    padding rem(.3)
    .r-d-discount-title-wrapper
        textStyle(#333, .3)
        borderBottom()
        padding-bottom rem(.3)
    .r-d-discount-item-wrapper
        display flex
        align-items center
        padding rem(.3) 0
        borderBottom()
        .r-d-discount-item-tag
            background-color $orangeColor
            display inline-block
            width rem(.2)
            height rem(.2)
            line-height rem(.25)
            padding rem(.05)
            font-size rem(.2)
            color #ffffff
            margin-right rem(.2)
        .r-d-discount-item-name
            flex 1
.r-d-ticket-info-remark-wrapper
    position fixed
    bottom 0
    top 20%
    left 0
    right 0
    z-index 1001
    overflow-y scroll
    background-color #f5f5f5
    border-top-left-radius rem(.2)
    border-top-right-radius rem(.2)
    padding-top rem(.2)
    .close-icon
      font-size 20px
    .title
      position absolute
      top 0
      left 0
      right 0
      height rem(.5)
    .content
      position absolute
      top rem(.9)
      left 0
      right 0
      bottom 0
      overflow-y scroll
      .coupon-left
        width rem(1.7)
        height rem(1.3)
      .coupon-item-card-wrapper
        height 88px
        border-radius 5px
        position relative
        overflow hidden
        .status-flag
          position absolute
          top 0
          right 2px
          margin-top -10px
          font-size 40px
        .money-info-wrapper
          width 88px
          position relative
          z-index 2
          .button-wrapper
            height 18px
        .money-info-bg
          background rgba(255,182,193, .2)
        .line-wrapper
          width 10px
          .circle-one
            width 10px
            height 10px
            background-color #f1f1f1
            margin-top -50%
            border-radius 50%
          .line
            border #f1f1f1 dashed 1px
            width 1px
          .circle-two
            width 10px
            height 10px
            background-color #f1f1f1
            margin-bottom -50%
            border-radius 50%
    .button-confirm-wrapper
      position fixed
      left 0px
      right 0px
      bottom 0px
      padding 0 10px
    .un-selected
      border 1px solid #888
      border-radius 50%
      width 15px
      height 15px
</style>
