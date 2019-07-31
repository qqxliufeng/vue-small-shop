<template>
  <div class='activity-list-container'>
    <navi title="活动列表" :isFixed="true"></navi>
    <div>
      <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
        <ul id="actvity_list">
          <li v-for="item of list" :key="item.assist_id">
            <div class="list-wrapper" @click="itemClick(item)">
              <div class="img-wrapper">
                <img v-lazy="$utils.image.getImagePath(item.scenicimages)">
              </div>
              <div class="content-wrapper">
                <p class="title">{{item.goods_title}}</p>
                <div class="info-wrapper">
                  <span class="rate">4.9分</span>
                  <span class="sales">已售{{$utils.common.trasformNum(item.sales_number || 0)}}</span>
                  <span class="price">￥{{item.retail_price}}</span>
                </div>
                <div class="tag-wrapper">
                  <span v-for="(tag,index) of item.tag" :class="{'tag-1' : index % 2 === 0, 'tag-2' : index % 2 === 1}" :key="index">{{tag}}</span>
                </div>
                <div class="release-time">
                  <span class="time">时间:
                    <count-down :time="(item.end_time - time) * 1000">
                      <template slot-scope="props">
                          <span style="display:none">{{releaseDays = props.days}}</span>
                          <span class="time-wrapper"><span class="time-bg">{{ props.days }}</span><i>天</i><span class="time-bg">{{ props.hours }}</span><i>时</i><span class="time-bg">{{ props.minutes }}</span><i>分</i><span  class="time-bg">{{ props.seconds }}</span><i>秒</i>
                          </span>
                      </template>
                    </count-down>
                  </span>
                  <span class="new-price"><i>￥{{item.min_price}}</i>起</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import listMixin from 'common/mixins/list-mixin'
import CountDown from 'common/components/countdown/countdown'
export default {
  name: 'activityList',
  mixins: [listMixin],
  components: {
    navi,
    MescrollVue,
    CountDown
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('actvity_list', this.upCallBack),
      list: [],
      time: 0
    }
  },
  methods: {
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.assistList, {
        identity: this.$root.state.getSallerInfo().identity,
        store_id: this.$root.state.getSallerInfo().storeId,
        page: page.num
      }, null, (data) => {
        this.time = data.time
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.loadError(mescroll)
      })
    },
    itemClick (item) {
      this.$router.push({name: 'activityTicketDetail',
        query: {
          aid: item.assist_id,
          scenicId: item.scenic_id,
          goods_id: item.goods_id,
          identity: this.$root.state.getSallerInfo().identity,
          storeId: this.$root.state.getSallerInfo().storeId
        }})
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.activity-list-container
    .mescroll
        mescroller()
        top $headerHeight
        height 93%
    .list-wrapper
        display flex
        padding rem(.2)
        border-bottom 1px solid #f5f5f5
        .img-wrapper
            width 30%
            height rem(1.8)
            & > img
                width 100%
                height 100%
                object-fit cover
                border-radius rem(.1)
        .content-wrapper
            flex 1
            display flex
            justify-content space-between
            flex-direction column
            padding-left rem(.2)
            box-sizing border-box
            overflow hidden
            .title
                ellipsis()
                textStyle(#333, .3)
            .info-wrapper
                overflow hidden
                font-size rem(.25)
                .rate
                    color $primary
                    &::after
                        content "|"
                        display inline-block
                        margin 0 rem(.2)
                .sales
                    color #888
                .price
                    color #888
                    float right
                    text-decoration line-through
            .tag-wrapper
                color #555
                font-size rem(.2)
                .tag-1
                    border 1px solid $primary
                    padding rem(0) rem(.03)
                    color $primary
                .tag-2
                    border 1px solid $orangeColor
                    padding rem(0) rem(.03)
                    color $orangeColor
                    margin-left rem(.1)
            .release-time
                overflow hidden
                .time
                    textStyle(#666, .22)
                    line-height rem(.4)
                    .time-wrapper
                        .time-bg
                            color $primary
                        & > i
                            margin 0 rem(.02)
                            font-size rem(.2)
                .new-price
                    color #888
                    font-size rem(.22)
                    float right
                    & > i
                        color $orangeColor
                        font-size rem(.4)
</style>
