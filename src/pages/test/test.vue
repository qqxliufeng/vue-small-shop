<template>
<div class=''>
  <p @click="click">这是一级页面</p>
  <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'testVue',
  components: {},
  data () {
    return {

    }
  },
  methods: {
    click () {
      this.$router.push({path: '/testvue/b'})
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'

</style>
