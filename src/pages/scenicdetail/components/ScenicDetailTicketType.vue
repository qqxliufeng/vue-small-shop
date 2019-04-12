<template>
    <div class="s-d-t-type-container">
        <div class="s-d-t-type-title-wrapper">
             <span>门票类型</span>
        </div>
        <div>
            <el-tabs v-if="typeGoodsList">
                <el-tab-pane v-for="tabItem of typeGoodsList" :label="tabItem.goodsTypeName" :key="tabItem.goodsTypeId">
                    <ul v-if="tabItem.goods_list && tabItem.goods_list.length > 0">
                        <li v-for="item of tabItem.goods_list" :key="item.goodsId">
                            <scenic-detail-ticket-item :item="item"></scenic-detail-ticket-item>
                        </li>
                    </ul>
                    <div v-else class="s-d-l-m-message-empty">
                        <span>暂无门票</span>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import ScenicDetailTicketItem from './ScenicDetailTicketItem'
export default {
  name: 'scenicDetailTicketType',
  props: {
    typeGoodsList: Array
  },
  components: {
    ScenicDetailTicketItem
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-t-type-container
    border-top #f5f5f5 solid rem(.1)
    .s-d-t-type-title-wrapper
        padding rem(.2)
        normalTextStyle(#333, .35)
        borderBottom()
    .s-d-t-type-wrapper
        padding rem(.2)
    & >>> .el-tabs__nav-scroll
        margin 0 rem(.1)
    .s-d-l-m-message-empty
        display flex
        justify-content center
        align-items center
        min-height rem(2)
        normalTextStyle(#888, .3)
</style>
