<template>
    <el-card :body-style="{padding: 0}" class="s-d-l-m-message-container" v-if="ask">
        <div class="s-d-l-m-message-title">
            <span><span class="el-icon-chat-line-square icon"></span><i style="font-weight: bold; color: #444">留言板</i></span>
            <span>{{ask.ask_count}}条留言</span>
        </div>
        <div v-if="showEmpty" class="s-d-l-m-message-empty">
            <el-button type="primary" size="mini" class="button" @click="startLeaveMessage">去留言</el-button>
        </div>
        <div v-else class="s-d-l-m-message-info-wrapper">
            <ul>
                <li v-for="item of ask.ask_list" :key="item.aid">
                    <div class="s-d-l-m-message-info-item">
                        <span>问</span>
                        <span>{{item.content}}</span>
                        <span>共{{item.answer_count}}条回复</span>
                    </div>
                </li>
            </ul>
            <div class="s-d-l-m-message-info-see-more" @click="seeMoreLeaveMessage">
                查看更多
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
  name: 'scenicDetailLeaveMessage',
  props: {
    ask: Object
  },
  data () {
    return {
    }
  },
  computed: {
    showEmpty () {
      return this.ask.ask_list && this.ask.ask_list.length === 0
    }
  },
  methods: {
    seeMoreLeaveMessage () {
      this.$router.push({name: 'leaveMessageList', query: {s_id: this.$parent.scenicId}})
    },
    startLeaveMessage () {
      this.$router.push({name: 'askMessage', query: {s_id: this.$parent.scenicId}})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-l-m-message-container
    margin rem(.2)
    .s-d-l-m-message-title
        overflow hidden
        padding rem(.2)
        borderBottom()
        & span:nth-child(1)
            float left
            normalTextStyle(#333, .3)
            .icon
                textStyle($orangeColor, .35)
                margin-right rem(.1)
        & span:nth-child(2)
            float right
            normalTextStyle(#888, .3)
    .s-d-l-m-message-empty
        display flex
        justify-content center
        align-items center
        min-height rem(2)
        normalTextStyle(#888, .3)
        .button
            background $orangeColor
            border-color $orangeColor
            padding rem(.15) rem(.5)
    .s-d-l-m-message-info-item
        display flex
        align-items center
        padding rem(.1) rem(.2)
        & span:nth-child(1)
            background-color $orangeColor
            color #ffffff
            font-size rem(.25)
            padding rem(.05)
            border-radius rem(.1)
            line-height rem(.28)
        & span:nth-child(2)
            flex 1
            margin 0 rem(.1)
            ellipsis()
        & span:nth-child(3)
            normalTextStyle(#888, .28)
    .s-d-l-m-message-info-see-more
        normalTextStyle(#666, .3)
        padding rem(.2)
        text-align center
        border-top #f5f5f5 solid rem(.05)
</style>
