<template>
    <div id="#order_refund_list_item">
         <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
             <ul>
                 <li v-for="(item,index) of list" :key="index">
                     <el-card shadow="always"  :body-style="{ padding: '.2rem' }" class="o-l-item-card">
                        <div class="o-l-item-container" @click="orderItemClick(item)">
                            <div class="o-l-item-img-container">
                                <img v-lazy="$utils.image.getImagePath(item.scenicimage)" :key="item.scenicimage">
                            </div>
                            <div class="o-l-item-info-container">
                                <p>
                                  <span>{{item.orders.ord_product_name}}</span>
                                  <span class="o-l-item-info-state">{{item.stateModel.stateTip}}</span>
                                </p>
                                <p>
                                  <span>{{item.stateModel.time.title}}
                                    <count-down :time="item.stateModel.time.time"
                                                v-if="item.status === 'PAY_STATUS_NO'"
                                                @end="countDownEnd(item)">
                                        <template slot-scope="props">
                                            <span class="time-wrapper">
                                                {{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}
                                            </span>
                                        </template>
                                    </count-down>
                                    <span v-else>{{item.stateModel.time.time}}</span>
                                  </span>
                                </p>
                                <p>退票数量:{{item.refund_num}}张</p>
                                <p>退款金额:￥{{item.refund_amount}}</p>
                            </div>
                        </div>
                        <div class="sperator-line" v-if="item.stateModel.action1.show || item.stateModel.action2.show"></div>
                        <div class="o-l-bottom-action-container">
                            <el-button plain size="small" class="o-l-bottom-action" v-if="item.stateModel.action1.show" @click="item.stateModel.action1.action">{{item.stateModel.action1.title}}</el-button>
                            <el-button type="primary" size="small" class="o-l-bottom-action" v-if="item.stateModel.action2.show" @click="item.stateModel.action2.action">{{item.stateModel.action2.title}}</el-button>
                        </div>
                     </el-card>
                 </li>
             </ul>
         </mescroll-vue>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import CountDown from 'common/components/countdown/countdown'
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'orderListItem',
  mixins: [listMixin],
  props: {
    state: Number
  },
  components: {
    MescrollVue,
    CountDown
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('#order_refund_list_item', this.upCallBack),
      list: [],
      serverTime: 0
    }
  },
  methods: {
    orderItemClick (item) {
      this.$router.push({name: 'orderInfo', params: {orderId: item.rid.toString(), orderType: item.stateModel.orderType}})
    },
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.orderRefundList, {
        status: this.state,
        page: page.num
      }, null, (data) => {
        this.serverTime = data.time
        if (data.data && data.data instanceof Array) {
          data.data.forEach(it => {
            switch (it.status) {
              case 'REFUND_STATUS': // 退款待审核
                it.stateModel = {
                  stateTip: '退款待审核',
                  orderType: '4',
                  time: {
                    title: '申请时间:',
                    time: it.refund_create_time
                  },
                  action1: {
                    title: '联系客服',
                    show: true,
                    action: () => {
                    }
                  },
                  action2: {
                    title: '取消退款',
                    show: true,
                    action: () => {
                      let confirm = window.confirm('是否要取消退款？')
                      if (confirm) {
                        this.$http(this.$urlPath.orderCancelRefund, {
                          rid: it.rid
                        }, '正在取消…', (result) => {
                          this.reload()
                          this.$root.$emit('onReload')
                          this.$toast('取消退款成功')
                        }, (errorCode, error) => {
                          this.$toast(error)
                        })
                      }
                    }
                  }
                }
                break
              case 'REFUND_STATUS_YES': // 退款审核成功
                it.stateModel = {
                  stateTip: '审核成功',
                  orderType: '4',
                  time: {
                    title: '申请时间:',
                    time: it.refund_create_time
                  },
                  action1: {
                    title: '联系客服',
                    show: true,
                    action: () => {
                    }
                  },
                  action2: {
                    title: '取消退款',
                    show: false,
                    action: null
                  }
                }
                break
              case 'REFUND_STATUS_NO': // 退款审核失败
                it.stateModel = {
                  stateTip: '审核失败',
                  orderType: '4',
                  time: {
                    title: '申请时间:',
                    time: it.refund_create_time
                  },
                  action1: {
                    title: '联系客服',
                    show: true,
                    action: () => {
                    }
                  },
                  action2: {
                    title: '取消退款',
                    show: false,
                    action: null
                  }
                }
                break
              case 'REFUND_PAY': // 退款待支付
                it.stateModel = {
                  stateTip: '审核成功',
                  orderType: '4',
                  time: {
                    title: '申请时间:',
                    time: it.refund_create_time
                  },
                  action1: {
                    title: '联系客服',
                    show: true,
                    action: () => {
                    }
                  },
                  action2: {
                    title: '取消退款',
                    show: false,
                    action: null
                  }
                }
                break
              case 'REFUND_PAY_YES': // 退款支付成功
                it.stateModel = {
                  stateTip: '审核成功',
                  orderType: '4',
                  time: {
                    title: '申请时间:',
                    time: it.refund_create_time
                  },
                  action1: {
                    title: '',
                    show: false,
                    action: null
                  },
                  action2: {
                    title: '取消退款',
                    show: false,
                    action: null
                  }
                }
                break
              case 'REFUND_PAY_NO': // 退款支付失败
                it.stateModel = {
                  stateTip: '审核失败',
                  orderType: '6',
                  time: {
                    title: '申请时间:',
                    time: it.refund_create_time
                  },
                  action1: {
                    title: '联系客服',
                    show: true,
                    action: () => {
                    }
                  },
                  action2: {
                    title: '取消退款',
                    show: false,
                    action: null
                  }
                }
                break
            }
          })
        }
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.loadError(mescroll)
      })
    },
    countDownEnd (item) {
      item.stateModel.action2.show = false
    },
    reload () {
      this.list.length = 0
      this.$refs.mescroll.mescroll.resetUpScroll(true)
    }
  },
  mounted () {
    this.$root.$on('onReload', () => {
      if (this.$refs.mescroll) {
        this.reload()
      }
    })
  }
}
</script>
  <style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixin.styl'
  .mescroll
      mescroller()
      .o-l-item-card
          margin .2rem
          .o-l-item-container
            display flex
            .o-l-item-img-container
                flex 1.2
                overflow hidden
                height 1.7rem
                & img
                  width 100%
                  height 100%
                  object-fit cover
            .o-l-item-info-container
                flex 3
                padding-left .1rem
                display flex
                flex-direction column
                justify-content space-between
                overflow hidden
                & p:nth-child(1)
                    display flex
                    & span:nth-child(1)
                        flex 3
                        overflow hidden
                        ellipsis()
                        color #333333
                        font-size .3rem
                    .o-l-item-info-state
                        text-align right
                        color #888888
                        font-size .25rem
                        line-height .3rem
                & p:nth-child(2)
                     & span:nth-child(1)
                        color #888888
                        font-size .28rem
                        .time-wrapper
                            textStyle($primary, .3)
                & p:nth-child(3) , & p:nth-child(4)
                     color #888888
                     font-size .28rem
.sperator-line
    border-bottom .02rem solid #f5f5f5
    margin .2rem 0
.o-l-bottom-action-container
    display flex
    justify-content flex-end
</style>
