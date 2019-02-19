<template>
    <div class="s-d-hot-container">
        <div class="s-d-hot-title-wrapper">
            <span class="iconfont s-d-hot-title-icon">&#xe6a0;</span>
            <span>热门推荐</span>
        </div>
        <ul>
           <li v-for="(item, index) of hotList" :key="index">
               <div class="s-d-hot-item-wrapper">
                   <div class="s-d-hot-item-info">
                       <div class="s-d-hot-item-info-title-wrapper">
                           <p class="s-d-hot-item-info-title">{{item.name}}</p>
                           <p class="s-d-hot-item-info-price"><span>￥89</span><i>起</i></p>
                       </div>
                       <div class="s-d-hot-item-info-remark-wrapper">
                           <p class="s-d-hot-item-info-remark">{{item.remark}}</p>
                           <p class="s-d-hot-item-info-old-price">￥200</p>
                       </div>
                       <div class="s-d-hot-item-info-info-wrapper">
                           <div class="s-d-hot-item-info-info-info">
                               <p>
                                   <el-tag type="success" size="mini" class="s-d-hot-item-info-info-info-tag">立减2元</el-tag>
                                   <el-tag type="success" size="mini" class="s-d-hot-item-info-info-info-tag">立减2元</el-tag>
                               </p>
                               <p>
                                   已售1234   |   <span>预定须知</span>
                               </p>
                           </div>
                           <div class="s-d-hot-item-info-info-action">
                                <el-button type="primary" size="mini">立即预定</el-button>
                           </div>
                       </div>
                   </div>
                   <div class="s-d-hot-item-will-online"></div>
               </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'ScenicDetailHot',
  data () {
    return {
      hotList: [
        {
          name: '工作日成日票',
          remark: '请在游玩前1小时预订'
        },
        {
          name: '工作日成日票',
          remark: '请在游玩前1小时预订'
        },
        {
          name: '工作日成日票',
          remark: '请在游玩前1小时预订请在游玩前1小时预订请在游玩前1小时预订请在游玩前1小时预订请在游玩前1小时预订请在游玩前1小时预订'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-hot-container
    .s-d-hot-title-wrapper
        padding rem(.2)
        borderBottom()
        .s-d-hot-title-icon
            color $orangeColor
            font-size rem(.5)
            vertical-align middle
            margin-right rem(.2)
            & + span
                vertical-align middle
                font-size rem(.35)
    .s-d-hot-item-wrapper
        position relative
        border-bottom #f5f5f5 solid rem(.05)
        .s-d-hot-item-info
            padding rem(.2)
            .s-d-hot-item-info-title-wrapper
                padding rem(.1) 0
                overflow hidden
                .s-d-hot-item-info-title
                    float left
                    normalTextStyle(#333, .32)
                .s-d-hot-item-info-price
                    float right
                    & span
                        normalTextStyle($primary, .4)
                    & i
                        normalTextStyle(#888888, .2)
                        margin-left rem(.1)
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
    .s-d-hot-item-info-info-wrapper
        display flex
        justify-content center
        align-items center
        margin-top rem(.1)
        .s-d-hot-item-info-info-info
            overflow hidden
            flex 5
            & p:nth-child(2)
                margin-top rem(.1)
                normalTextStyle(#888888, .25)
        .s-d-hot-item-info-info-action
            flex 1
</style>
