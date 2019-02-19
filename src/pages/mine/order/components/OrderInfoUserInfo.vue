<template>
    <div class="o-i-user-info">
        <el-collapse value="1">
            <el-collapse-item name="1">
                <template slot="title">
                    <p class="o-i-use-info-title">{{title}}</p>
                </template>
                <div class="o-i-user-info-wrapper">
                    <slot name="userInfo"></slot>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import orderInfoKeyValue from './orderInfoKeyValue'
export default {
  name: 'orderInfoUserInfo',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    orderInfoKeyValue
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.o-i-use-info-title
    color #333333
    font-size .28rem
    padding-left .2rem
    &::before
        beforeLine()
.o-i-user-info-wrapper
    padding-left .2rem
</style>
