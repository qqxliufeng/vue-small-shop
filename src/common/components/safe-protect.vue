<template>
  <div>
      <div class="o-i-ticket-safe-container" @click="dialogVisible = true">
        <p>优待客消费保障</p>
        <div class="o-i-ticket-info-tag">
            <span><i class="iconfont">&#xe69e;</i> 入园保障</span>
            <span><i class="iconfont">&#xe69e;</i> 官方</span>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="90%" title="提示" :close-on-click-modal="true">
        content
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
</style>
