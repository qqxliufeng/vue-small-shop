<template>
    <div class="s-d-l-m-message-container">
        <div class="s-d-l-m-message-title">
            <span>留言板</span>
            <span>1234条留言</span>
        </div>
        <div v-if="messageList.length === 0" class="s-d-l-m-message-empty">
            <span>暂无留言哦~</span>
        </div>
        <div v-else class="s-d-l-m-message-info-wrapper">
            <ul>
                <li v-for="(item, index) of messageList" :key="index">
                    <div class="s-d-l-m-message-info-item">
                        <span>问</span>
                        <span>{{item.name}}</span>
                        <span>共1234条回复</span>
                    </div>
                </li>
            </ul>
            <div v-if="messageList.length > 2" class="s-d-l-m-message-info-see-more" @click="seeMoreLeaveMessage">
                查看更多
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'scenicDetailLeaveMessage',
  data () {
    return {
      messageList: [
        {
          name: '这是一个好地方吗？这是一个好地方吗？这是一个好地方吗？这是一个好地方吗？'
        },
        {
          name: '这是一个好地方吗？这是一个好地方吗？这是一个好地方吗？这是一个好地方吗？'
        },
        {
          name: '这是一个好地方吗？这是一个好地方吗？这是一个好地方吗？这是一个好地方吗？'
        }
      ]
    }
  },
  methods: {
    seeMoreLeaveMessage () {
      this.$router.push({name: 'leaveMessageList'})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-l-m-message-container
    border-top #f5f5f5 solid rem(.1)
    .s-d-l-m-message-title
        overflow hidden
        padding rem(.2)
        borderBottom()
        & span:nth-child(1)
            float left
            normalTextStyle(#333, .35)
        & span:nth-child(2)
            float right
            normalTextStyle(#888, .3)
    .s-d-l-m-message-empty
        display flex
        justify-content center
        align-items center
        min-height rem(2)
        normalTextStyle(#888, .35)
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
        normalTextStyle(#333, .32)
        padding rem(.2)
        text-align center
        border-top #f5f5f5 solid rem(.05)
</style>
