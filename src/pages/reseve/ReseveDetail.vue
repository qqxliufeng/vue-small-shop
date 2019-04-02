<template>
    <div class="r-d-detail-container">
        <navi title="提交订单" :isFixed="true"></navi>
        <div class="r-d-detail-wrapper">
            <ticket-info :ticketInfo="ticketInfo" @selected="onSelectedTimeItem"></ticket-info>
            <ticket-user-single-info v-if="ticketInfo.goods && ticketInfo.goods.play_info === 1" ref="userSingleInfo" :visitorInfo="ticketInfo.goods.visitor_info"></ticket-user-single-info>
            <ticket-user-info :contacts="contacts" ref="userInfo" v-if="ticketInfo.goods && ticketInfo.goods.play_info === 2" :visitorInfo="ticketInfo.goods.visitor_info"></ticket-user-info>
            <ticket-discount></ticket-discount>
            <div class="r-d-detail-pay-action-wrapper">
                <span class="r-d-pay-action-price">总价：<i>￥{{totalPrice}}</i></span>
                <div class="r-d-pay-action-collection" @click="collection">
                  <p :class="[collectionState ===  1 ? 'el-icon-star-on' : 'el-icon-star-off']"></p>
                  <p>收藏</p>
                </div>
                <span class="r-d-pay-action-pay" :style="{'background' : totalPrice === 0 ? '#cccccc' : '#E18234', 'pointer-events': totalPrice === 0 ? 'none' : 'auto'}" @click="reserve">立即预定</span>
            </div>
        </div>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
import TicketInfo from './components/TicketInfo'
import TicketDiscount from './components/TicketDiscount'
import TicketUserInfo from './components/TicketUserInfo'
import TicketUserSingleInfo from './components/TicketUserSingleInfo'
export default {
  name: 'ReseveDetail',
  components: {
    navi,
    TicketInfo,
    TicketDiscount,
    TicketUserInfo,
    TicketUserSingleInfo
  },
  data () {
    return {
      ticketInfo: {},
      totalPrice: 0,
      contacts: [],
      tempDate: null,
      collectionState: 0
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.orderReserve, {
        goods_id: this.$route.query.goods_id,
        identity: this.$root.state.identity,
        store_id: this.$root.state.storeId
      }, '', (data) => {
        this.ticketInfo = data.data
        this.collectionState = data.data.is_favorites
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    onSelectedTimeItem (info) {
      if (info.item) {
        this.tempDate = info.item
        this.tempDate.num = info.num
        this.totalPrice = (Number(info.item.sale_price) * parseInt(info.num)).toFixed(2)
      }
    },
    collection () {
      this.$http(this.$urlPath.userUnFavoroteGoodsUrl, {
        goods_id: this.$route.query.goods_id
      }, '正在操作…', (data) => {
        if (this.collectionState === 1) {
          this.$toast('取消收藏成功')
          this.collectionState = 0
        } else {
          this.$toast('收藏成功')
          this.collectionState = 1
        }
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    reserve () {
      if (!this.tempDate) {
        this.$toast('请选择游玩日期')
        return
      }
      const postData = {}
      postData.date = this.tempDate
      switch (this.ticketInfo.goods.play_info) {
        case 1: // 只需要一个游玩人信息
          const userName = this.$refs.userSingleInfo.tempUserInfo.name
          const userPhone = this.$refs.userSingleInfo.tempUserInfo.phone
          if (!userName) {
            this.$toast('请输入游客姓名')
            return
          }
          if (!userPhone) {
            this.$toast('请输入游客手机号')
            return
          }
          if (!this.$utils.validator.isPhone(userPhone)) {
            this.$toast('请输入合法的游客手机号')
            return
          }
          postData.user = [this.$refs.userSingleInfo.tempUserInfo]
          break
        case 2: // 只需要多个游玩人信息
          const userList = this.$refs.userInfo.userList
          if (userList.length - 1 !== this.tempDate.num) {
            this.$toast('游客信息与购买数量不匹配')
            return
          }
          postData.user = []
          userList.forEach(item => {
            if (item.type !== 'add') {
              postData.user.push(item)
            }
          })
          break
      }
      postData.info = {
        identity: this.$root.state.identity,
        store_id: this.$root.state.storeId,
        goods_source: this.ticketInfo.goods.goods_source,
        goods_id: this.$route.query.goods_id
      }
      this.$http(this.$urlPath.orderCreate, {
        data: JSON.stringify(postData)
      }, '正在提交…', (data) => {
        this.$toast('订单提交成功')
        this.$router.replace({name: 'orderInfoPay', query: {no: data.data.out_trade_no}})
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'contactsList') {
        if (vm.ticketInfo.goods) {
          if (to.params.contacts) {
            vm.contacts = to.params.contacts
          }
        } else {
          vm.getData()
        }
      } else {
        vm.totalPrice = 0
        vm.contacts = []
        vm.getData()
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.slide-fade-enter-active, .slide-fade-leave-active
    transition all .3s
.slide-fade-enter, .slide-fade-leave-to
    transform translateY($headerHeight)
    opacity 0
.r-d-detail-container
    z-index 0
    .r-d-detail-wrapper
        contentFixed()
        padding-bottom $headerHeight * 2
        .r-d-detail-pay-action-wrapper
            display flex
            height $headerHeight
            background-color #ffffff
            position fixed
            left 0
            right 0
            bottom 0
            align-items center
            border-top 1px solid #f5f5f5
            .r-d-pay-action-price
                flex 1
                margin-left rem(.3)
                & i
                   color $orangeColor
            .r-d-pay-action-collection
                display flex
                padding 0 rem(.3)
                flex-direction column
                align-items center
                & p:nth-child(1)
                    textStyle($orangeColor, .35)
                & p:nth-child(2)
                    margin-top rem(.1)
                    textStyle(#555555, .25)
            .r-d-pay-action-pay
                background-color $orangeColor
                textStyle(#fff, .32)
                display flex
                align-items center
                height 100%
                padding 0 rem(.3)
</style>
