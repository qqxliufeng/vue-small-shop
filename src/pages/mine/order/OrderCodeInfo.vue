<template>
    <div class="o-i-code-info-container">
        <div class="o-i-code-info">
            <span class="el-icon-circle-close-outline o-i-code-close" @click="close"></span>
            <div class="o-i-code-code"></div>
            <p class="o-i-code-info-num">2323453545</p>
            <p class="o-i-code-info-num-desc">商家扫描二维码进行体验</p>
            <div class="o-i-code-info-ticket-info">
                <p>卧虎山滑雪场成人票</p>
                <div>
                    <span>待消费<i>4张</i></span>
                    <span>已消费3张</span>
                    <span>已退款4张</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'orderCodeInfo',
  methods: {
    close () {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.o-i-code-info-container
    background-color #939299
    display flex
    justify-content center
    align-items center
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    .o-i-code-info
        position relative
        background-color #ffffff
        border-radius .05rem
        overflow hidden
        width 80%
        height 75%
        .o-i-code-close
            float right
            font-size .45rem
            padding .2rem
            color #888888
        .o-i-code-code
            width 80%
            padding-bottom 75%
            background-color $primary
            margin .7rem auto .4rem auto
        .o-i-code-info-num
            text-align center
            color #333333
            font-size .4rem
        .o-i-code-info-num-desc
            text-align center
            color #888888
            font-size .3rem
            margin-top .2rem
        .o-i-code-info-ticket-info
            position absolute
            left 0
            bottom 0
            right 0
            height 2rem
            background-color #f5f5f5
            border-radius .05rem
            & p
                color #333333
                font-size .3rem
                padding .4rem
            & div
                display flex
                & span
                    flex 1
                    text-align center
                    margin-top .2rem
                    color #888888
                    & i
                        color $primary
</style>
