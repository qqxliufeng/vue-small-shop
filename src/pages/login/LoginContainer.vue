<template>
  <div class='l-c-container'>
    <navi title="登录"></navi>
    <el-tabs :stretch="true" v-model="activeName">
      <el-tab-pane label="快捷登录" name="first">
        <fast-login :backName="backName"></fast-login>
      </el-tab-pane>
      <el-tab-pane label="账号登录" name="second">
        <login :backName="backName"></login>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import FastLogin from './FastLogin'
import Login from './login'
export default {
  name: 'loginContainer',
  props: {
    backName: Object
  },
  components: {
    navi,
    FastLogin,
    Login
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'fpone') {
        vm.activeName = 'second'
      }
      if (!vm.backName) {
        vm.backName = to.params.backName
      }
      if (vm.$root.userInfo.isLogin()) {
        if (vm.backName) {
          vm.$router.replace({name: vm.backName.name, query: vm.backName.query, params: vm.backName.params})
        } else {
          vm.$router.replace({path: '/index/' + vm.$root.state.getSallerInfo().identity + '/' + vm.$root.state.getSallerInfo().storeId})
        }
      }
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'

</style>
