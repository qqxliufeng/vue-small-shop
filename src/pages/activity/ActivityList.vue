<template>
  <div class='activity-list-container'>
    <navi title="活动列表" :isFixed="true"></navi>
    <div>
      <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
        <ul>
          <li>
            asdf
          </li>
          <li>
            asdf
          </li>
          <li>
            asdf
          </li>
          <li>
            asdf
          </li>
          <li>
            asdf
          </li>
        </ul>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'activityList',
  mixins: [listMixin],
  components: {
    navi,
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('actvity_list', this.upCallBack),
      list: []
    }
  },
  methods: {
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.assistList, {
        identity: this.$root.state.getSallerInfo().identity,
        store_id: this.$root.state.getSallerInfo().storeId,
        page: page.num
      }, '', (data) => {
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.loadError(mescroll)
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.activity-list-container
    .mescroll
        mescroller()
        top $headerHeight
</style>
