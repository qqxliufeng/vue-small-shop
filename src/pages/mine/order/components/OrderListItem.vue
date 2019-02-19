<template>
    <div id="order_list_item">
         <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
             <ul>
                 <li v-for="(item,index) of orderList" :key="index">
                     <el-card shadow="always"  :body-style="{ padding: '.2rem' }" class="o-l-item-card">
                        <div class="o-l-item-container" @click="orderItemClick(item)">
                            <div class="o-l-item-img-container">
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550046367219&di=9e4765dc6953bf2e0ab8c3dfbd47855a&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft01d8dbb2157c53cc27.jpg">
                            </div>
                            <div class="o-l-item-info-container">
                                <p>
                                  <span>{{item.name}}</span>
                                  <span class="o-l-item-info-state">{{item.stateTip}}</span>
                                </p>
                                <p>
                                  <span>剩余支付时间：</span>
                                  <span>{{item.time}}</span>
                                </p>
                                <p>{{item.num}}</p>
                                <p>{{item.totalPrice}}</p>
                            </div>
                        </div>
                        <div class="sperator-line"></div>
                        <div class="o-l-bottom-action-container">
                            <el-button plain size="small" class="o-l-bottom-action">取消收藏</el-button>
                            <el-button type="primary" size="small" class="o-l-bottom-action">查看详情</el-button>
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
export default {
  name: 'orderListItem',
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('order_list_item', this.upCallBack),
      orderList: []
    }
  },
  methods: {
    orderItemClick (item) {
      switch (item.state) {
        case 1:
          this.$router.push({name: 'orderInfo', params: {orderType: '1'}})
          break
        case 2:
          this.$router.push({name: 'orderInfo', params: {orderType: '2'}})
          break
        case 3:
          this.$router.push({name: 'orderInfo', params: {orderType: '3'}})
          break
        case 4:
          this.$router.push({name: 'orderInfo', params: {orderType: '4'}})
          break
      }
    },
    upCallBack (page, mescroll) {
      setTimeout(() => {
        this.orderList.push({
          name: '卧虎山滑雪场成人票卧虎山滑雪场成人票卧虎山滑雪场成人票',
          time: '0:30:19',
          num: '数量：1/1',
          totalPrice: '总价：￥100',
          stateTip: '待付款',
          state: 1
        })
        this.orderList.push({
          name: '卧虎山滑雪场成人票卧虎山滑雪场成人票卧虎山滑雪场成人票',
          time: '0:30:19',
          num: '数量：1/1',
          totalPrice: '总价：￥100',
          stateTip: '待使用',
          state: 2
        })
        this.orderList.push({
          name: '卧虎山滑雪场成人票卧虎山滑雪场成人票卧虎山滑雪场成人票',
          time: '0:30:19',
          num: '数量：1/1',
          totalPrice: '总价：￥100',
          stateTip: '待评价',
          state: 3
        })
        this.orderList.push({
          name: '卧虎山滑雪场成人票卧虎山滑雪场成人票卧虎山滑雪场成人票',
          time: '0:30:19',
          num: '数量：1/1',
          totalPrice: '总价：￥100',
          stateTip: '售后中',
          state: 4
        })
        if (page.num > 4) {
          mescroll.endSuccess(0)
        } else {
          mescroll.endSuccess(10)
        }
      }, 1000)
    }
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
                        flex 1
                        text-align right
                        color #888888
                        font-size .25rem
                        line-height .3rem
                & p:nth-child(2)
                     & span:nth-child(1)
                        color #888888
                        font-size .28rem
                     & span:nth-child(2)
                        color $primary
                        font-size .28rem
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
