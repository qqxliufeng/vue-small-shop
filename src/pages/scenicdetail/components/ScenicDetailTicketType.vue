<template>
    <el-card :body-style="{padding: '0'}"  class="s-d-t-type-container" v-if="typeGoodsList && typeGoodsList.length > 0">
        <div class="s-d-t-type-title-wrapper" ref="type" @click="positionType">
          <span class="el-icon-tickets icon"></span>
          <span style="font-weight: bold; color: #444">{{title}}</span>
        </div>
        <div>
          <swiper :options="swiperOption" class="h-h-hot-card">
              <swiper-slide v-for="(tabItem, index) of tempTypeGoodsList" :key="tabItem.goodsTypeId">
                  <span class="tab-item" @click="selectTabItem(index)" :class="{'tab-item-selected' : tabItem.isSelected}">{{tabItem.goodsTypeName}}</span>
              </swiper-slide>
          </swiper>
          <ul v-if="currentTabItems && currentTabItems.length > 0" class="ticket-wrapper">
            <li v-for="item of tempCurrentTabItems" :key="item.goodsId">
                <scenic-detail-ticket-item :item="item" @reseve-detail="reseveDetail" @counpon="showCouponList"></scenic-detail-ticket-item>
            </li>
            <div v-if="tempCurrentTabItems && tempCurrentTabItems.length < currentTabItems.length" class="show-more" @click="showMore">
              加载更多
            </div>
        </ul>
        <div v-else class="s-d-l-m-message-empty">
            <span>暂无产品</span>
        </div>
        </div>
    </el-card>
</template>

<script>
import ScenicDetailTicketItem from './ScenicDetailTicketItem'
export default {
  name: 'scenicDetailTicketType',
  props: {
    typeGoodsList: Array,
    title: {
      type: String,
      default: '优惠信息'
    }
  },
  components: {
    ScenicDetailTicketItem
  },
  data () {
    return {
      headerHeight: 0.86 * 50,
      offsetTop: 0,
      isFixed: false,
      isScroll: false,
      swiperOption: {
        slidesPerView: 5
      },
      currentTabItems: null,
      tempCurrentTabItems: null,
      tempTypeGoodsList: null,
      sliceSize: 4
    }
  },
  watch: {
    typeGoodsList (newVal, oldVal) {
      if (newVal && newVal.length > 0) {
        this.tempTypeGoodsList = newVal.filter((item) => {
          return item.goods_list && item.goods_list.length > 0
        })
        this.tempTypeGoodsList.forEach((item, index) => {
          this.$set(item, 'isSelected', index === 0)
        })
        if (this.tempTypeGoodsList && this.tempTypeGoodsList.length > 0) {
          this.currentTabItems = this.tempTypeGoodsList[0].goods_list
          this.tempCurrentTabItems = this.currentTabItems.slice(0, this.sliceSize)
        }
      }
    }
  },
  methods: {
    handlerScroll () {
      if (this.$refs.type) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (!this.offsetTop) {
          this.offsetTop = this.$refs.type.offsetTop
        }
        this.isFixed = scrollTop + this.headerHeight >= this.offsetTop
        this.isScroll = false
      }
    },
    showCouponList (counpon) {
      this.$emit('counpon', counpon)
    },
    positionType () {
      if (this.isFixed) {
        document.querySelector('#tab').scrollIntoView()
        this.isScroll = true
      }
    },
    selectTabItem (index) {
      if (this.tempTypeGoodsList && this.tempTypeGoodsList.length > 0) {
        this.tempTypeGoodsList.forEach((item, i) => {
          item.isSelected = index === i
        })
        this.currentTabItems = this.tempTypeGoodsList[index].goods_list
        this.tempCurrentTabItems = this.currentTabItems.slice(0, this.sliceSize)
      } else {
        this.currentTabItems = null
        this.tempCurrentTabItems = null
      }
    },
    reseveDetail (item) {
      this.$emit('reseve-detail', item)
    },
    showMore () {
      this.tempCurrentTabItems = this.currentTabItems
      this.$emit('show-more')
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handlerScroll, true)
    if (this.$refs.tabs) {
      this.offsetTop = this.$refs.type.offsetTop
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handlerScroll, true)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
>>> .el-tabs__item
    color #666
>>> .is-active
    color #e18234
>>> .el-tabs__active-bar
    background-color #e18234
>>> .swiper-slide
    text-align center
.tab-item
    display inline-block
    text-align center
    line-height rem(.5)
    height rem(.5)
    margin rem(.15) 0
    color #888
    padding rem(.01) rem(.2)
    font-size rem(.28)
.tab-item-selected
    color #fff
    border-radius rem(.3)
    background-color #ffad2c
.tab-fixed
    position fixed
    top $headerHeight
    left 0
    right 0
    background-color #ffffff
    z-index 999
.tab-scroll
    margin-top 2 * $headerHeight
.s-d-t-type-container
    margin rem(.2)
    .ticket-wrapper
        border-radius rem(.1)
        background-color #f5f7f8
        margin rem(.15)
        .show-more
            text-align center
            background-color #fff
            padding rem(.1)
            padding-top rem(.2)
    .s-d-t-type-title-wrapper
        normalTextStyle(#333, .3)
        borderBottom()
        height $headerHeight
        line-height $headerHeight
        padding-left rem(.2)
        background-color #ffffff
        .icon
            textStyle($orangeColor, .35)
    .s-d-t-type-wrapper
        padding rem(.2)
    & >>> .el-tabs__nav-scroll
        margin 0 rem(.1)
    .s-d-l-m-message-empty
        display flex
        justify-content center
        align-items center
        min-height rem(2)
        normalTextStyle(#888, .3)
</style>
