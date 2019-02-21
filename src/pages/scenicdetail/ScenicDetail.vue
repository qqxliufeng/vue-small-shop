<template>
    <div>
        <scenic-detail-header></scenic-detail-header>
        <scenic-detail-images></scenic-detail-images>
        <scenic-detail-info>
          <template slot="info">
            <div class="s-d-info-scenic-info-wrapper">
                <div @click="startScenicInfo('scenicInfoForIntro')">
                    <p class="s-d-info-scenic-info-title">景区介绍</p>
                    <p class="s-d-info-scenic-info-info">景区介绍景区介绍景区介绍景区介绍景区介绍景区介绍</p>
                </div>
                <div class="vertical-line"></div>
                <div @click="startScenicInfo('scenicInfoForOrderNotify')">
                    <p class="s-d-info-scenic-info-title">预定须知</p>
                    <p class="s-d-info-scenic-info-info">预定须知预定须知预定须知预定须知预定须知预定须知</p>
                </div>
            </div>
            <div class="s-d-info-scenic-open-time-wrapper">
                <p>营业时间</p>
                <p>早上9：00-12：00</p>
                <p>下午9：00-12：00</p>
            </div>
          </template>
        </scenic-detail-info>
        <scenic-detail-hot></scenic-detail-hot>
        <scenic-detail-ticket-type></scenic-detail-ticket-type>
        <scenic-detail-leave-message></scenic-detail-leave-message>
        <scenic-detail-comment></scenic-detail-comment>
    </div>
</template>

<script>
import ScenicDetailHeader from './components/ScenicDetailHeader'
import ScenicDetailImages from './components/ScenicDetailImages'
import ScenicDetailInfo from './components/ScenicDetailInfo'
import ScenicDetailHot from './components/ScenicDetailHot'
import ScenicDetailTicketType from './components/ScenicDetailTicketType'
import ScenicDetailLeaveMessage from './components/ScenicDetailLeaveMessage'
import ScenicDetailComment from './components/ScenicDetailComment'
export default {
  name: 'scenicDetail',
  components: {
    ScenicDetailHeader,
    ScenicDetailImages,
    ScenicDetailInfo,
    ScenicDetailHot,
    ScenicDetailTicketType,
    ScenicDetailLeaveMessage,
    ScenicDetailComment
  },
  methods: {
    onItemClick (item) {
      console.log(item)
    },
    startScenicInfo (type) {
      this.$router.push({name: 'scenicInfo', params: {selected: type}})
    }
  },
  mounted () {
    this.$root.$on('ticketItemClick', (item) => {
      this.$router.push({name: 'ticketDetail'})
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-info-scenic-info-wrapper
    overflow hidden
    display flex
    height 100%
    justify-content center
    & p
        ellipsis()
    & div:nth-child(1)
        overflow hidden
        flex 1
    & div:nth-child(3)
        overflow hidden
        flex 1
    .vertical-line
        width 1px
        height rem(1)
        margin rem(.1) rem(.1)
        background-color #f5f5f5
    .s-d-info-scenic-info-title
        normalTextStyle(#333333, .3)
    .s-d-info-scenic-info-info
        margin-top rem(.2)
        normalTextStyle(#888888, .25)
.s-d-info-scenic-open-time-wrapper
    background-color #f5f5f5
    padding rem(.1)
    border-radius rem(.1)
    & p:nth-child(1)
        normalTextStyle(#333, .28)
    & p:nth-child(2), & p:nth-child(3)
        normalTextStyle(#888, .25)
</style>
