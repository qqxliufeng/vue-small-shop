<template>
  <div class='share-content-container'>
    <div class="code-wrapper" ref="download">
      <p class="title">我正在优待客参加低价购买票的活动，快来帮我助力吧！</p>
      <canvas ref="qrcode"></canvas>
      <p class="code-tip">扫描上方二维码完成注册即可自动为好友助力哦</p>
    </div>
    <span class="save-button" @click="saveImage">保存图片</span>
    <el-dialog :visible.sync="showDialog" width="90%" :modal="false" title="长按保存图片到手机" center>
        <div class="share-img-post-wrapper">
          <img :src="postUrl">
        </div>
    </el-dialog>
    <div class="v-modal" v-show="showDialog"></div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'
export default {
  name: 'shareContent',
  components: {},
  data () {
    return {
      showDialog: false,
      postUrl: ''
    }
  },
  methods: {
    createCode () {
      QRCode.toCanvas(this.$refs['qrcode'], this.$urlPath.shareActivityUrl(this.$route.query.aid, this.$route.query.uid, this.$root.state.getSallerInfo().identity, this.$root.state.getSallerInfo().storeId), error => {
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
    }
  },
  mounted () {
    console.log(this.$urlPath.shareActivityUrl(this.$route.query.aid, this.$route.query.uid, this.$root.state.getSallerInfo().identity, this.$root.state.getSallerInfo().storeId))
    this.createCode()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.share-content-container
    margin rem(.5)
    background-color #fff
    border-radius rem(.08)
    padding rem(.2)
    .title
        text-indent rem(.4)
        line-height rem(.5)
        textStyle(#333, .35)
    .code-wrapper
        text-align center
        padding-top rem(.3)
        padding-bottom rem(.3)
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
