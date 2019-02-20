<template>
    <div class="s-d-hot-container">
        <div class="s-d-hot-title-wrapper">
            <span class="iconfont s-d-hot-title-icon">&#xe6a0;</span>
            <span>热门推荐</span>
        </div>
        <ul>
           <li v-for="(item, index) of hotList" :key="index">
               <scenic-detail-ticket-item :item="item"></scenic-detail-ticket-item>
            </li>
        </ul>
    </div>
</template>

<script>
import ScenicDetailTicketItem from './ScenicDetailTicketItem'
export default {
  name: 'ScenicDetailHot',
  components: {
    ScenicDetailTicketItem
  },
  data () {
    return {
      hotList: [
        {
          name: '工作日成日票',
          remark: '请在游玩前1小时预订'
        },
        {
          name: '工作日成日票',
          remark: '请在游玩前1小时预订'
        },
        {
          name: '工作日成日票',
          remark: '请在游玩前1小时预订请在游玩前1小时预订请在游玩前1小时预订请在游玩前1小时预订请在游玩前1小时预订请在游玩前1小时预订'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-hot-container
    .s-d-hot-title-wrapper
        padding rem(.2)
        borderBottom()
        .s-d-hot-title-icon
            color $orangeColor
            font-size rem(.5)
            vertical-align middle
            margin-right rem(.2)
            & + span
                vertical-align middle
                font-size rem(.35)
</style>
