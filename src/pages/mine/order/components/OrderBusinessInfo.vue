<template>
  <div class="o-i-info-shop-info">
      <div class="o-i-info-shop-info-img-wrapper">
          <img v-lazy="$utils.image.getImagePath(store.avatar)">
      </div>
      <div class="o-i-info-shop-info-name-wrapper">
          <p class="o-i-info-shop-info-name">
              <span>商家名称：{{store.store_name  || '暂无'}}</span>
          </p>
          <p class="o-i-info-shop-info-phone">
              <span>联系方式：{{store.linkman_phone || '暂无'}}</span>
          </p>
      </div>
      <a class="el-icon-phone-outline phone" :href=" 'tel:' + store.linkman_phone"></a>
  </div>
</template>

<script>

export default {
  name: '',
  props: {
    store: Object
  },
  components: {},
  data () {
    return {
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-info-shop-info
    position relative
    display flex
    padding .2rem
    border-top rem(.1) solid #f5f5f5
    border-bottom rem(.1) solid #f5f5f5
    .o-i-info-shop-info-img-wrapper
        overflow hidden
        height 1rem
        & img
            width rem(1)
            height rem(1)
            border-radius 50%
            object-fit cover
    .o-i-info-shop-info-name-wrapper
        display flex
        flex-direction column
        justify-content space-around
        flex 5
        margin-left .1rem
        color #888888
        overflow hidden
        .o-i-info-shop-info-name
            line-height .5rem
            ellipsis()
    .phone
        border-radius 50%
        border 1px solid $primary
        display inline-block
        width rem(.7)
        height rem(.7)
        line-height rem(.7)
        text-align center
        position absolute
        top 30%
        color $primary
        font-size rem(.5)
        right rem(.3)
</style>
