<template>
    <div class="s-d-info-container">
        <div class="s-d-info-header-wrapper">
            <div>
                <span>{{scenicInfo.title}}</span>
                <span>{{scenicInfo.mark}}分</span>
            </div>
            <div class="s-d-info-header-tags-wrapper" v-if="scenicInfo.tags">
                <span>
                    <el-tag type="success" class="s-d-info-tag" size="mini" v-for="(item, index) of scenicInfo.tags" :key="index">{{item}}</el-tag>
                </span>
                <span class="s-d-info-header-saller">已售{{scenicInfo.totalSales}}</span>
            </div>
            <div class="s-d-info-middle-wrapper">
                <slot name="info" :scenicInfo="scenicInfo"></slot>
                <div class="s-d-info-scenic-location-wrapper">
                    <span class="iconfont s-d-info-scenic-location-icon">&#xe850;</span>
                    <div class="s-d-info-scenic-location">
                        <p>{{scenicInfo.city}}</p>
                        <p>{{scenicInfo.tel}}</p>
                    </div>
                    <a :href="'tel:' + scenicInfo.tel" class="iconfont s-d-info-scenic-phone">&#xe6a9;</a>
                </div>
            </div>
        </div>
        <slot name="bottomInfo"></slot>
        <div class="sperator-line"></div>
        <div class="o-i-ticket-safe-container">
            <p>优待客消费保障</p>
            <div class="o-i-ticket-info-tag">
                <span><i class="iconfont">&#xe69e;</i> 入园保障</span>
                <span><i class="iconfont">&#xe69e;</i> 官方</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'scenicDetailInfo',
  props: {
    scenicInfo: Object
  },
  methods: {
    startScenicInfo (type) {
      this.$router.push({name: 'scenicInfo', params: {selected: type}})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-info-container
    .s-d-info-header-wrapper
        padding rem(.3)
        & div:nth-child(1)
            margin-bottom rem(.2)
            overflow hidden
            & span:nth-child(1)
                float left
                normalTextStyle(#333, .35)
                vertical-align middle
            & span:nth-child(2)
                float right
                normalTextStyle(#888, .25)
                border-radius .1rem
                background-color $orangeColor
                color #fff
                padding 0 rem(.2)
        .s-d-info-header-tags-wrapper
            padding-bottom rem(.3)
            borderBottom()
            .s-d-info-tag
                margin-right rem(.2)
                normalTextStyle($primary, .2)
            .s-d-info-header-saller
                float right
                normalTextStyle(#888888, .25)
        .s-d-info-middle-wrapper
            padding-top rem(.3)
            overflow hidden
            .s-d-info-scenic-location-wrapper
                margin-top rem(.3)
                normalTextStyle(#333333, .3)
                line-height rem(.45)
                display flex
                align-items center
                .s-d-info-scenic-location
                    flex 1
                .s-d-info-scenic-phone
                    textStyle($primary, .65)
            .s-d-info-scenic-location-icon
                font-size rem(.4)
                margin-right rem(.2)
                vertical-align top
    .sperator-line
        horizontalLine(#f5f5f5, .1)
    .o-i-ticket-safe-container
        background-color #EDF8F7
        border-top .02rem solid #DDDFDE
        border-bottom .02rem solid #DDDFDE
        padding .2rem
        & p
            color $primary
        .o-i-ticket-info-tag
            overflow hidden
            margin-top .2rem
            line-height .3rem
            & span
                float left
                color #333333
                font-size .2rem
                margin-right .3rem
                & i
                    color $primary
                    font-size .2rem
</style>
