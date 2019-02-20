<template>
    <div>
        <navi :title="title" :isFixed="true"></navi>
        <el-tabs :value="mSelected" @tab-click="handleClick" class="c-tabs" :stretch="true">
            <el-tab-pane name="scenicInfoForIntro" label="景区介绍" class="c-tabs-item">
                <div class="s-i-content" v-for="(item, index) of testData" :key="index">this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入this洒月收入</div>
            </el-tab-pane>
            <el-tab-pane name="scenicInfoForOrderNotify" label="预定须知" class="c-tabs-item">2</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
export default {
  name: 'ScenicInfo',
  props: {
    selected: String,
    default: 'scenicInfoForIntro'
  },
  data () {
    return {
      mSelected: this.selected ? this.selected : 'scenicInfoForIntro',
      testData: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
      ]
    }
  },
  computed: {
    title () {
      return this.mSelected === 'scenicInfoForIntro' ? '景区介绍' : '预定须知'
    }
  },
  components: {
    navi
  },
  methods: {
    handleClick (tab, event) {
      this.mSelected = tab.name
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.c-tabs
    tabsFixed()
    & >>> .el-tabs__item
        background-color #fff
    .c-tabs-item
        position fixed
        top $headerHeight * 2
        left 0
        right 0
        height 100%
        padding-bottom $headerHeight * 2
        box-sizing border-box
        overflow-y scroll
        .s-i-content
            padding rem(.2)
            normalTextStyle(#333, .35)
</style>
