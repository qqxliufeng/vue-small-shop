<template>
    <div id="shop_collection">
        <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
            <ul>
                <li v-for="(item,index) of shopList" :key="index">
                    <el-card shadow="always" :body-style="{ padding: '.2rem' }" class="c-item-card">
                        <div class="s-c-content-container">
                            <div>
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550046367219&di=9e4765dc6953bf2e0ab8c3dfbd47855a&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft01d8dbb2157c53cc27.jpg">
                            </div>
                            <div class="s-c-info-container">
                                <p class="s-c-info-title">
                                    {{item.name}}
                                </p>
                                <span class="s-c-info-info">店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告
                                    店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告店铺公告
                                </span>
                            </div>
                        </div>
                        <div class="s-c-line"></div>
                        <div class="s-c-bottom-action-container">
                            <el-button plain size="small" class="s-c-bottom-action">取消收藏</el-button>
                            <el-button type="primary" size="small" class="s-c-bottom-action">查看详情</el-button>
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
  name: 'shopCollection',
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('shop_collection', this.upCallback),
      shopList: []
    }
  },
  methods: {
    upCallback (page, mescroll) {
      setTimeout(() => {
        this.shopList.push({name: 'new'})
        this.shopList.push({name: 'new'})
        this.shopList.push({name: 'new'})
        this.shopList.push({name: 'new'})
        if (page.num > 4) {
          mescroll.endSuccess(0)
        } else {
          mescroll.endSuccess(100)
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
    .c-item-card
        margin .2rem
        .s-c-content-container
            display flex
            flex-direction row
            overflow hidden
            & div:nth-child(1)
                flex 1.5
                overflow hidden
                height 1.7rem
                & img
                    width 100%
                    height 100%
                    object-fit cover
        .s-c-info-container
            flex 3
            margin-left .1rem
            height 1.7rem
            .s-c-info-title
                color #333
                font-size .32rem
            .s-c-info-info
                display inline-block
                color #888
                font-size .25rem
                margin-top .1rem
                padding .1rem 0
                line-height .3rem
                muitlLineEllipsis(4)
        .s-c-line
            border .01rem solid #f5f5f5
            margin .3rem 0
        .s-c-bottom-action-container
            display flex
            justify-content flex-end
</style>
