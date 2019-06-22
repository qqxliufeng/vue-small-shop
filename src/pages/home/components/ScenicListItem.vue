<template>
  <div class='s-l-i-container' v-if="item" @click="itemClick">
      <div class="h-l-like-img-wrapper">
          <img v-lazy="$utils.image.getImagePath(item.scenicimages)" :key="item.scenicimages">
      </div>
      <div class="h-l-like-info-wrapper">
          <p class="title">{{item.s_title}}</p>
          <!-- <p>{{item.brief}}</p> -->
          <div class="info">
            <el-rate :value="Number(item.mark)"
                     disabled
                     show-score
                     text-color="#ff9900"
                     score-template="{value}分">
            </el-rate>
            <div class="tags">
              <span v-for="(itemTag, index) of item.tag" :key="index" class="tag">
                <el-tag size="mini" :type=" index === 0 ? 'success' : 'danger'">{{itemTag}}</el-tag>
              </span>
            </div>
          </div>
          <p class="money"><span>￥{{item.minPrice}}</span><i>起</i><span>已售{{item.totalSales}}</span></p>
      </div>
  </div>
</template>

<script>

export default {
  name: 'scenicListItem',
  props: {
    item: Object
  },
  components: {},
  data () {
    return {
    }
  },
  methods: {
    getMark (mark) {
      return Number(3.7)
    },
    itemClick () {
      this.$emit('itemClick', this.item)
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-l-i-container
    display flex
    padding rem(.2) rem(.3)
    borderBottom()
    .h-l-like-img-wrapper
        flex 1.5
        overflow hidden
        height rem(1.7)
        border-radius rem(.1)
        & img
            width 100%
            height 100%
            object-fit cover
    .h-l-like-info-wrapper
        flex 4
        padding-left .2rem
        overflow hidden
        display flex
        flex-direction column
        justify-content space-between
        .title
            ellipsis()
            textStyle(#333, .32)
        .money
            overflow hidden
            & span:nth-child(1)
                display inline-block
                normalTextStyle($primary, .35)
            & i
                display inline-block
                normalTextStyle(#cccccc, .2)
                line-height .2rem
                margin-left rem(.1)
            & span:nth-child(3)
                display inline-block
                normalTextStyle(#888888, .22)
                float right
                margin-top rem(.11rem)
        .info
            & >>> .el-rate
                height 15px
            & >>> .el-rate__icon
                font-size 14px
                margin-right 1px
            & >>> .el-rate__text
                font-size 12px
                margin-left rem(.1)
            .tags
                margin-top rem(.08)
                .tag
                    margin 0 rem(.1)
</style>
