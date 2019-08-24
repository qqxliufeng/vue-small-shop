<template>
  <div class='activity-ticket-bottom-container'>
    <div class="wrapper-1">
      <div class="collection-wrapper" @click="collection" v-if="isShow">
        <p :class="[collectionState ===  1 ? 'el-icon-star-on' : 'el-icon-star-off']"></p>
        <p>收藏</p>
      </div>
    </div>
    <div class="wrapper-2" @click="seeOtherGoods">查看其它商品</div>
    <div class="wrapper-3" @click="invoteFriend" v-if="isShow">{{ buttonName }}</div>
  </div>
</template>

<script>

export default {
  name: '',
  props: {
    assist: Object,
    isFavorites: Number,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      collectionState: this.isFavorites
    }
  },
  watch: {
    isFavorites (newVal, oldVal) {
      this.collectionState = newVal
    }
  },
  computed: {
    buttonName () {
      if (this.$root.userInfo.isLogin()) {
        if (this.assist && this.assist.join.status === 1) {
          return '立即购买'
        } else {
          return '邀请好友'
        }
      } else {
        return '邀请好友'
      }
    }
  },
  methods: {
    collection () {
      this.$emit('collection')
    },
    seeOtherGoods () {
      this.$emit('seeOtherGoods')
    },
    invoteFriend () {
      this.$emit('invoteFriend')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.activity-ticket-bottom-container
    display flex
    position fixed
    bottom 0
    left 0
    right 0
    height $headerHeight
    .wrapper-1
        flex 2
        background-color #ffffff
        border-top #f5f5f5 solid 1px
        .collection-wrapper
            display flex
            padding 0 rem(.3)
            width rem(.8)
            text-align center
            flex-direction column
            justify-content center
            height 100%
            & p:nth-child(1)
                textStyle($orangeColor, .35)
            & p:nth-child(2)
                margin-top rem(.1)
                textStyle(#FFAD2C, .25)
    .wrapper-2
        flex 1
        background-color #ff5353
        text-align center
        line-height $headerHeight
        color #fff
        font-size rem(.25)
    .wrapper-3
        flex 1
        background-color $orangeColor
        text-align center
        line-height $headerHeight
        color #fff
        font-size rem(.25)
</style>
