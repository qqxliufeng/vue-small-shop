<template>
    <div>
        <section v-if="loadState">
          <scenic-detail-header :scenicInfo="scenicInfo" @back="back"></scenic-detail-header>
          <scenic-detail-images :imageList="imageList"></scenic-detail-images>
          <scenic-detail-info :scenicInfo="scenicInfo">
            <template slot="info" slot-scope="slotPropes">
              <div class="s-d-info-scenic-info-wrapper">
                  <div @click="startScenicInfo('scenicInfoForIntro')">
                      <p class="s-d-info-scenic-info-title">景区介绍</p>
                      <p class="s-d-info-scenic-info-info">{{slotPropes.scenicInfo.brief}}</p>
                  </div>
                  <!-- <div class="vertical-line"></div>
                  <div @click="startScenicInfo('scenicInfoForOrderNotify')">
                      <p class="s-d-info-scenic-info-title">预定须知</p>
                      <p class="s-d-info-scenic-info-info">预定须知预定须知预定须知预定须知预定须知预定须知</p>
                  </div> -->
              </div>
              <div class="s-d-info-scenic-open-time-wrapper">
                  <p>营业时间</p>
                  <p>{{slotPropes.scenicInfo.open}}</p>
              </div>
            </template>
          </scenic-detail-info>
          <scenic-detail-hot :hotGoodsList="hotGoodsList"></scenic-detail-hot>
          <scenic-detail-ticket-type :typeGoodsList="typeGoodsList"></scenic-detail-ticket-type>
          <scenic-detail-leave-message :ask="ask"></scenic-detail-leave-message>
          <scenic-detail-comment :comment="comment" :tagCanSelected="false"></scenic-detail-comment>
          <div class="s-d-l-m-comment-info-see-more" @click="seeMoreComment">
            查看更多
          </div>
        </section>
        <section v-else>
          <load-fail @reload="reload"></load-fail>
        </section>
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
import LoadFail from 'common/components/loading/load-fail'
export default {
  name: 'scenicDetail',
  components: {
    ScenicDetailHeader,
    ScenicDetailImages,
    ScenicDetailInfo,
    ScenicDetailHot,
    ScenicDetailTicketType,
    ScenicDetailLeaveMessage,
    ScenicDetailComment,
    LoadFail
  },
  data () {
    return {
      loadState: true,
      sellerInfo: this.$root.state.getSallerInfo(),
      comment: {},
      ask: {},
      imageList: [],
      scenicInfo: {},
      hotGoodsList: [],
      typeGoodsList: [],
      scenicId: null,
      identity: null,
      storeId: null,
      show: true,
      from: null
    }
  },
  methods: {
    onItemClick (item) {
      console.log(item)
    },
    startScenicInfo (type) {
      this.$router.push({name: 'scenicInfo', query: {id: this.scenicId}})
    },
    seeMoreComment () {
      this.$router.push({name: 'commentList', params: {scenicId: this.scenicId}})
    },
    reload () {
      this.getData()
    },
    getData () {
      this.$http(this.$urlPath.scenicDetailUrl, {
        s_id: this.scenicId,
        identity: this.identity,
        store_id: this.storeId
      }, '', (data) => {
        if (data.data) {
          this.loadState = true
          this.imageList = data.data.scenicimages
          // 景区信息
          let info = {}
          info.title = data.data.s_title
          info.tel = data.data.tel
          info.totalSales = data.data.totalSales
          info.address = data.data.address
          info.city = data.data.city
          info.mark = data.data.mark
          info.open = data.data.open
          info.route = data.data.route
          info.tags = data.data.sceniclabel
          info.brief = data.data.brief
          info.isFavorites = data.data.is_favorites
          info.content = data.data.s_content
          this.scenicInfo = info
          this.hotGoodsList = data.data.hot_goods
          this.typeGoodsList = data.data.type_list
          this.comment = data.data.comment
          this.ask = data.data.ask
        } else {
          this.loadState = false
        }
      }, (errorCode, error) => {
        this.loadState = false
      })
    },
    back () {
      if (this.from) {
        if (this.from.name) {
          this.$router.go(-1)
        } else {
          this.$router.replace({path: '/'})
        }
      } else {
        this.$router.go(-1)
      }
    }
  },
  created () {
    this.scenicId = this.$route.query.scenicId
    let identity = this.$route.query.identity
    let storeId = this.$route.query.storeId
    if (identity && storeId) {
      this.$root.state.saveSallerInfo(identity, storeId)
      this.sellerInfo = this.$root.state.getSallerInfo()
    }
    this.identity = this.sellerInfo.identity
    this.storeId = this.sellerInfo.storeId
  },
  mounted () {
    this.$root.$on('ticketItemClick', (item) => {
      this.$router.push({name: 'reseveDetail', query: { goods_id: item.goodsId }})
    })
    this.getData()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.from = from
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
