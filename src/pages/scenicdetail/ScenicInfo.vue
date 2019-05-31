<template>
    <div>
        <navi :title="title" :isFixed="true"></navi>
        <el-tabs :value="mSelected" @tab-click="handleClick" class="c-tabs" :stretch="true" v-if="info">
            <el-tab-pane name="scenicInfoForIntro" label="景区介绍" class="c-tabs-item">
                <div class="s-i-content" v-html="content" ref="content"></div>
            </el-tab-pane>
            <el-tab-pane name="scenicInfoForOrderNotify" label="使用须知" class="c-tabs-item">
                <div v-for="(item, index) of remarks" :key="index" class="info-wrapper">
                  <p class="s-i-info-title">{{item.title}}</p>
                  <p v-if="showLine(item)" class="s-i-info-line">{{item.value}}</p>
                  <div v-else>
                    <div v-if="images && item.title === '景区图片'">
                      <img class="image" v-lazy="$utils.image.getImagePath(it)" v-for="(it, imageIndex) of images" :key="imageIndex"/>
                    </div>
                    <el-tag size="mini" v-else class="tag" v-for="(it, tagIndex) of tags" :key="tagIndex">{{it}}</el-tag>
                  </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
import TicketRemark from 'common/components/ticket-remark'
export default {
  name: 'ScenicInfo',
  props: {
    selected: {
      type: String,
      default: 'scenicInfoForIntro'
    }
  },
  data () {
    return {
      mSelected: this.selected ? this.selected : 'scenicInfoForIntro',
      info: null,
      content: null,
      remarks: null,
      images: null,
      tags: null
    }
  },
  computed: {
    title () {
      return this.mSelected === 'scenicInfoForIntro' ? '景区介绍' : '预定须知'
    }
  },
  components: {
    navi,
    TicketRemark
  },
  watch: {
    info (newVal, oldVal) {
      if (newVal instanceof Array) {
        this.remarks = []
        newVal.forEach(item => {
          if (item.title === '景区介绍') {
            this.content = item.value
          } else if (item.title === '景区标签') {
            this.tags = item.value
            this.remarks.push(item)
          } else if (item.title === '景区图片') {
            this.images = item.value
            this.remarks.push(item)
          } else {
            this.remarks.push(item)
          }
        })
      }
    }
  },
  methods: {
    showLine (item) {
      return typeof (item.value) === 'string'
    },
    handleClick (tab, event) {
      this.mSelected = tab.name
    },
    getData () {
      this.$http(this.$urlPath.scenicNotesUrl, {
        s_id: this.$route.query.id
      }, '', (data) => {
        this.info = data.data
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  mounted () {
    this.getData()
  },
  updated () {
    let array = document.getElementsByTagName('a')
    for (let i = 0; i < array.length; i++) {
      let a = array[i]
      a.removeAttribute('href')
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
            & >>> img
                width 100%
                margin-top rem(.1)
                object-fit cover
            & >>> p span
                color #333 !important
                font-size rem(.28) !important
            & >>> p a
                color #333 !important
                font-size rem(.28) !important
    .info-wrapper
        padding rem(.2)
        .s-i-info-title
            padding rem(.1)
            textStyle(#333, .3)
        .s-i-info-line
            padding rem(.1)
            textStyle(#888, .28)
        .image
            width 100%
            float left
            margin rem(.1) 0
        .tag
            margin rem(.1)
</style>
