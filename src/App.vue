<template>
  <div id="app">
    <div v-if="this.$isMobile() || this.NODE_DEVELOPMENT">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <open-mobile v-else></open-mobile>
  </div>
</template>

<script>
import OpenMobile from 'common/components/open-mobile'
export default {
  name: 'App',
  components: {
    OpenMobile
  }
}
</script>
