<template>
  <div class='bottom-friend-list-container'>
    <div class="bg"></div>
    <div class="content-wrapper">
      <div class="content">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item of users" :key="item.id">
          <div class="user-info">
            <img :src="$utils.image.getImagePath(item.avatar)">
            <span class="nick-name">{{hiddenNickName(item.username)}}</span>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    </div>
    <p class="tip">好友助力
      <span class="el-icon-circle-close close" @click="close"></span>
    </p>
  </div>
</template>

<script>

export default {
  name: 'bottomFriendList',
  props: {
    users: Array
  },
  components: {},
  data () {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          disableOnInteraction: false
        },
        direction: 'vertical'
      }
    }
  },
  methods: {
    hiddenNickName (nickName) {
      if (nickName) {
        if (nickName.length < 2) {
          return nickName
        } else {
          return nickName.substring(0, 1) + '****' + nickName.substring(nickName.length - 1, nickName.length)
        }
      } else {
        return '暂无'
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.bottom-friend-list-container
    position fixed
    right 0
    bottom $headerHeight * 2
    z-index 111
    .bg
        background-color red
        height rem(.5)
        width rem(1.8)
        border-top-left-radius rem(.25)
        border-bottom-left-radius rem(.25)
        opacity .7
    .content-wrapper
        overflow hidden
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        .content
            color #fff
            margin-left rem(.1)
            z-index 1
            line-height rem(.5)
            .user-info
                margin-top rem(-.01)
                & > img
                    width rem(.4)
                    height rem(.4)
                    line-height rem(.5)
                    border-radius 50%
                    vertical-align middle
                    background #f5f5f5
                .nick-name
                    vertical-align middle
    .tip
        text-align center
        font-style italic
        font-weight bold
        color #888
        padding-top rem(.2)
        position relative
        z-index 222
        .close
            float right
            margin-right rem(.1)
            width rem(.4)
            height rem(.4)
            font-size rem(.3)
</style>
