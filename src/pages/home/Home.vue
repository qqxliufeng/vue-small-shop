<template>
    <div>
       <home-header></home-header>
       <home-swiper></home-swiper>
       <home-type></home-type>
       <div class="sperator-line-height"></div>
       <div class="h-h-title">人气推荐</div>
       <home-hot></home-hot>
       <div class="h-h-ad-wrapper">
         <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2079932039,2403444542&fm=27&gp=0.jpg">
       </div>
       <div class="h-h-title">猜你喜欢</div>
       <home-like></home-like>
       <home-navi></home-navi>
    </div>
</template>
<script>
import HomeHeader from './components/HomeHeader'
import HomeSwiper from './components/HomeSwiper'
import HomeType from './components/HomeType'
import HomeHot from './components/HomeHot'
import HomeLike from './components/HomeLike'
import HomeNavi from './components/HomeNavigation'
export default {
  name: 'home',
  props: ['nameId'],
  components: {
    HomeHeader,
    HomeSwiper,
    HomeType,
    HomeHot,
    HomeLike,
    HomeNavi
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.sperator-line-height
    horizontalLine(#f5f5f5, .2)
.h-h-title
    normalTextStyle(#333, .32)
    padding rem(.2) rem(.1)
    border-bottom #f5f5f5 solid rem(.02)
    margin 0 rem(.2)
.h-h-ad-wrapper
    height rem(2)
    border-top #f5f5f5 solid rem(.2)
    border-bottom #f5f5f5 solid rem(.2)
    & img
        width 100%
        height 100%
        object-fit cover
</style>
