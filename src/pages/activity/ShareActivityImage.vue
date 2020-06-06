<template>
  <div>
    <navi title="等级特权" :isFixed="true"></navi>
    <div class='share-activity-image-container bg-black'>
      <div class="flex justify-start info-wrapper padding">
        <img class="avatar" :src="avatar"/>
        <div class="flex flex-direction justify-between margin-left-sm">
          <div class="text-white text-df">{{nickname}}</div>
          <div class="level-wrapper text-yellow text-sm margin-top-sm">{{levelTip}}</div>
        </div>
      </div>
      <div class="padding">
        <div class="bg-yellow light card-wrapper padding">
          <div class="text-black text-bold flex justify-center align-center margin-bottom-sm">
            <img src="../../assets/images/img_icon_line_1.png" class="flex-sub" style="height: 2px; transform: rotate(180deg)"/>
            <span>升级进度</span>
            <img src="../../assets/images/img_icon_line_1.png" class="flex-sub" style="height: 2px;"/>
          </div>
          <div class="flex justify-between" v-if="level === 1">
            <span class="text-bold text-black align-center">黄金会员</span>
            <span class="text-black text-sm">{{goldFriends === -1 ? '已完成' : (goldFriends + '人/目标' + upgradeRule.goldMemberNum + '人')}}</span>
          </div>
          <div class="margin-top" v-if="level === 1">
            <el-progress :stroke-width="10" color="#f56c6c" :percentage="goldStyle.width"></el-progress>
          </div>
          <div class="flex justify-between margin-top" v-if="level === 2">
            <span class="text-bold text-black align-center">白金会员</span>
            <span class="text-black text-sm">{{platinumFriends === -1 ? '已完成' : (platinumFriends + '人/目标' + upgradeRule.platinumMemberNum + '人')}}</span>
          </div>
          <div class="margin-top" v-if="level === 2">
            <el-progress :stroke-width="10" color="#f56c6c" :percentage="platinumStyle.width"></el-progress>
          </div>
        </div>
      </div>
      <div class="text-yellow flex justify-center align-center">
        <span class="cuIcon-notificationfill"></span>
        <span style="margin-left: 2px;" v-if="level === 1">普通会员邀请{{upgradeRule.goldMemberNum}}名好友，升级成黄金会员</span>
        <span style="margin-left: 2px;" v-if="level === 2">黄金会员邀请{{upgradeRule.platinumMemberNum}}名好友，升级成白金会员</span>
      </div>
      <div class="bg-black-2 margin padding-sm">
        <div>
          <div class="text-yellow text-lg text-center">
            当前特权
          </div>
          <div class="flex justify-around padding-top-sm">
            <div class="flex flex-direction align-center">
              <span class="cuIcon-ticket text-yellow icon-item" style="transform: rotate(45deg);"></span>
              <span class="text-lg">优惠券</span>
              <span class="text-sm text-gray margin-top">下单可选优惠券</span>
            </div>
            <div class="flex flex-direction align-center">
              <span class="cuIcon-refund text-yellow icon-item"></span>
              <span class="text-lg">返现</span>
              <span class="text-sm text-gray margin-top">下单可选优惠券</span>
            </div>
          </div>
        </div>
        <div v-if="level === 1">
          <div class="text-yellow text-lg margin-top text-center">
            黄金特权
          </div>
          <div class="flex justify-around padding-top-sm">
            <div class="flex flex-direction align-center">
              <span class="cuIcon-ticket text-yellow icon-item" style="transform: rotate(45deg);"></span>
              <span class="text-lg">优惠券</span>
              <span class="text-sm text-gray margin-top">下单可选优惠券</span>
            </div>
            <div class="flex flex-direction align-center">
              <span class="cuIcon-refund text-yellow icon-item"></span>
              <span class="text-lg">返现</span>
              <span class="text-sm text-gray margin-top">下单可选优惠券</span>
            </div>
          </div>
        </div>
        <div v-if="level === 2">
          <div class="text-yellow text-lg margin-top text-center">
            白金特权
          </div>
          <div class="flex justify-around padding-top-sm">
            <div class="flex flex-direction align-center">
              <span class="cuIcon-ticket text-yellow icon-item" style="transform: rotate(45deg);"></span>
              <span class="text-lg">优惠券</span>
              <span class="text-sm text-gray margin-top">下单可选优惠券</span>
            </div>
            <div class="flex flex-direction align-center">
              <span class="cuIcon-refund text-yellow icon-item"></span>
              <span class="text-lg">返现</span>
              <span class="text-sm text-gray margin-top">下单可选优惠券</span>
            </div>
          </div>
        </div>
      </div>
      <div style="color: #FFFFFF; text-align: center; margin-top: 5%; font-size: 30px; width: 90%; margin-left: auto; margin-right: auto;">面对面邀请好友</div>
      <div class="code-wrapper">
        <canvas class="canvas-code" ref="qrcode"></canvas>
      </div>
      <div style="color: #FFFFFF; text-align: center; margin-top: 5%; font-size: 16px; width: 90%; margin-left: auto; margin-right: auto; padding-bottom: 10px;">让好友用微信扫上方二维码注册</div>
      </div>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'
export default {
  name: 'shareActivityImage',
  components: {
    navi
  },
  data () {
    return {
      shareUrl: '',
      goldStyle: {
        width: 0
      },
      platinumStyle: {
        width: 0
      },
      friendNum: 0,
      goldFriends: 0,
      platinumFriends: 0,
      upgradeRule: {
        goldMemberNum: 0,
        platinumMemberNum: 0
      },
      level: Number(this.$root.userInfo.state.level)
    }
  },
  computed: {
    avatar () {
      return this.$utils.image.getImagePath(this.$root.userInfo.state.avatar)
    },
    nickname () {
      return this.$root.userInfo.state.name || this.$root.userInfo.state.phone || ''
    },
    levelTip () {
      switch (this.level) {
        case 1:
          return '普通'
        case 2:
          return '黄金'
        case 3:
          return '白金'
      }
    }
  },
  methods: {
    createCode () {
      QRCode.toCanvas(this.$refs['qrcode'], this.shareUrl, error => {
        console.log(error)
      })
    },
    saveImage () {
      setTimeout(() => {
        html2canvas(this.$refs.download, {
          backgroundColor: '#f5f5f5',
          useCORS: true,
          logging: true,
          dpi: window.devicePixelRatio
        }).then((canvas) => {
          this.showDialog = true
          let dataUrl = canvas.toDataURL('image/png')
          this.postUrl = dataUrl
        })
      }, 100)
    },
    getData () {
      this.$http(this.$urlPath.getWxQrCode, {
        isWeiXin: this.$isWeiXin ? 1 : 0
      }, '', (res) => {
        this.shareUrl = res.data.wexin_url || res.data.url
        this.friendNum = res.data.friend_num
        this.upgradeRule.goldMemberNum = res.data.upgrade_rule.gold_member_num
        this.upgradeRule.platinumMemberNum = res.data.upgrade_rule.platinum_member_num
        if (this.friendNum >= this.upgradeRule.goldMemberNum + this.upgradeRule.platinumMemberNum) {
          this.goldStyle.width = 100
          this.platinumStyle.width = 100
          this.goldFriends = -1
          this.platinumFriends = -1
        } else {
          if (this.friendNum >= this.upgradeRule.goldMemberNum) {
            this.goldStyle.width = 100
            this.goldFriends = this.upgradeRule.goldMemberNum
            this.platinumStyle.width = ((this.friendNum - this.upgradeRule.goldMemberNum) / this.upgradeRule.platinumMemberNum).toFixed(1) * 100
            this.platinumFriends = this.friendNum - this.upgradeRule.goldMemberNum
          } else {
            this.platinumStyle.width = 0
            this.goldFriends = this.friendNum
            this.goldStyle.width = (this.friendNum / this.upgradeRule.goldMemberNum).toFixed(1) * 100
            this.platinumFriends = 0
          }
        }
        this.createCode()
      }, () => {})
    },
    getImage (url, imgId) {
      const xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'blob'
      xhr.setRequestHeader()
      xhr.onload = () => {
        console.log('object')
        document.getElementById(imgId).src = URL.createObjectURL(this.response)
      }
      xhr.send(null)
    }
  },
  mounted () {
    this.getData()
    const screenWidth = window.screen.width
    this.canvasHeight = screenWidth / 0.88
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.share-activity-image-container
    min-height 100vh
    padding-bottom 20px
    .info-wrapper
      margin-top $headerHeight
      .avatar
        width 50px
        height 50px
        border-radius 50%
      .level-wrapper
        border 1px solid #fbbd08
        border-radius 5px
        padding 2px 10px
        width 50px
        text-align center
    .card-wrapper
      border-radius 5px
    .title
      text-indent rem(.4)
      line-height rem(.5)
      textStyle(#333, .35)
    .code-wrapper
      text-align center
      margin 0 auto
      margin-top rem(.5)
      padding rem(.2)
      background-color #FFFFFF
      width rem(2.3)
      height rem(2.3)
      display flex
      justify-content center
      align-items center
      .canvas-code
        width 140px !important
        height 140px !important
    .info-wrapper
      position relative
      z-index 10
      .button-wrapper
        position absolute
        top 90%
        left 0
        right 0
        z-index 10
    .share_step
      baseTextStyle(#666)
      text-align left
    .bg-black-2
      background-color #555555
      border-radius 5px
      .icon-item
        font-size 30px
// .share-activity-image-container
//     padding-top $headerHeight
//     & >>> .el-dialog__body
//         padding 0
//     & >>> .el-dialog__header
//         padding rem(.15)
//     & >>> .el-dialog__headerbtn
//         top 7px
//     .save-img
//         min-height 95vh
//         position relative
//         .share-message-wrapper
//             position absolute
//             top 0
//             bottom 0
//             left 0
//             right 0
//             background-color #000
//             opacity .8
//             z-index 1
//         .bg-img
//             width 100%
//             height 100%
//         .code-wrapper1
//             text-align center
//             position absolute
//             bottom 1%
//             right 1%
//             z-index 1
//             & > canvas
//                 display inline-block
//                 width rem(1.5) !important
//                 height rem(1.5) !important
//             .code-tip
//                 margin-top rem(.1)
//                 textStyle(#f00, .23)
//         .share-content-container
//             border-radius rem(.08)
//             padding rem(.2)
//             position absolute
//             top 0
//             right 0
//             bottom 0
//             left 0
//             z-index 2
//             .title
//                 text-indent rem(.4)
//                 line-height rem(.5)
//                 textStyle(#333, .35)
//             .code-wrapper
//                 text-align center
//                 margin-top 10%
//                 & > canvas
//                     display inline-block
//                     width rem(2.5) !important
//                     height rem(2.5) !important
//                 .code-tip
//                     textStyle(#888, .25)
//                 .code-tip
//                     margin-top rem(.1)
//                     textStyle(#f00, .25)
//             .save-button
//                 text-align center
//                 color #fff
//                 background-color $orangeColor
//                 line-height $headerHeight * 0.8
//                 border-radius rem(.5)
//                 display block
//                 width 70%
//                 margin rem(.3) auto
//                 font-size rem(.3)
//                 position fixed
//                 top 78%
//                 left 0
//                 right 0
//                 z-index 100
//             .my-canvas
//                 background-color #f00
//                 width 100% !important
//             .share-img-post-wrapper
//                 width 100%
//                 & img
//                     width 100%
//                     height 100%
//                 .tip
//                     textStyle($orangeColor, .3)
//                     padding rem(.2)
</style>
