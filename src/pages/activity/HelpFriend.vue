<template>
  <div class='help-friend-container'>
    <navi title="好友助力" :isFixed="true" :isShowBack="false"></navi>
    <goods-info :info="activityInfo" @countDownEnd="countDown"></goods-info>
    <help-and-register @help="help"></help-and-register>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import GoodsInfo from './comonents/GoodsInfo'
import HelpAndRegister from './comonents/HelpAndRegister'
export default {
  name: 'helpFriend',
  components: {
    navi,
    GoodsInfo,
    HelpAndRegister
  },
  data () {
    return {
      activityInfo: null,
      countDownEnd: false
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
    },
    countDown () {
      this.countDownEnd = true
    },
    help (params) {
      if (this.countDownEnd) {
        this.$toast('此活动已过期！')
        this.$router.replace({path: '/index/' + this.$route.query.i + '/' + this.$route.query.s})
        return
      }
      this.$http(this.$urlPath.assistLogin, {
        mobile: params.phone,
        captcha: params.captche,
        user_id: this.$route.query.uid,
        assist_id: this.$route.query.aid
      }, '正在助力…', (data) => {
        this.$toast('恭喜，助力成功')
        this.$root.$data.userInfo.setUserInfo(data.data.userinfo)
        this.$root.state.saveUserInfo(data.data.userinfo.token)
        this.$router.replace({path: '/index/' + this.$route.query.i + '/' + this.$route.query.s})
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
