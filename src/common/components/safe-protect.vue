<template>
  <div>
      <div class="o-i-ticket-safe-container" @click="dialogVisible = true">
        <p>优待客消费保障</p>
        <div class="o-i-ticket-info-tag">
            <span><i class="iconfont">&#xe69e;</i> 入园保障</span>
            <span><i class="iconfont">&#xe69e;</i> 官方</span>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="90%" title="优待客门票保障" :close-on-click-modal="true">
        <div class="title-wrapper">
          <span class="el-icon-success title"><i>官方</i></span>
        </div>
        <p class="content">成功预订门票获得确认短信后（按规则购买和使用），我们将保障您顺利入园游玩。</p>
        <div class="title-wrapper">
          <span class="el-icon-success title"><i>入园保障</i></span>
        </div>
        <p class="content">成功预订门票获得确认短信后（按规则购买和使用），我们将保障您顺利入园游玩。</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-ticket-safe-container
    background-color #EDF8F7
    border-bottom .02rem solid #f5f5f5
    padding .2rem
    & p
        color $primary
    .o-i-ticket-info-tag
        overflow hidden
        margin-top .2rem
        line-height .27rem
        & span
            float left
            color #333333
            font-size .2rem
            margin-right .3rem
            & i
                color $primary
                font-size .2rem
.title-wrapper
    padding rem(.2) 0
    .title
        textStyle($primary, .32)
        & i
            textStyle(#333, .32)
            margin-left rem(.3)
.content
    textStyle(#666, .28)
    line-height rem(.4)
    padding rem(.2)
</style>
