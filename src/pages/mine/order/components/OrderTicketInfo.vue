<template>
    <div class="o-t-i-container">
        <div :class="['o-t-i-container-title-wrapper',enableClass]">
            <div class="o-t-i-container-title-no-wrapper">
                <p>凭证号</p>
                <p>1234567</p>
            </div>
            <div class="o-t-i-container-title-waiting-use-num-wrapper">
                <p>待消费</p>
                <p>4张</p>
            </div>
            <div class="o-t-i-container-title-total-num-wrapper">
                <p>合计</p>
                <p>4张</p>
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
  data () {
    return {
      isEnable: true
    }
  },
  computed: {
    enableClass () {
      return this.isEnable ? 'o-t-i-enable' : 'o-t-i-unenable'
    }
  },
  methods: {
    lookCode () {
      this.$router.push({name: 'orderCodeInfo'})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.o-t-i-enable
    background-color #D5E1DE
    color #555555
.o-t-i-unenable
    background-color #ECECEC
    color #B6B6B6
.o-t-i-container
    background-color #ffffff
    .o-t-i-container-title-wrapper
        display flex
        padding .2rem
        .o-t-i-container-title-no-wrapper
            flex 1.1
            overflow hidden
            text-align center
            & p:nth-child(1)
                line-height .35rem
            & p:nth-child(2)
                font-size .4rem
                margin-top .2rem
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
.o-t-i-container-detail-wrapper
    padding .2rem
</style>
