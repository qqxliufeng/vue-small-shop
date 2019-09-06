<template>
  <div class='share-activity-image-container'>
    <navi title="分享图片" :isFixed="true"></navi>
    <div ref="download" class="save-img">
      <img :src="$utils.image.getImagePath(bgImage)" class="bg-img">
      <div class="share-message-wrapper"></div>
      <div class='share-content-container'>
        <div class="code-wrapper">
          <canvas ref="qrcode"></canvas>
        </div>
        <span class="save-button" @click="saveImage" id="saveImage">保存图片</span>
        <el-dialog :visible.sync="showDialog" width="90%" :modal="false" title="长按保存图片到手机" center>
            <div class="share-img-post-wrapper">
              <img :src="postUrl">
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
      bgImage: ''
    }
  },
  watch: {
    showDialog (newValue, oldValue) {
      if (newValue) {
        document.getElementById('saveImage').style.display = 'none'
      } else {
        document.getElementById('saveImage').style.display = 'block'
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
      document.getElementById('saveImage').style.display = 'none'
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
        this.saveImage()
      }, () => {})
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.share-activity-image-container
    padding-top $headerHeight
    .share-message-wrapper
        height rem(2)
    .save-img
        min-height 95vh
        position relative
        .bg-img
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            width 100%
            height 100%
        .share-content-container
            margin rem(.5)
            border-radius rem(.08)
            padding rem(.2)
            position relative
            z-index 1
            .title
                text-indent rem(.4)
                line-height rem(.5)
                textStyle(#333, .35)
            .code-wrapper
                text-align center
                margin-top rem(3)
                & > canvas
                    display inline-block
                    width rem(3)
                    height rem(3)
                .code-tip
                    textStyle(#888, .25)
            .save-button
                text-align center
                color #fff
                background-color $orangeColor
                line-height $headerHeight
                border-radius rem(.5)
                display block
                width 70%
                margin rem(.3) auto
                font-size rem(.3)
            .share-img-post-wrapper
                width 100%
                & img
                    width 100%
                    height 100%
                    object-fit cover
</style>
