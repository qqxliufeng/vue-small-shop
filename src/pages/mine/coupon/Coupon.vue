<template>
    <div>
        <navi title="优惠券" :isFixed="true"></navi>
        <el-tabs value="first" :stretch="true" class="c-tabs">
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
