<template>
    <div :id="'coupon_item_' + state">
      <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
        <ul v-if="list">
           <li v-for="(item,index) of list" :key="index">
               <el-card shadow="always" class="c-item-card" :body-style="{ padding: '0px' }">
                   <div class="c-content-container">
                      <div class="c-item-content-container">
                            <div class="c-item-count">
                              <div :class="{'c-item-state-1-primary' : state === '1'}">
                                <i>￥</i><span>5</span>
                              </div>
                              <p :class="{'c-item-state-1-black' : state === '1'}">满20元可用</p>
                            </div>
                            <div class="c-item-line">
                                <span></span>
                                <span></span>
                            </div>
                            <div @click="showRemark(index)" class="c-item-info">
                              <div :class="{'c-item-state-1-black' : state === '1'}">
                                <div>XX优惠券</div>
                                <div>有效期2018-1-1至2018-1-1</div>
                                <div class="iconfont">使用说明 &#xe63d;</div>
                                <span class="iconfont c-state-tag" v-if="state !== '1'">{{ state === '2' ? '&#xe643;' : '&#xe668;'}}</span>
                              </div>
                            </div>
                      </div>
                      <div class="c-item-content-remark-container" :ref="'contentRemarkContainer'+index">
                        <span></span>
                        <div class="c-item-content-bottom-circle-container">
                          <span class="c-item-content-bottom-circle"></span>
                        </div>
                        <span></span>
                        <div class="c-item-content-remark" :style="{ color: state === '1' ? '#333333' : '#cccccc' }">
                          这是备注这是备注这是备注这是
                        </div>
                      </div>
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
import listMixins from 'common/mixins/list-mixin'
export default {
  name: 'couponItem',
  mixins: [listMixins],
  props: {
    state: {
      type: String,
      default: '1'
    }
  },
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('coupon_item_' + this.state, this.upCallBack),
      list: []
    }
  },
  methods: {
    showRemark (index) {
      const item = this.couponList[index]
      item.isShowRemark = !item.isShowRemark
      const remark = this.$refs['contentRemarkContainer' + index][0]
      if (item.isShowRemark) {
        remark.style.minHeight = '1.5rem'
      } else {
        remark.style.minHeight = '0px'
      }
    },
    upCallBack (page, mescroll) {
      mescroll.endSuccess(0)
      // setTimeout(() => {
      //   this.couponList.push({
      //     isShowRemark: false
      //   })
      //   this.couponList.push({
      //     isShowRemark: false
      //   })
      //   this.couponList.push({
      //     isShowRemark: false
      //   })
      //   this.couponList.push({
      //     isShowRemark: false
      //   })
      //   if (page.num > 4) {
      //     mescroll.endSuccess(0)
      //   } else {
      //     mescroll.endSuccess(100)
      //   }
      // }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.mescroll
  mescroller()
  .c-item-card
    margin .2rem
    .c-content-container
      display flex
      flex-direction column
      .c-item-content-container
        display flex
        flex-direction row
        flex 3
        .c-item-count
            padding .5rem 0
            flex 5
            text-align center
            color #CCCCCC
            & span
              font-size .8rem
            & > i
              font-size .35rem
            & > p
              font-size .25rem
              margin-top .2rem
        .c-item-line
            width .2rem
            position relative
            & span:nth-child(1)
              display inline-block
              width 100%
              position absolute
              top 0
              left 0
              right 0
              width .2rem
              height .2rem
              border-radius 50%
              background-color #EEEEEE
              margin-top -50%
            & span:nth-child(2)
              position absolute
              left 50%
              right 0
              top .25rem
              bottom .25rem
              display inline-block
              width .002rem
              margin-left -1px
              border 1px dashed #eeeeee
        .c-item-info
            position relative
            flex 10
            text-align start
            display flex
            flex-direction column
            justify-content center
            color #cccccc
            box-sizing border-box
            margin-left .2rem
            & div:nth-child(2)
              margin .15rem 0
              font-size .22rem
            & div:nth-child(3)
              font-size .22rem
            .c-state-tag
              position absolute
              color #eeeeee
              top 0rem
              right -.25rem
              font-size 1.5rem
      .c-item-content-remark-container
        flex 1
        position relative
        display flex
        & span:nth-child(1)
          flex 5
        .c-item-content-bottom-circle-container
            width .2rem
            position relative
          .c-item-content-bottom-circle
            width 100%
            position absolute
            bottom 0
            left 0
            width .2rem
            height .2rem
            border-radius 50%
            background-color #EEEEEE
            margin-bottom -50%
            z-index 99
        & span:nth-child(3)
          flex 10
          margin-left .2rem
        .c-item-content-remark
          background-color #F8FBFA
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          padding .25rem
          box-sizing border-box
          color #bbbbbb
          font-size .28rem
          line-height .3rem
.c-item-state-1-primary
  color $primary
.c-item-state-1-black
  color #333333
</style>
