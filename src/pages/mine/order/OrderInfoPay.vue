<template>
    <div v-if="info">
        <navi title="支付"></navi>
        <div class="o-i-pay-container bg-white">
            <div class="o-i-pay-time-wrapper">
                <p>剩余支付时间</p>
                <count-down :time="info.timeout_express * 1000" @end="countDownEnd">
                    <template slot-scope="props">
                        <div class="time-wrapper">
                            {{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}
                        </div>
                    </template>
                </count-down>
            </div>
            <div class="o-i-pay-goods-info-wrapper">
                <div>
                    <img v-lazy="$utils.image.getImagePath(info.scenicimages)">
                </div>
                <div>
                    <p>{{info.goods_title}}</p>
                    <p>￥{{info.price}}</p>
                </div>
            </div>
            <div class="o-i-pay-goods-info-money-add">
                <span>￥{{info.price}}</span>
                <span>x{{info.num}}</span>
            </div>
            <div class="sperator-line"></div>
            <div class="o-i-pay-goods-info-money">
                <span>支付金额</span>
                <span>￥{{info.amount}}</span>
            </div>
            <div class="sperator-line-height"></div>
            <div class="o-i-pay-goods-info-money">
                <span>请选择支付方式</span>
            </div>
            <div class="sperator-line"></div>
            <div class="o-i-pay-type-wrapper">
                <div class="o-i-pay-type-zfb-wrapper" @click="selectPayType('alipay')" v-if="!$isWeiXin">
                    <img :src="ZFBIcon" class="icon">
                    <span>支付宝</span>
                    <i class="el-icon-success" :style="{'color' : payType==='alipay' ? '#63BBB5' : '#ccc'}"></i>
                </div>
                <div class="o-i-pay-type-zfb-wrapper" @click="selectPayType('wechatpay')" v-if="!$isAliPay">
                    <img :src="WXIcon" class="icon">
                    <span>微信</span>
                    <i class="el-icon-success" :style="{'color' : payType==='wechatpay' ? '#63BBB5' : '#ccc'}"></i>
                </div>
            </div>
            <p class="o-i-pay-action" @click="pay">支付</p>
            <div class="sperator-line"></div>
        </div>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
import CountDown from 'common/components/countdown/countdown'
import ZFBIcon from 'images/img_zfb_icon.png'
import WXIcon from 'images/img_weixin_icon.png'
export default {
  name: 'orderInfoPay',
  components: {
    navi,
    CountDown
  },
  data () {
    return {
      ZFBIcon,
      WXIcon,
      info: null,
      payType: '',
      dialogVisible: false,
      orderId: null,
      wxPayInfo: null
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.orderPayUrl, {
        out_trade_no: this.$route.query.no
      }, '', (data) => {
        this.info = data.data
        this.info.timeout_express = this.info.timeout_express - data.time
      }, (errorCode, error) => {
        // this.$toast(error)
        this.$router.go(-1)
      })
    },
    countDownEnd () {
      this.$toast('订单结束，未支付，请重新下单')
      this.$router.go(-1)
    },
    pay () {
      if (!this.payType) {
        this.$toast('请选择支付方式')
        return
      }
      this.$http(this.$urlPath.orderPay, {
        out_trade_no: this.$route.query.no,
        pay_type: this.payType
      }, '正在支付…', (data) => {
        // this.$root.$emit('onReload')
        // this.$root.$emit('onGetBadge')
        if (this.payType === 'alipay') {
          const div = document.createElement('div')
          div.innerHTML = data.data
          document.body.appendChild(div)
          document.forms[0].submit()
        } else if (this.payType === 'wechatpay') {
          if (this.$isWeiXin) { // 判断是不是微信客户端
            this.wxPayInfo = data.data
            if (typeof WeixinJSBridge === 'undefined') {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
              }
            } else {
              this.onBridgeReady()
            }
          } else {
            window.location.href = data.data
          }
        }
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    onBridgeReady () {
      if (this.wxPayInfo) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          {
            'appId': this.wxPayInfo.appId,
            'timeStamp': this.wxPayInfo.timeStamp,
            'nonceStr': this.wxPayInfo.nonceStr,
            'package': this.wxPayInfo.package,
            'signType': this.wxPayInfo.signType,
            'paySign': this.wxPayInfo.paySign
          }, (res) => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              this.$router.replace({name: 'orderPayResult', query: {out_trade_no: this.$route.query.no, scenic_id: this.info.scenic_id, state: '1', order_id: this.info.order_id}})
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              this.$toast('用户取消支付')
              this.$router.replace({name: 'orderPayResult', query: {out_trade_no: this.$route.query.no, scenic_id: this.info.scenic_id, state: '0', order_id: this.info.order_id}})
            } else {
              this.$router.replace({name: 'orderPayResult', query: {out_trade_no: this.$route.query.no, scenic_id: this.info.scenic_id, state: '0', order_id: this.info.order_id}})
            }
          })
      }
    },
    selectPayType (payType) {
      this.payType = payType
    },
    getPayType () {
      if (this.$isWeiXin) {
        this.payType = 'wechatpay'
      } else {
        this.payType = 'alipay'
      }
    }
  },
  mounted () {
    this.getPayType()
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-pay-time-wrapper
    borderBottom()
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding .5rem
    & p:nth-child(1)
        color #888
        font-size .28rem
        line-height .32rem
    .time-wrapper
        color #333
        font-size .5rem
        line-height .52rem
        margin-top .2rem
.o-i-pay-goods-info-wrapper
    display flex
    padding .2rem
    borderBottom()
    & div:nth-child(1)
        flex 1
        height 1rem
        overflow hidden
        & img
            width 100%
            height 100%
            object-fit cover
    & div:nth-child(2)
        flex 5
        padding-left .2rem
        box-sizing border-box
        display flex
        flex-direction column
        justify-content space-between
        overflow hidden
        & p:nth-child(1)
            ellipsis()
            color #333
            font-size .3rem
            line-height .32rem
        & p:nth-child(2)
            color $primary
            font-size .32rem
            line-height .34rem
.o-i-pay-goods-info-money
    overflow hidden
    padding rem(.3)
    & span:nth-child(1)
        float left
        normalTextStyle(#333, .3)
        &::before
            beforeLine()
    & span:nth-child(2)
        float right
        normalTextStyle($orangeColor, .28)
.sperator-line
    horizontalLine(#f5f5f5, .02, 0, .4)
.o-i-pay-goods-info-money-add
    overflow hidden
    padding rem(.3)
    borderBottom()
    & span:nth-child(1)
        float left
        normalTextStyle(#888888, .28)
    & span:nth-child(2)
        float right
        normalTextStyle(#333, .28)
.sperator-line-height
    horizontalLine(#f5f5f5, .2)
.o-i-pay-action
    padding rem(.2)
    background-color $primary
    position fixed
    left 0
    bottom 0
    right 0
    text-align center
    normalTextStyle(#ffffff, .3)
.o-i-pay-type-zfb-wrapper
    overflow hidden
    padding rem(.3)
    & span
        textStyle(#333333, .3)
        vertical-align middle
    & i
        normalTextStyle($primary, .3)
        float right
    .icon
        width rem(.5)
        height rem(.5)
        margin-right rem(.2)
        vertical-align middle
</style>
