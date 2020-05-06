<!--
 * @Author: your name
 * @Date: 2019-02-12 18:26:25
 * @LastEditTime: 2020-04-28 18:38:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/src/pages/mine/coupon/Coupon.vue
 -->
<template>
    <div>
        <navi title="优惠券" :isFixed="true"></navi>
        <el-tabs value="first" :stretch="true" class="c-tabs" @tab-click="handleClick">
            <el-tab-pane label="可使用" name="first" class="c-tabs-item">
                <coupon-item state="1"></coupon-item>
            </el-tab-pane>
            <el-tab-pane label="已使用" name="second" class="c-tabs-item">
                <coupon-item state="2"></coupon-item>
            </el-tab-pane>
            <el-tab-pane label="已过期" name="third" class="c-tabs-item">
                <coupon-item state="3"></coupon-item>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import navi from 'common/components/navigation'
import CouponItem from './components/CouponItem'
export default {
  name: 'coupon',
  components: {
    navi,
    CouponItem
  },
  methods: {
    handleClick (tab, event) {
      tab.$children[0].$refs.mescroll.mescroll.resetUpScroll(true)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.c-tabs
    tabsFixed()
    .c-tabs-item
        tabFixed()
</style>
