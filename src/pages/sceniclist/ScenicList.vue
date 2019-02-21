<template>
    <div id="scenicListContainer">
      <scenic-header></scenic-header>
      <div class="s-l-content-wrapper">
        <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
          <scenic-type></scenic-type>
          <ul>
              <li v-for="(item, index) of scenicList" :key="index">
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
export default {
  name: 'scenicList',
  components: {
    ScenicHeader,
    ScenicType,
    MescrollVue,
    ScenicListItem
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('scenicListContainer', this.upCallBack),
      scenicList: []
    }
  },
  methods: {
    upCallBack (page, mescroll) {
      setTimeout(() => {
        this.scenicList.push({
          name: '卧虎山滑雪场'
        })
        this.scenicList.push({
          name: '卧虎山滑雪场'
        })
        this.scenicList.push({
          name: '卧虎山滑雪场'
        })
        this.scenicList.push({
          name: '卧虎山滑雪场'
        })
        if (page.num > 4) {
          mescroll.endSuccess(0)
        } else {
          mescroll.endSuccess(10)
        }
      }, 1000)
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
