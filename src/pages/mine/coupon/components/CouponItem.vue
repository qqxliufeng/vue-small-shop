<template>
    <div :id="'coupon_item_' + state">
      <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
        <ul>
           <li class="coupon-item-card-wrapper bg-white flex margin-sm" v-for="item of list" :key="item.id">
              <div class="flex-sub flex flex-direction justify-center align-center">
                <div class="text-lg text-black text-bold text-cut">{{item.coupon.name}}</div>
                <div class="text-sm text-gray" style="margin-top: 8px; margin-bottom: 8px;">使用时间：{{item.coupon.use_start_date}} - {{item.coupon.use_end_date}}</div>
                <div class="text-sm text-gray">
                  使用范围：{{item.coupon.type === 1 ? '全店通用' : '指定商品可用'}}
                  <span v-if="item.coupon.type === 2 && item.status === 1" class="iconfont margin-left-sm text-yellow" style="font-size: 12px;" @click="seeGoods(item)">点击查看&#xe64c;</span>
                </div>
              </div>
              <div class="line-wrapper flex flex-direction justify-center align-center">
                <div class="circle-one"></div>
                <div class="line flex-sub"></div>
                <div class="circle-two"></div>
              </div>
              <div class="money-info-wrapper flex flex-direction justify-center align-center">
                <div class="text-red text-xl text-bold text-price">
                  {{item.coupon.money}}
                </div>
                <div class="text-bold text-red text-sm" v-if="Number(item.coupon.condition) > 0">满{{item.coupon.condition}}元可用</div>
              </div>
              <div class="iconfont status-flag text-gray" v-if="item.status === 1">&#xe7d5;</div>
              <div class="iconfont status-flag text-gray" v-if="item.status === 2">&#xe643;</div>
              <div class="iconfont status-flag text-gray" v-if="item.status === 3">&#xe668;</div>
            </li>
        </ul>
      </mescroll-vue>
    </div>

</template>
<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import listMixins from 'common/mixins/list-mixin'
export default {
  name: 'couponItem',
  mixins: [listMixins],
  props: {
    state: {
      type: String,
      default: '1'
    }
  },
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('coupon_item_' + this.state, this.upCallBack),
      list: null
    }
  },
  methods: {
    showRemark (index) {
      const item = this.couponList[index]
      item.isShowRemark = !item.isShowRemark
      const remark = this.$refs['contentRemarkContainer' + index][0]
      if (item.isShowRemark) {
        remark.style.minHeight = '1.5rem'
      } else {
        remark.style.minHeight = '0px'
      }
    },
    seeGoods (item) {
      this.$router.push({ name: 'couponInfo', query: { cid: item.id } })
    },
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.myCouponList, {
        page: page.num,
        status: this.state
      }, '', (res) => {
        if (res.data) {
          res.data = res.data.filter(it => {
            return it.coupon != null
          })
        }
        this.loadSuccess(page, mescroll, res.data)
      }, (errorCode, error) => {
        this.$toast(error)
        this.loadError(mescroll)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.mescroll
  mescroller()
.coupon-item-card-wrapper
  height 85px
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
    width 85px
    position relative
    z-index 2
    .button-wrapper
      height 17px
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
</style>
