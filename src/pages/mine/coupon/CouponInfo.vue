<!--
 * @Author: your name
 * @Date: 2020-04-28 14:41:18
 * @LastEditTime: 2020-04-28 15:11:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/src/pages/mine/coupon/CouponInfo.vue
 -->
<template>
  <div class=''>
    <navi title="可用商品" :isFixed="true"></navi>
    <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
      <ul id="coupon_info">
        <li class="coupon-item-card-wrapper bg-white flex margin-sm" v-for="item of list" :key="item.id">
          <div class="bg-white flex padding-sm solid-bottom" style="border-radius: 10rpx; overflow: hidden;" v-for="item of list" :key="item.goodsId">
            <div class="image-wrapper">
              <img :src="$utils.image.getImagePath(item.scenic_image[0])" mode="aspectFill" />
            </div>
            <div class="margin-left-sm flex justify-between flex-sub text-cut flex-direction">
              <div class="text-cut text-bold text-black">
                {{item.scenic_name}}
              </div>
              <div class="text-cut text-sm">
                {{item.goods_name}}
              </div>
              <div class="flex justify-between align-center">
                <span class="text-price text-red text-bold text-lg">{{item.minPrice}}</span>
                <button class="cu-btn sm bg-gradual-orange" @click="reseve(item)">立即购买</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import listMixins from 'common/mixins/list-mixin'
export default {
  name: 'CouponInfo',
  mixins: [listMixins],
  components: {
    navi,
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('coupon_info', this.upCallBack),
      list: []
    }
  },
  methods: {
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.couponInfo, {
        coupon_id: this.$route.query.cid
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
.image-wrapper
  width 75px
  height 75px
  & > img
    border-radius 5px
    height 100%
    width 100%
.circle
  width 2px
  height 2px
  border-radius 50%
</style>
