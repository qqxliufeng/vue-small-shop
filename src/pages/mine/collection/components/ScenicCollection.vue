<template>
    <div id="scenic_collection">
        <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
            <ul>
                <li v-for="item of list" :key="item.fs_id">
                    <el-card shadow="always" :body-style="{ padding: '.2rem' }" class="c-item-card">
                        <div class="s-c-content-container">
                            <div>
                                <img v-lazy="$utils.image.getImagePath(item.scenicimages)">
                            </div>
                            <div class="s-c-info-container">
                                <p class="s-c-info-title">
                                    {{item.s_title}}
                                </p>
                                <span class="s-c-info-info">{{item.brief}}
                                </span>
                                <span class='s-c-info-count'>已售{{item.totalSales}}</span>
                            </div>
                        </div>
                        <div class="s-c-line"></div>
                        <div class="s-c-bottom-action-container">
                            <el-button plain size="small" class="s-c-bottom-action" @click="cancleFavorite(item)">取消收藏</el-button>
                            <el-button type="primary" size="small" class="s-c-bottom-action" @click="startScenicInfo(item)">查看详情</el-button>
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
import listHandlerMixin from 'common/mixins/list-mixin'
export default {
  name: 'scenicCollection',
  mixins: [listHandlerMixin],
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('scenic_collection', this.upCallBack),
      list: []
    }
  },
  methods: {
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.userFavoriteScenicUrl, {
        page: page.num
      }, null, (data) => {
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.loadError(mescroll)
      })
    },
    cancleFavorite (item) {
      let confirm = window.confirm('是否要取消收藏？')
      if (confirm) {
        this.$http(this.$urlPath.userUnFavoroteScenicUrl, {
          fs_id: item.fs_id
        }, '正在取消', (data) => {
          this.list.splice(this.list.indexOf(item), 1)
        }, (errorCode, error) => {
          this.$toast(error)
        })
      }
    },
    startScenicInfo (item) {
      this.$router.push({name: 'scenicDetail', query: {scenicId: item.s_id}})
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
                height 1.4rem
                .s-c-info-title
                    color #333
                    font-size .32rem
                .s-c-info-info
                    display inline-block
                    color #888
                    font-size .25rem
                    margin-top .1rem
                    line-height .3rem
                    height .9rem
                    muitlLineEllipsis(3)
                .s-c-info-count
                    display inline-block
                    color #aaa
                    font-size .2rem
                    margin-top .2rem
                    float right
        .s-c-line
            border .01rem solid #f5f5f5
            margin .3rem 0
        .s-c-bottom-action-container
            display flex
            justify-content flex-end
</style>
