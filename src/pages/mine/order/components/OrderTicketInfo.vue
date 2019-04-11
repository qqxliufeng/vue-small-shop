<template>
    <div class="o-t-i-container" v-if="itemInfo">
        <div :class="['o-t-i-container-title-wrapper',enableClass]">
            <div class="o-t-i-container-title-no-wrapper">
                <p>凭证号</p>
                <p class="number">{{itemInfo.voucher_number}}</p>
            </div>
            <div class="o-t-i-container-title-waiting-use-num-wrapper">
                <p>待消费</p>
                <p>{{itemInfo.buynum - itemInfo.consum}}张</p>
            </div>
            <div class="o-t-i-container-title-total-num-wrapper">
                <p>合计</p>
                <p>{{itemInfo.consum}}张</p>
            </div>
            <div class="o-t-i-container-title-code-wrapper" @click="lookCode">
                <span class="iconfont">&#xe71e;</span>
                <p>查看二维码</p>
            </div>
        </div>
        <div class="o-t-i-container-detail-wrapper">
            <slot name="ticketInfoDetail"></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'orderTicketInfo',
  props: {
    itemInfo: Object,
    ticketName: String,
    isEnable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    enableClass () {
      return this.isEnable ? 'o-t-i-enable' : 'o-t-i-unenable'
    }
  },
  methods: {
    lookCode () {
      if (this.isEnable) {
        this.$router.push({
          name: 'orderCodeInfo',
          params: {
            info: {
              no: this.itemInfo.voucher_number,
              waitNum: this.itemInfo.buynum - this.itemInfo.consum,
              consum: this.itemInfo.consum,
              backNum: this.itemInfo.backNum ? this.itemInfo.backNum : 0,
              ticketName: this.ticketName
            }
          }
        }
        )
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.o-t-i-enable
    background-color #f5f7f6
    color #555555
.o-t-i-unenable
    background-color #ECECEC
    color #B6B6B6
    & .number
        color #B6B6B6 !important
.o-t-i-container
    background-color #ffffff
    .o-t-i-container-title-wrapper
        display flex
        padding .2rem
        .o-t-i-container-title-no-wrapper
            flex 1.1
            overflow hidden
            text-align center
            .number
                font-size .3rem
                margin-top .2rem
                color rgba(200, 0, 0, 1)
        .o-t-i-container-title-waiting-use-num-wrapper
            flex 1
            text-align center
            & p:nth-child(2)
                font-size .3rem
                margin-top .2rem
        .o-t-i-container-title-total-num-wrapper
            flex 1
            text-align center
            & p:nth-child(2)
                font-size .3rem
                margin-top .2rem
        .o-t-i-container-title-code-wrapper
            flex 1
            text-align center
            & span
                font-size .4rem
            & p
                margin-top .1rem
</style>
