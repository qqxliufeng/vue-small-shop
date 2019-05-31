<template>
  <div class='o-i-content-container'>
    <p class="scenic-title">红叶谷景区</p>
    <div class="sperator"></div>
    <p class="item-info">成人票 X6</p>
    <p class="item-info">成人票 X6</p>
    <p class="item-info">成人票 X6</p>
    <p class="item-info">入园凭证：</p>
    <div class="ticket-info-container">
      <div class="code-wrapper">
        <canvas class="canvas-code" ref="qrcode"></canvas>
        <p class="code-text">12345678</p>
      </div>
      <div class="sperator-2"></div>
      <div class="info-count-wrapper">
        <span class="info-count-item">待消费：2张</span>
        <span class="info-count-item">待消费：2张</span>
        <span class="info-count-item">待消费：2张</span>
      </div>
    </div>
    <div class="sperator-3"></div>
  </div>
</template>
<script>
import QRCode from 'qrcode'
export default {
  name: '',
  components: {},
  data () {
    return {
      test: [
        1
      ]
    }
  },
  methods: {
    createCode () {
      QRCode.toCanvas(this.$refs['qrcode'], '123456', error => {
        if (error) {
          console.log(error)
        } else {
          console.log('success')
        }
      })
    }
  },
  mounted () {
    this.createCode()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-content-container
    .sperator
        background-color #f5f5f5
        height 1px
        width 100%
    .scenic-title
        padding rem(.3) rem(.2)
        textStyle(#333, .3)
    .item-info
        padding rem(.1) rem(.2)
        textStyle(#666, .28)
    .ticket-info-container
        display flex
        flex-direction column
        justify-content center
        padding rem(.2)
        align-items center
    .code-wrapper
        width rem(3.5)
        background-color #f5f5f5
        text-align center
        padding rem(.2)
        border-radius rem(.2)
        .canvas-code
            background-color red
            width rem(3) !important
            height rem(3) !important
        .code-text
            margin-top rem(.2)
            textStyle(#666, .5)
    .sperator-2
        width 85%
        margin 0 auto
        background-color #f5f5f5
        height 1px
        margin rem(.3) 0
    .info-count-wrapper
        display flex
        flex-direction row
        width 90%
        margin 0 auto
        justify-content center
        align-items center
        .info-count-item
            flex 1
            text-align center
            textStyle(#666, .3)
    .sperator-3
        background-color #f5f5f5
        height 5px
</style>
