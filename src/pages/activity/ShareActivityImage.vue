<template>
  <div class='share-activity-image-container'>
    <navi title="分享图片" :isFixed="true"></navi>
    <div class="save-img">
      <div ref="download" :style="{'width': '100%', 'height': canvasHeight + 'px', 'position': 'relative'}">
        <!-- <img class="bg-img" id="mImage" src="http://192.168.0.111:8001/build/static/media/img-bg.png" crossOrigin="anonymous"> -->
        <img class="bg-img" id="mImage" :src="$utils.image.getImagePath(bgImage)">
        <div class="code-wrapper1">
          <canvas ref="qrcode1"></canvas>
          <p class="code-tip">长按识别二维码</p>
        </div>
      </div>
      <div class="share-message-wrapper"></div>
      <div class='share-content-container'>
        <div style="color: #FFFFFF; text-align: center; margin-top: 10%; font-size: 24px; width: 90%; margin-left: auto; margin-right: auto;">面对面助力</div>
        <div class="code-wrapper">
          <canvas ref="qrcode"></canvas>
        </div>
        <div style="color: #FFFFFF; text-align: center; margin-top: 10%; font-size: 16px; border-bottom: #CCCCCC solid 1px; width: 90%; margin-left: auto; margin-right: auto; padding-bottom: 5%;">让好友用微信扫上方二维码助力</div>
        <div style="color: #FFFFFF; text-align: center; margin-top: 10%; font-size: 24px; width: 90%; margin-left: auto; margin-right: auto; padding-bottom: 5%;">您还可以</div>
        <div style="color: #FFFFFF; text-align: center; font-size: 14px; width: 90%; margin-left: auto; margin-right: auto; padding-bottom: 5%;">1.点击保存图片</div>
        <div style="color: #FFFFFF; text-align: center; font-size: 14px; width: 90%; margin-left: auto; margin-right: auto; padding-bottom: 5%;">2.发送给好友完成助力</div>
        <span class="save-button" @click="saveImage" id="saveImage">邀请好友助力</span>
        <el-dialog :visible.sync="showDialog" width="90%" :modal="false" title="长按保存图片到手机" center>
            <div class="share-img-post-wrapper">
              <img :src="postUrl">
              <p class="tip">1、长按图片保存到系统相册</p>
              <p class="tip">2、转发给微信好友</p>
            </div>
        </el-dialog>
        <div class="v-modal" v-show="showDialog"></div>
      </div>
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
      showDialog: false,
      postUrl: '',
      shareUrl: '',
      bgImage: '',
      canvasHeight: 100
    }
  },
  methods: {
    createCode () {
      QRCode.toCanvas(this.$refs['qrcode'], this.shareUrl, error => {
        console.log(error)
      })
      QRCode.toCanvas(this.$refs['qrcode1'], this.shareUrl, error => {
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
        i: this.$route.query.i,
        t: this.$route.query.t,
        s: this.$route.query.s,
        p: this.$route.query.p,
        uid: this.$route.query.uid,
        g: this.$route.query.g
      }, '', (res) => {
        this.shareUrl = res.data.url
        this.bgImage = res.data.share_image
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
    padding-top $headerHeight
    & >>> .el-dialog__body
        padding 0
    & >>> .el-dialog__header
        padding rem(.15)
    & >>> .el-dialog__headerbtn
        top 7px
    .save-img
        min-height 95vh
        position relative
        .share-message-wrapper
            position absolute
            top 0
            bottom 0
            left 0
            right 0
            background-color #000
            opacity .8
            z-index 1
        .bg-img
            width 100%
            height 100%
        .code-wrapper1
            text-align center
            position absolute
            bottom 1%
            right 1%
            z-index 1
            & > canvas
                display inline-block
                width rem(1.5) !important
                height rem(1.5) !important
            .code-tip
                margin-top rem(.1)
                textStyle(#f00, .23)
        .share-content-container
            border-radius rem(.08)
            padding rem(.2)
            position absolute
            top 0
            right 0
            bottom 0
            left 0
            z-index 2
            .title
                text-indent rem(.4)
                line-height rem(.5)
                textStyle(#333, .35)
            .code-wrapper
                text-align center
                margin-top 10%
                & > canvas
                    display inline-block
                    width rem(2.5) !important
                    height rem(2.5) !important
                .code-tip
                    textStyle(#888, .25)
                .code-tip
                    margin-top rem(.1)
                    textStyle(#f00, .25)
            .save-button
                text-align center
                color #fff
                background-color $orangeColor
                line-height $headerHeight * 0.8
                border-radius rem(.5)
                display block
                width 70%
                margin rem(.3) auto
                font-size rem(.3)
                position fixed
                top 78%
                left 0
                right 0
                z-index 100
            .my-canvas
                background-color #f00
                width 100% !important
            .share-img-post-wrapper
                width 100%
                & img
                    width 100%
                    height 100%
                .tip
                    textStyle($orangeColor, .3)
                    padding rem(.2)
</style>
