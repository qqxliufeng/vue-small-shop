<template>
    <div>
        <section v-if="loadState">
          <scenic-detail-header :scenicInfo="scenicInfo" @back="back" @collection="collection" :isFavorites="scenicInfo.isFavorites"></scenic-detail-header>
          <scenic-detail-images :imageList="imageList"></scenic-detail-images>
          <scenic-detail-info :scenicInfo="scenicInfo">
            <template slot="info" slot-scope="slotPropes">
              <div class="s-d-info-scenic-info-wrapper">
                  <div @click="startScenicInfo('scenicInfoForIntro')">
                      <p class="s-d-info-scenic-info-title">景区须知</p>
                      <p class="s-d-info-scenic-info-info">{{delHtmlTag(slotPropes.scenicInfo.brief)}}</p>
                  </div>
              </div>
              <div class="s-d-info-scenic-open-time-wrapper">
                  <p>营业时间</p>
                  <p>{{slotPropes.scenicInfo.open}}</p>
              </div>
            </template>
          </scenic-detail-info>
          <scenic-detail-hot :hotGoodsList="hotGoodsList" v-if="hotGoodsList && hotGoodsList.length > 0"></scenic-detail-hot>
          <scenic-detail-ticket-type :typeGoodsList="typeGoodsList"></scenic-detail-ticket-type>
          <scenic-detail-leave-message :ask="ask"></scenic-detail-leave-message>
          <scenic-detail-comment :comment="comment" :tagCanSelected="false"></scenic-detail-comment>
          <div class="s-d-l-m-comment-info-see-more" @click="seeMoreComment" v-if="comment && comment.comment_list.length > 0">
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
      comment: null,
      ask: {},
      imageList: [],
      scenicInfo: {},
      hotGoodsList: [],
      typeGoodsList: [],
      scenicId: null,
      identity: null,
      storeId: null,
      businessesId: null,
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
      this.$router.push({name: 'commentList', query: {scenicId: this.scenicId}})
    },
    reload () {
      this.getData()
    },
    delHtmlTag (str) {
      if (str) {
        return str.replace(/<[^>]+>/g, '')
      }
      return ''
    },
    collection () {
      if (this.$root.userInfo.isLogin()) {
        this.$http(this.$urlPath.userUnFavoroteScenicUrl, {
          scenic_id: this.scenicId
        }, '', (data) => {
          if (this.scenicInfo.isFavorites) {
            this.$toast('取消收藏成功')
            this.scenicInfo.isFavorites = 0
          } else {
            this.$toast('收藏成功')
            this.scenicInfo.isFavorites = 1
          }
        }, (errorCode, error) => {
          this.$toast(error)
        })
      } else {
        this.$router.push({name: 'loginContainer'})
      }
    },
    getData () {
      this.$http(this.$urlPath.scenicDetailUrl, {
        s_id: this.scenicId,
        identity: this.identity,
        store_id: this.storeId,
        businesses_id: this.businessesId
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
      if (this.from && this.from.name && (this.from.name === 'collection' || this.from.name === 'activityTicketDetail')) {
        this.$router.go(-1)
      } else {
        this.$router.replace({path: '/index/' + this.identity + '/' + this.storeId})
      }
    }
  },
  created () {
    this.scenicId = this.$route.query.s
    let tempIdentity = this.$route.query.i
    let tempStoreId = this.$route.query.t
    this.businessesId = this.$route.query.b || ''
    // 如果是直接从分享页面过来的，则要存一下identity 和 storeId
    if (tempIdentity && tempStoreId) {
      this.$root.state.saveSallerInfo(tempIdentity, tempStoreId)
      this.sellerInfo = this.$root.state.getSallerInfo()
    }
    this.identity = this.sellerInfo.identity
    this.storeId = this.sellerInfo.storeId
  },
  mounted () {
    this.$root.$on('ticketItemClick', (item) => {
      this.$router.push({name: 'reseveDetail', query: { goods_id: item.goodsId, scenicId: this.scenicId }})
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
        muitlLineEllipsis(2)
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
