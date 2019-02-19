<template>
    <div class="o-i-back-money-container">
        <navi title="退款申请" :isFixed="true"></navi>
        <div class="o-i-back-content-container">
            <order-info-header>
                <template slot="headerTitleInfo">
                    <span class="o-i-back-money-remark">
                        查看退款说明
                        <i class="el-icon-question"></i>
                    </span>
                </template>
                <template slot="headerTitleInfo">
                    <p class="o-i-use-info">
                        产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用产品已出票，请尽快使用
                    </p>
                </template>
                <template slot="headerBottomInfo">
                    <div>
                        <order-step></order-step>
                    </div>
                </template>
            </order-info-header>
            <p class="o-i-back-money-goods">商品</p>
            <div class="o-i-back-money-goods-info-wrapper">
                <div>
                    <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2111229976,2860914838&fm=58&bpow=500&bpoh=399">
                </div>
                <div>
                    <p>卧虎山滑雪场成人票卧虎山滑雪场成人票卧虎山滑雪场成人票</p>
                    <p>数量：1</p>
                    <p>总价：￥22222</p>
                </div>
            </div>
            <div class="o-i-back-l-f">
                <span>
                    退款原因
                </span>
                <span @click="showBackMoneyReason">
                    选择退款原因
                    <i class="el-icon-arrow-right"></i>
                </span>
            </div>
            <div class="o-i-back-l-f">
                <span class="o-i-back-money-num">
                    退票数量
                </span>
                <span>
                    <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" size="mini"></el-input-number>
                </span>
            </div>
            <div class="o-i-back-l-f">
                <span>
                    退款金额
                </span>
                <span>
                    <strong>￥26.00</strong>
                    <i class="el-icon-arrow-right"></i>
                </span>
            </div>
            <div>
                <p v-for="(item,index) of moneyDetailList" :key="index" class="o-i-info-money-detail">
                    <span class="span-color-1" :class="{'span-color-3': index == moneyDetailList.length - 1}">{{item.name}}</span>
                    <span class="span-color-2" :class="{'span-color-4': index == moneyDetailList.length - 1}">{{item.money}}</span>
                </p>
            </div>
            <div class="sperator-line"></div>
            <p class="o-i-back-money-goods">留言</p>
            <div class="o-i-back-money-leave-message-wrapper">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="textarea">
                    </el-input>
            </div>
            <p class="o-i-back-money-submit">提交</p>
            <el-dialog title="选择退款原因" :visible.sync="isShowReasonDialog" width="80%">
                <div>
                    <div v-for="(item, index) of backMoneyReasons" :key="index" class="o-i-back-money-reason-item">
                        <el-radio v-model="radio" :label="index">{{item}}</el-radio>
                    </div>
                    <!-- <el-input v-model="input" placeholder="请输入内容" class="o-i-back-money-reason-input" size="medium"></el-input> -->
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
import orderInfoHeader from './components/OrderInfoHeader'
import orderStep from './components/OrderStep'
export default {
  name: 'orderBackMoney',
  components: {
    navi,
    orderInfoHeader,
    orderStep
  },
  data () {
    return {
      num: 1,
      isShowReasonDialog: false,
      radio: '1',
      backMoneyReasons: [
        '这是原因1',
        '这是原因1',
        '这是原因1',
        '这是原因1',
        '这是原因1',
        '这是原因1',
        '这是原因1',
        '这是原因1'
      ],
      moneyDetailList: [
        {
          name: '成人票',
          money: '￥29.00'
        },
        {
          name: '成人票',
          money: '￥29.00'
        },
        {
          name: '成人票',
          money: '￥29.00'
        },
        {
          name: '成人票',
          money: '￥29.00'
        }
      ]
    }
  },
  methods: {
    showBackMoneyReason () {
      this.isShowReasonDialog = !this.isShowReasonDialog
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-back-money-container
    .o-i-back-content-container
        margin-top $headerHeight
        .o-i-use-info
            color #eeeeee
            font-size .25rem
            margin-top .2rem
            line-height .3rem
        .o-i-back-money-remark
            float right
            color #ffffff
            font-size .28rem
            line-height .3rem
        .o-i-back-money-goods
            color #333
            padding .3rem .2rem
            font-size .34rem
        .o-i-back-money-goods-info-wrapper
            display flex
            background-color #f5f5f5
            padding .2rem
            & div:nth-child(1)
                flex 1
                overflow hidden
                height 1.4rem
                & img
                    width 100%
                    height 100%
                    object-fit cover
            & div:nth-child(2)
                display flex
                overflow hidden
                flex 3
                flex-direction column
                justify-content space-between
                margin-left .2rem
                & p:nth-child(1)
                    color #333
                    font-size .32rem
                    line-height .35rem
                    ellipsis()
                & p:nth-child(2), & p:nth-child(3)
                    color #888
                    font-size .28rem
                    line-height .3rem
        .o-i-back-l-f
            overflow hidden
            width 100%
            padding .3rem .2rem
            font-size .28rem
            line-height .3rem
            box-sizing border-box
            borderBottom()
            & span:nth-child(1)
                float left
            & span:nth-child(2)
                float right
                color #888
                & strong
                    color $orangeColor
            .o-i-back-money-num
                margin-top .14rem
        .o-i-info-money-detail
            overflow hidden
            margin .2rem 0
            line-height .3rem
            padding 0 .2rem
            & span:nth-child(1)
                float left
            & span:nth-child(2)
                float right
            .span-color-1
                color #888888
                font-size .25rem
            .span-color-2
                color #333333
                font-size .25rem
            .span-color-3
                color #333333
                font-size .28rem
            .span-color-4
                color $orangeColor
                font-size .28rem
        .sperator-line
            background-color #f5f5f5
            height .1rem
        .o-i-back-money-leave-message-wrapper
            padding 0 .2rem
        .o-i-back-money-submit
            text-align center
            color #ffffff
            font-size .35rem
            line-height 1rem
            margin-top .3rem
            background-color $primary
        .o-i-back-money-reason-item
            margin .4rem 0
        .o-i-back-money-reason-input
            font-size .3rem
</style>
