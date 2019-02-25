<template>
  <div>
     <search-header></search-header>
     <search-tip></search-tip>
     <search-list></search-list>
  </div>
</template>
<script>
import SearchHeader from './components/HomeSearchHeader'
import SearchTip from './components/HomeSearchTip'
import SearchList from './components/HomeSearchList'
export default {
  name: 'login',
  components: {
    SearchHeader,
    SearchTip,
    SearchList
  },
  methods: {
    back: function () {
      this.$router.back()
    }
  }
}
</script>
<style lang="stylus" scoped>
.this-is-c-dev-branch
    overflow hidden
    height 100%
</style>
