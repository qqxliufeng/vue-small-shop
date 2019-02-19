<template>
    <div>
        <div class="p-header-container">
            <span class="iconfont p-header-back" @click="back">&#xe625;</span>
            个人中心
            <div class="p-header-notify-container" @click="message">
              <span class="iconfont">&#xe60c;</span>
              <span v-if="isShowRedNotify" class="p-header-notify-red"></span>
            </div>
        </div>
        <div class="p-content-container">
            <div class="p-info-container">
                <span class="iconfont p-info-header">&#xe65f;</span>
                <router-link :to="{ name: 'pinfo', params: { userId: 11 } }">
                  <div>
                      <div class="p-info-header-vip-container">
                          <span class="p-info-header-vip">会员</span>
                          <span>150111111111</span>
                      </div>
                      <p class="p-info-header-id">ID: 3312</p>
                  </div>
                </router-link>
            </div>
            <div class="p-order-all">
                <span>我的订单</span>
                <router-link :to="{name: 'orderList'}">
                  <span class="iconfont p-order-see-all">查看全部 &#xe64c;</span>
                </router-link>
            </div>
            <div class="p-order">
                <div class="p-order-item" v-for="(item,index) of orderItemList" :key="index">
                    <img :src="item.icon" alt="">
                    <p>{{item.title}}</p>
                </div>
            </div>
            <div class="line"></div>
            <div>
                <ul>
                    <li v-for="(item,index) of actionItemList" :key="index" class="p-action-item" @click="itemClick(index)">
                        <img :src="item.icon" alt="">
                        <span>{{item.title}}</span>
                    </li>
                </ul>
            </div>
            <div class="p-logout-wrapper">
              <button class="p-logout">退出登录</button>
            </div>
        </div>
    </div>
</template>
<script>
import imgUrl from 'images/logo.png'
export default {
  name: 'personal',
  data () {
    return {
      orderItemList: [
        {
          title: '待付款',
          icon: imgUrl
        },
        {
          title: '待使用',
          icon: imgUrl
        },
        {
          title: '待评价',
          icon: imgUrl
        },
        {
          title: '售后/退款',
          icon: imgUrl
        }
      ],
      actionItemList: [
        {
          title: '我的收藏',
          icon: imgUrl
        },
        {
          title: '我的优惠券',
          icon: imgUrl
        },
        {
          title: '留言板',
          icon: imgUrl
        },
        {
          title: '常用联系人',
          icon: imgUrl
        },
        {
          title: '个人信息',
          icon: imgUrl
        },
        {
          title: '密码修改',
          icon: imgUrl
        },
        {
          title: '联系客服',
          icon: imgUrl
        }
      ],
      isShowRedNotify: true
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    message () {
      this.$router.push({ name: 'message' })
    },
    itemClick (index) {
      switch (index) {
        case 0:
          this.$router.push({name: 'collection', params: {userId: 11}})
          break
        case 1:
          this.$router.push({name: 'coupon', params: {userId: 11}})
          break
        case 2:
          this.$router.push({name: 'leaveMessage', params: {userId: 11}})
          break
        case 3:
          this.$router.push({name: 'contacts', params: {userId: 11}})
          break
        case 4:
          this.$router.push({name: 'pinfo', params: { userId: 11 }})
          break
        case 5:
          this.$router.push({name: 'resetPassword', params: { userId: 11 }})
          break
        case 6:
          this.$router.push({name: 'customService', params: { userId: 11 }})
          break
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'message') {
      this.isShowRedNotify = false
      console.log(this)
      next()
    } else {
      next()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.p-header-container
  background-color $primary
  height $headerHeight
  line-height $headerHeight
  color #ffffff
  font-size .32rem
  text-align center
  position fixed
  top 0
  left 0
  right 0
  .p-header-back
    position absolute
    left 0
    font-size .4rem
    margin-left .3rem
  .p-header-notify-container
    display inline-block
    position absolute
    right 0
    font-size .4rem
    margin-right .3rem
    .p-header-notify-red
      display inline-block
      width .1rem
      height .1rem
      background-color red
      border-radius 50%
      position absolute
      top .24rem
      right 0
.p-content-container
  margin-top $headerHeight
  .p-info-container
    color #ffffff
    display flex
    flex-direction row
    background-color $primary
    align-items center
    height 2.5rem
    .p-info-header
      font-size 1.5rem
      margin-left .15rem
    .p-info-header-vip-container
      color #ffffff
      margin-bottom .35rem
      font-size .3rem
      .p-info-header-vip
        border .02rem solid #ffffff
        border-radius .05rem
        padding .05rem .2rem
        font-size .2rem
        line-height .4rem
        vertical-align middle
    .p-info-header-id
      font-size .2rem
      color #f5ffff
  .p-order-all
      border-bottom .01rem solid #f5f5f5
      margin .2rem
      padding .2rem 0rem
      color #333333
      .p-order-see-all
          float right
          color #888888
          font-size .25rem
  .p-order
      display flex
      justify-content center
      .p-order-item
          flex 1
          text-align center
          & img
              margin .2rem 0rem
              width .5rem
  .line
      margin .3rem 0rem
      background-color #f5f5f5
      height .15rem
  .p-action-item
      border-bottom .01rem solid #f5f5f5
      margin 0 .2rem
      padding .1rem 0
      line-height .8rem
      color #333333
      font-size .28rem
      & img
          width .5rem
          margin-right .2rem
    .p-logout-wrapper
      padding-bottom .3rem
      .p-logout
          display block
          background-color $primary
          width 70%
          height .75rem
          margin .3rem auto
          color #ffffff
          border-radius 1rem
</style>
