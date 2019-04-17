<template>
    <div id="scenicListContainer">
      <scenic-header></scenic-header>
      <div class="s-l-content-wrapper">
        <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
          <scenic-type :tags="tags"></scenic-type>
          <ul>
              <li v-for="(item, index) of list" :key="index">
                <scenic-list-item></scenic-list-item>
              </li>
          </ul>
        </mescroll-vue>
      </div>
    </div>
</template>

<script>
import ScenicHeader from './components/ScenicListHeader'
import ScenicType from './components/ScenicListType'
import ScenicListItem from './components/ScenicListItem'
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'scenicList',
  mixins: [listMixin],
  components: {
    ScenicHeader,
    ScenicType,
    MescrollVue,
    ScenicListItem
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('scenicListContainer', this.upCallBack),
      list: [],
      tags: null
    }
  },
  methods: {
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.categoryIndex, {
        cate_id: this.$route.query.categoryId,
        page: page.num,
        identity: this.$root.state.identity,
        store_id: this.$root.state.storeId
      }, null, (data) => {
        this.tags = data.data.label
        this.loadSuccess(page, mescroll, data.data.scenic)
      }, (errorCode, error) => {
        this.$toast(error)
        this.loadError(mescroll)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.mescroll
  position fixed
  top $headerHeight * 1.2
  left 0
  right 0
  height 100%
  padding-bottom $headerHeight * 1.2
  box-sizing border-box
</style>
