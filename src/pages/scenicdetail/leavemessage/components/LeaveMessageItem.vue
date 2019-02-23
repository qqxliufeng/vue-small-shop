<template>
    <div class='l-m-item-container'>
      <el-card shadow="always" class="l-q-card" :body-style="{ padding:'.2rem' }">
          <div class="l-q-content-container">
              <span>问</span>
              <span>{{tempItem.name}}</span>
          </div>
          <div class="l-q-content-r-container">
              <span>答</span>
              <span>请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？请问滑雪好玩吗？</span>
          </div>
          <div class="l-q-footer-container">
              <span class="iconfont l-q-footer-time">&#xe790; 1天前</span>
              <p>
                <span>查看其它答案</span>
                <span>|</span>
                <span @click="replyMessage">我要回答</span>
              </p>
          </div>
      </el-card>
    </div>
</template>

<script>

export default {
  name: 'leaveMessageItem',
  props: {
    item: {
      type: Object
    }
  },
  components: {},
  data () {
    return {
      tempItem: this.item
    }
  },
  methods: {
    replyMessage () {
      this.$router.push({name: 'replyMessage'})
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.l-m-item-container
    .l-q-card
        margin .2rem
        .l-q-title-container
            & span:nth-child(1)
                color #333333
                font-size .32rem
            & span:nth-child(2)
                color #aaaaaa
                font-size .28rem
                float right
        .l-q-content-container
            display flex
            & span:nth-child(1)
                color #ffffff
                font-size .2rem
                background-color $primary
                border-radius .08rem
                padding .05rem
                width .3rem
                height .25rem
                margin-top .05rem
                margin-right .1rem
                line-height .28rem
                flex 1
            & span:nth-child(2)
                color #555555
                font-size .3rem
                line-height .45rem
        .l-q-no-reply
            margin-top .2rem
            color #aaaaaa
            margin-left .4rem
            line-height .45rem
        .l-q-content-r-container
            margin-top .3rem
            display flex
            & span:nth-child(1)
                color #ffffff
                font-size .2rem
                background-color #EA741F
                border-radius .08rem
                padding .05rem
                width .3rem
                height .25rem
                margin-top .05rem
                margin-right .1rem
                line-height .28rem
                flex 1
            & span:nth-child(2)
                color #aaaaaa
                font-size .25rem
                line-height .45rem
        .l-q-footer-container
            margin-top .3rem
            padding-left .4rem
            .l-q-footer-time
                color #D0D0D0
                font-size .25rem
            & p:nth-child(2)
                color $primary
                float right
                font-size .25rem
                & span:nth-child(2)
                    margin 0 rem(.2)
</style>
