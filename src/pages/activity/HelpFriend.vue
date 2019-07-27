<template>
  <div class='help-friend-container'>
    <navi title="好友助力" :isFixed="true"></navi>
    <goods-info></goods-info>
    <help-and-register></help-and-register>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import GoodsInfo from './comonents/GoodsInfo'
import HelpAndRegister from './comonents/HelpAndRegister'
export default {
  name: '',
  components: {
    navi,
    GoodsInfo,
    HelpAndRegister
  },
  data () {
    return {
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.help-friend-container
    background #ff5353
    padding $headerHeight * 1.2 rem(.4) rem(.4) rem(.4)
    min-height 90vh
</style>
