<template>
    <div class="h-h-header-container">
      <span class="h-h-header-title">济南<i class="el-icon-arrow-down"></i></span>
      <span class="h-h-header-search" @click="startSearch"><i class="el-icon-search"></i>搜索景点、关键字</span>
      <span class="iconfont h-h-header-mine">&#xe8a0;</span>
    </div>
</template>
<script>
export default {
  name: 'homeHeader',
  methods: {
    startSearch () {
      this.$router.push({name: 'homeSearch'})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-h-header-container
    display flex
    padding .1rem .2rem
    height rem($headerHeight)
    align-items center
    overflow hidden
    .h-h-header-title
        min-width rem(.5)
        ellipse()
        normalTextStyle(#333, .3)
        margin-right rem(.2)
        & i
            margin-left .1rem
    .h-h-header-search
        flex 4
        background-color #f5f5f5
        border-radius rem(.1)
        normalTextStyle(#888, .25)
        height rem(.6)
        line-height rem(.6)
        text-align center
        & i
           font-size rem(.3)
           margin-right rem(.15)
    .h-h-header-mine
        normalTextStyle(#333, .4)
        margin 0 rem(.2)
</style>
