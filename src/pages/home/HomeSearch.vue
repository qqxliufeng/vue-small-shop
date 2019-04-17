<template>
  <div>
     <search-header @search="search"></search-header>
     <search-tip v-if="showTip" @search="search"></search-tip>
     <search-list v-else :resultList="resultList"></search-list>
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
  data () {
    return {
      showTip: true,
      resultList: null
    }
  },
  methods: {
    back: function () {
      this.$router.back()
    },
    search (content) {
      this.showTip = false
      this.getData(content)
    },
    getData (content) {
      this.$http(this.$urlPath.runSeacher, {
        identity: this.$root.state.identity,
        store_id: this.$root.state.storeId,
        key: content
      }, '', (data) => {
        this.resultList = data.data
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.this-is-c-dev-branch
    overflow hidden
    height 100%
</style>
