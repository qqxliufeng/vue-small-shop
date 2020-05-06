<template>
    <div style="background-color: #f5f5f5;">
        <div class="p-header-container">
            个人中心
            <div class="p-header-notify-container" @click="message">
              <span class="iconfont">&#xe60c;</span>
            </div>
        </div>
        <div class="p-content-container" @scroll="divScroll" ref="pContent">
          <router-link :to="{ name: 'pinfo' }">
            <div class="p-info-container">
                <img class="p-info-header" :src="avatar"/>
                  <div>
                      <div class="p-info-header-vip-container">
                          <span class="p-info-header-vip">会员</span>
                          <span>{{$utils.validator.isPhone(userPhone) ? $utils.common.hiddenMobile(userPhone) : userPhone}}</span>
                      </div>
                      <p class="p-info-header-id">ID: {{this.$root.userInfo.state.id}}</p>
                  </div>
            </div>
          </router-link>
        </div>
        <div class="p-order padding-bottom">
          <div class="p-order-item" v-for="(item,index) of orderItemList" :key="index">
            <el-badge :value="item.badage" class="item" :hidden="item.badage <= 0" @click.native="orderItemClick(index)">
              <img :src="item.icon" alt="" style="width: .4rem; height: .4rem">
              <p>{{item.title}}</p>
            </el-badge>
          </div>
      </div>
      <div style="padding-top: 5px; padding-bottom: 15px">
        <div style="margin: 10px; border-radius: 5px;" class="bg-white">
          <div class="padding-sm text-black text-df" v-if="myWallet.title">{{myWallet.title}}</div>
          <div class="flex padding-sm p-action-item">
            <div class="flex-sub flex flex-direction justify-center align-center" v-for="(item, index) of myWallet.items" :key="index" @click="itemClick(item)">
              <img :src="item.icon" class="item-image-wrapper" />
              <span style="color: #666666">{{item.title}}</span>
            </div>
          </div>
        </div>
        <div style="margin: 10px; border-radius: 5px;" class="bg-white">
          <div class="padding-sm text-black text-df" v-if="myServices.title">{{myServices.title}}</div>
          <div class="flex padding-sm p-action-item">
            <div class="flex-sub flex flex-direction justify-center align-center" v-for="(item, index) of myServices.items" :key="index" @click="itemClick(item)">
              <img :src="item.icon" class="item-image-wrapper" />
              <span style="color: #666666">{{item.title}}</span>
            </div>
          </div>
        </div>
        <div style="margin: 10px; border-radius: 5px;" class="bg-white">
          <div class="padding-sm text-black text-df" v-if="mySettings.title">{{mySettings.title}}</div>
          <div class="flex padding-sm p-action-item">
            <div class="flex-sub flex flex-direction justify-center align-center" v-for="(item, index) of mySettings.items" :key="index" @click="itemClick(item)">
              <img :src="item.icon" class="item-image-wrapper" />
              <span style="color: #666666">{{item.title}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import img01 from 'images/img_order_01.png'
import img02 from 'images/img_order_02.png'
import img03 from 'images/img_order_03.png'
import img04 from 'images/img_order_04.png'

import img05 from 'images/img_personal_01.png'
import img06 from 'images/img_personal_02.png'
import img07 from 'images/img_personal_03.png'
import img08 from 'images/img_personal_04.png'
import img09 from 'images/img_personal_05.png'
import img10 from 'images/img_personal_06.png'
import img11 from 'images/img_personal_07.png'
import img12 from 'images/img_personal_08.png'
import img13 from 'images/img_personal_09.png'
import ConfirmDialog from 'common/components/confirm-dialog'
export default {
  name: 'personal',
  components: {
    ConfirmDialog
  },
  data () {
    return {
      orderItemList: [
        {
          title: '待付款',
          icon: img02,
          badage: 0,
          index: 'waitingPayItem'
        },
        {
          title: '待使用',
          icon: img03,
          badage: 0,
          index: 'waitingUseItem'
        },
        {
          title: '待评价',
          icon: img04,
          badage: 0,
          index: 'waitingCommentItem'
        },
        {
          title: '售后/退款',
          icon: img01,
          badage: 0,
          index: 'afterServiceItem'
        }
      ],
      myWallet: {
        title: '我的卡券',
        items: [
          {
            title: '我的钱包',
            icon: img10,
            showSub: true,
            click: () => {
              this.$router.push({name: 'mywallet'})
            }
          },
          {
            title: '我的年卡',
            icon: img11,
            click: () => {
              this.$toast('功能开发中…')
            }
          },
          {
            title: '我的优惠券',
            icon: img06,
            click: () => {
              this.$router.push({name: 'coupon'})
            }
          }
        ]
      },
      myServices: {
        title: '常用功能',
        items: [
          {
            title: '我的收藏',
            icon: img05,
            click: () => {
              this.$router.push({name: 'collection'})
            }
          },
          {
            title: '留言板',
            icon: img07,
            click: () => {
              this.$router.push({name: 'leaveMessage'})
            }
          },
          {
            title: '联系人',
            icon: img08,
            click: () => {
              this.$router.push({name: 'contacts', query: {mode: 'edit'}})
            }
          }
          // {
          //   title: '地址管理',
          //   icon: '../../static/img_icon_address_manager.png',
          //   click() {}
          // }
        ]
      },
      mySettings: {
        title: '更多功能',
        items: [
          {
            title: '个人信息',
            icon: img09,
            click: () => {
              this.$router.push({name: 'pinfo'})
            }
          },
          {
            title: '好友列表',
            icon: img12,
            click: () => {
              this.$router.push({name: 'myFriendList'})
            }
          },
          {
            title: '意见反馈',
            icon: img13,
            click: () => {}
          }
        ]
      },
      isShowRedNotify: true,
      contentDivScroll: 0
    }
  },
  computed: {
    userPhone () {
      return this.$root.userInfo.state.name || this.$root.userInfo.state.phone
    },
    avatar () {
      return this.$utils.image.getImagePath(this.$root.userInfo.state.avatar)
    },
    tempActionItemList () {
      return this.actionItemList.filter((item) => {
        return item.show
      })
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    allOrder () {
      this.$router.push({name: 'orderAllList', query: {index: 'allItem'}})
    },
    message () {
      this.$router.push({ name: 'message' })
    },
    orderItemClick (orderItemIndex) {
      this.orderItemList[orderItemIndex].badage = 0
      this.$router.push({name: 'orderList', query: {index: this.orderItemList[orderItemIndex].index}})
    },
    getData () {
      this.$http(this.$urlPath.orderStatusNum, {}, null, (data) => {
        this.orderItemList[0].badage = data.data.pay_count
        this.orderItemList[1].badage = data.data.use_count
        this.orderItemList[2].badage = data.data.comment_count
        this.orderItemList[3].badage = data.data.refund_count
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    itemClick (item) {
      item.click()
    },
    divScroll (div) {
      if (div) {
        this.contentDivScroll = div.target.scrollTop
      }
    },
    logout () {
      this.$refs.confirmDialog.showDialog()
    },
    confirmLogout () {
      new Promise((resolve, reject) => {
        this.$root.userInfo.clearInfoAction()
        resolve()
      }).then(() => {
        this.$root.$emit('changeTab', {index: '1'})
        this.$router.replace({path: '/index/' + this.$root.state.getSallerInfo().identity + '/' + this.$root.state.getSallerInfo().storeId})
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'message') {
      this.isShowRedNotify = false
    }
    next()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$root.$emit('changeTab', {index: '4'})
    })
  },
  activated () {
    this.$refs.pContent.scrollTop = this.contentDivScroll
  },
  mounted () {
    this.$root.$on('onGetBadge', this.getData)
    this.getData()
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
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
  z-index 999
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
      width rem(1)
      height rem(1)
      border-radius 50%
      padding rem(.2)
      object-fit cover
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
      font-size .28rem
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
    margin 0 10px
    background-color white
    border-radius 5px
    margin-top -10px
    padding-top 10px
    .p-order-item
        flex 1
        text-align center
        & img
            margin .2rem 0rem
            width .8rem
            height .8rem
        & >>> .el-badge__content
            margin-top rem(.2)
            margin-right rem(.1)
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
    .p-logout-wrapper
      padding-bottom 1rem
      .p-logout
          height .75rem
          margin .3rem auto
          color $primary
          text-align center
          line-height .75rem
          border-top 1px solid #f5f5f5
          border-bottom 1px solid #f5f5f5
</style>
