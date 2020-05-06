<template>
    <div class="s-d-hot-item-wrapper">
        <div class="s-d-hot-item-info" @click="itemClick">
            <div class="s-d-hot-item-info-title-wrapper">
                <p class="s-d-hot-item-info-title">{{item.goodsTitle}}</p>
                <div class="s-d-hot-item-info-price"><span>￥{{item.minPrice}}</span></div>
            </div>
            <div class="s-d-hot-item-info-remark-wrapper">
                <!-- <p class="s-d-hot-item-info-remark">{{item.before}}</p> -->
                 <div class="tags">
                    <span v-for="(itemTag, index) of item.tag" :key="index" class="tag">
                        <el-tag size="mini" :type=" index === 0 ? 'success' : 'danger'" v-if="itemTag">{{itemTag}}</el-tag>
                    </span>
                 </div>
                <p class="s-d-hot-item-info-old-price">￥{{item.retailPrice}}</p>
            </div>
            <div class="s-d-hot-item-info-info-wrapper">
                <div class="s-d-hot-item-info-info-info">
                    <p>
                        <span v-if="item.totalSales > 0">已售{{$utils.common.trasformNum(item.totalSales)}}</span>
                        <span class="ticket-must">购票须知<i class="el-icon-arrow-right"></i></span>
                        <span class="ticket-must" @click.stop="getCounpon">领券<i class="el-icon-arrow-right"></i></span>
                    </p>
                </div>
                <div class="s-d-hot-item-info-info-action">
                    <el-button type="primary" size="mini" class="button">立即预订</el-button>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <!-- <div class="s-d-hot-item-will-online">
            【即将上线】距离开始还有10时10分
        </div> -->
    </div>
</template>

<script>
export default {
  name: 'scenicDetailTicketItem',
  props: {
    item: Object
  },
  data () {
    return {
      isLoadCoupon: false,
      coupon: [
        // {
        //   condition: '0.00',
        //   create_time: null,
        //   goods_ids: '78',
        //   id: 1,
        //   money: '10.00',
        //   name: '优惠券',
        //   receive_num: 5,
        //   send_end_date: '2020-05-21',
        //   send_num: 1000,
        //   send_start_date: '2020-04-21',
        //   send_status: 1,
        //   send_type: 1,
        //   status: this.state,
        //   store_id: 2,
        //   type: 2,
        //   use_end_date: '2020-06-01',
        //   use_num: 0,
        //   use_start_date: '2020-04-21',
        //   use_status: 1,
        //   is_receive: 0
        // },
        // {
        //   condition: '0.00',
        //   create_time: null,
        //   goods_ids: '78',
        //   id: 2,
        //   money: '10.00',
        //   name: '优惠券',
        //   receive_num: 5,
        //   send_end_date: '2020-05-21',
        //   send_num: 1000,
        //   send_start_date: '2020-04-21',
        //   send_status: 1,
        //   send_type: 1,
        //   status: this.state,
        //   store_id: 2,
        //   type: 2,
        //   use_end_date: '2020-06-01',
        //   use_num: 0,
        //   use_start_date: '2020-04-21',
        //   use_status: 1,
        //   is_receive: 0
        // }
      ]
    }
  },
  methods: {
    itemClick () {
      this.$emit('reseve-detail', this.item)
    },
    getCounpon () {
      if (this.isLoadCoupon) {
        if (this.coupon && this.coupon.length > 0) {
          this.$emit('counpon', this.coupon)
        } else {
          this.$toast('来晚啦，优惠券已领完~')
        }
      } else {
        this.$http(this.$urlPath.seekCoupon, {
          store_id: this.$route.query.t,
          goods_id: this.item.goodsId
        }, '', (res) => {
          this.isLoadCoupon = true
          this.coupon = res.data
          if (this.coupon && this.coupon.length > 0) {
            this.$emit('counpon', this.coupon)
          } else {
            this.$toast('来晚啦，优惠券已领完~')
          }
        }, (errerCode, error) => {
          this.isLoadCoupon = true
          this.$toast('来晚啦，优惠券已领完~')
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-hot-item-wrapper
    position relative
    .line
        width 90%
        height 1px
        background-color #eee
        margin 0 auto
    .s-d-hot-item-info
        padding rem(.2)
        .s-d-hot-item-info-title-wrapper
            padding rem(.1) 0
            overflow hidden
            display flex
            justify-content space-between
            justify-items center
            .s-d-hot-item-info-title
                textStyle(#333, .3)
                flex 1
            .s-d-hot-item-info-price
                & span
                    textStyle($primary, .4)
        .s-d-hot-item-info-remark-wrapper
            position relative
            height rem(.5)
            .s-d-hot-item-info-remark
                position absolute
                top 0
                left 0
                right rem(1)
                ellipsis()
                normalTextStyle(#888888, .25)
            .s-d-hot-item-info-old-price
                position absolute
                top 0
                right 0
                normalTextStyle(#888888, .25)
                text-decoration line-through
            .tags
                .tag
                    margin 0 rem(.1)
                    & >>> .el-tag
                        background-color transparent
                        border-radius 1px
                    & >>> .el-tag--success
                        background-color transparent
                    & >>> .el-tag--danger
                        background-color transparent
        .s-d-hot-item-info-info-wrapper
            display flex
            justify-content center
            align-items center
            .s-d-hot-item-info-info-info
                overflow hidden
                flex 1
                & p:nth-child(1)
                    margin-top rem(.1)
                    normalTextStyle(#888888, .25)
                    & span:nth-child(1)
                        margin 0 rem(.1)
                .ticket-must
                    textStyle($orangeColor, .25)
        .button
            background $orangeColor
            border-color $orangeColor
    .s-d-hot-item-will-online
        background-color #FEEBC6
        normalTextStyle($orangeColor, .28)
</style>
