<template>
    <div v-if="info">
        <navi title="支付"></navi>
        <div class="o-i-pay-container">
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
                <div class="o-i-pay-type-zfb-wrapper" v-if="!$isWeiXin">
                    <img :src="ZFBIcon" class="icon">
                    <span>支付宝</span>
                    <i class="el-icon-success"></i>
                </div>
                <div class="o-i-pay-type-zfb-wrapper" v-else>
                    <img :src="WXIcon" class="icon">
                    <span>微信</span>
                    <i class="el-icon-success"></i>
                </div>
            </div>
            <p class="o-i-pay-action" @click="pay">支付</p>
            <div class="sperator-line"></div>
        </div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="90%"
          @close="close">
          <span>购买成功~</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="close" size="mini">再逛逛</el-button>
            <el-button type="primary" @click="seeOrder" size="mini">查看订单</el-button>
          </span>
        </el-dialog>
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
      payType: this.$isWeiXin ? 'wechatpay' : 'alipay',
      dialogVisible: false,
      orderId: null
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
        this.$toast(error)
      })
    },
    countDownEnd () {
      this.$toast('订单结束，未支付，请重新下单')
      this.$router.go(-1)
    },
    pay () {
      this.$http(this.$urlPath.orderPay, {
        out_trade_no: this.$route.query.no,
        pay_type: this.payType
      }, '正在支付…', (data) => {
        this.$toast('订单支付成功')
        this.dialogVisible = true
        this.$root.$emit('onReload')
        this.$root.$emit('onGetBadge')
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    seeOrder () {
      this.dialogVisible = false
      this.$router.replace({name: 'orderInfo', params: {orderId: '103', orderType: '2'}})
    //   if (this.orderId) {
    //     this.$router.replace({name: 'orderInfo', params: {orderId: '103', orderType: '2'}})
    //   }
    },
    close () {
      this.dialogVisible = false
      this.$router.go(-1)
    }
  },
  mounted () {
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
