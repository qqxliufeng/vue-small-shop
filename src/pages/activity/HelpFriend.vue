<template>
  <div class='help-friend-container'>
    <navi title="好友助力" :isFixed="true" :isShowBack="false"></navi>
    <goods-info :info="activityInfo"></goods-info>
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
      activityInfo: null
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.assistInvite, {
        assist_id: this.$route.query.aid,
        user_id: this.$route.query.uid
      }, '', (data) => {
        this.activityInfo = data
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  created () {
    let tempIdentity = this.$route.query.i
    let tempStoreId = this.$route.query.s
    // 如果是直接从分享页面过来的，则要存一下identity 和 storeId
    if (tempIdentity && tempStoreId) {
      this.$root.state.saveSallerInfo(tempIdentity, tempStoreId)
      this.sellerInfo = this.$root.state.getSallerInfo()
    }
  },
  mounted () {
    this.getData()
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
