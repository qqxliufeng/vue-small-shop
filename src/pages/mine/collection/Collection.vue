<template>
   <div>
       <navi title="我的收藏" :isFixed="true"></navi>
       <el-tabs value="first" :stretch="true" class="c-tabs">
           <!-- <el-tab-pane label="店铺收藏" class="c-tabs-item" name="first" lazy>
               <shop-collection></shop-collection>
           </el-tab-pane> -->
           <el-tab-pane label="景区收藏" class="c-tabs-item" name="first" lazy>
               <scenic-collection></scenic-collection>
           </el-tab-pane>
           <el-tab-pane label="门票收藏" class="c-tabs-item" name="second" lazy>
               <ticket-collection></ticket-collection>
           </el-tab-pane>
       </el-tabs>
   </div>
</template>

<script>
import navi from 'common/components/navigation'
import shopCollection from './components/ShopCollection'
import scenicCollection from './components/ScenicCollection'
import ticketCollection from './components/TicketCollection'
export default {
  name: 'collection',
  components: {
    navi,
    shopCollection,
    scenicCollection,
    ticketCollection
  },
  data () {
    return {
      isFullScreen: false
    }
  },
  created () {
    setTimeout(function () { window.scrollTo(0, 1) }, 100)
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
