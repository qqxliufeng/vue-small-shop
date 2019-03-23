<template>
    <div>
        <scenic-detail-header></scenic-detail-header>
        <scenic-detail-images :imageList="imageList"></scenic-detail-images>
        <scenic-detail-info :secnicInfo="secnicInfo">
          <template slot="info" slot-scope="slotPropes">
            <div class="s-d-info-scenic-info-wrapper">
                <div @click="startScenicInfo('scenicInfoForIntro')">
                    <p class="s-d-info-scenic-info-title">景区介绍</p>
                    <p class="s-d-info-scenic-info-info">{{slotPropes.secnicInfo.brief}}</p>
                </div>
                <!-- <div class="vertical-line"></div>
                <div @click="startScenicInfo('scenicInfoForOrderNotify')">
                    <p class="s-d-info-scenic-info-title">预定须知</p>
                    <p class="s-d-info-scenic-info-info">预定须知预定须知预定须知预定须知预定须知预定须知</p>
                </div> -->
            </div>
            <div class="s-d-info-scenic-open-time-wrapper">
                <p>营业时间</p>
                <p>{{slotPropes.secnicInfo.open}}</p>
            </div>
          </template>
        </scenic-detail-info>
        <scenic-detail-hot :hotGoodsList="hotGoodsList"></scenic-detail-hot>
        <scenic-detail-ticket-type :typeGoodsList="typeGoodsList"></scenic-detail-ticket-type>
        <scenic-detail-leave-message :ask="ask"></scenic-detail-leave-message>
        <scenic-detail-comment :comment="comment" :tagCanSelected="false" @tagClick="handleTagClick"></scenic-detail-comment>
        <div class="s-d-l-m-comment-info-see-more" @click="seeMoreComment">
          查看更多
        </div>
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
  data () {
    return {
      sellerInfo: this.$root.state.getSallerInfo(),
      comment: {},
      ask: {},
      imageList: [],
      secnicInfo: {},
      hotGoodsList: [],
      typeGoodsList: [],
      scenicId: this.$route.params.scenicId
    }
  },
  methods: {
    onItemClick (item) {
      console.log(item)
    },
    startScenicInfo (type) {
      this.$router.push({name: 'scenicInfo', params: {selected: type}})
    },
    seeMoreComment () {
      this.$router.push({name: 'commentList', params: {scenicId: this.scenicId}})
    },
    handleTagClick (tag) {
      console.log(tag)
    },
    getData () {
      this.$http(this.$urlPath.scenicDetailUrl, {
        s_id: this.scenicId,
        identity: this.sellerInfo.identity,
        store_id: this.sellerInfo.storeId
      }, '', (data) => {
        if (data.data) {
          this.imageList = data.data.scenicimages
          // 景区信息
          this.secnicInfo.title = data.data.s_title
          this.secnicInfo.tel = data.data.tel
          this.secnicInfo.totalSales = data.data.totalSales
          this.secnicInfo.address = data.data.address
          this.secnicInfo.city = data.data.city
          this.secnicInfo.mark = data.data.mark
          this.secnicInfo.open = data.data.open
          this.secnicInfo.route = data.data.route
          this.secnicInfo.tags = data.data.sceniclabel
          this.secnicInfo.brief = data.data.brief
          this.hotGoodsList = data.data.hot_goods
          this.typeGoodsList = data.data.type_list
          this.comment = data.data.comment
          this.ask = data.data.ask
        }
      }, (errorCode, error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getData()
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
        muitlLineEllipsis(2)
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
.s-d-l-m-comment-info-see-more
    normalTextStyle(#333, .32)
    padding rem(.2)
    text-align center
    border-top #f5f5f5 solid rem(.05)
</style>
