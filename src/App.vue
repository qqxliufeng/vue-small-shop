<template>
  <div id="app">
      <div v-if="this.$isMobile() || this.NODE_DEVELOPMENT">
        <div>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <div class="sperator" v-show="$route.meta.showTab"></div>
        <home-navi v-show="$route.meta.showTab"></home-navi>
      </div>
      <open-mobile v-else></open-mobile>
  </div>
</template>

<script>
import OpenMobile from 'common/components/open-mobile'
import HomeNavi from '@/pages/home/components/HomeNavigation'
export default {
  name: 'App',
  components: {
    OpenMobile,
    HomeNavi
  },
  methods: {
    autoLogin () {
      if (!this.$root.userInfo.isLogin()) {
        let state = this.$root.state
        if (state.token) {
          this.$http(this.$urlPath.userInfo, {
            token: state.token
          }, null, (data) => {
            data.data.token = state.token
            this.$root.$data.userInfo.setUserInfo(data.data)
          }, null)
        }
      }
    }
  },
  mounted () {
    this.$http(this.$urlPath.reportUrl, {}, null, (data) => {
      this.$root.report = data.data
    }, (errorCode, error) => {
      console.log('获取失败')
    })
    // this.autoLogin()
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.sperator
    height $headerHeight
</style>
