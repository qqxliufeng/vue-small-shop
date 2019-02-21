<template>
    <div class="s-l-list-item-container">
        <div class="s-l-list-item-img-wrapper">
            <img src="http://img1.3lian.com/img013/v5/21/d/84.jpg">
        </div>
        <div class="s-l-list-item-content-wrapper">
            <p class="s-l-list-item-content-title-wrapper">
                <span class="s-l-list-item-content-title">卧虎山滑雪卧虎山滑雪卧虎山滑雪卧虎山滑雪卧虎山滑雪卧虎山滑雪卧虎山滑雪</span>
                <span class="s-l-list-item-content-price">
                    <span>￥89</span>
                    <i>起</i>
                </span>
            </p>
            <div class="s-l-list-item-content-info-wrapper">
                <div class="s-l-list-item-content-info">
                    <span class="s-l-list-item-content-inf0-rate">4.9分</span>
                    <span>|</span>
                    <span class="s-l-list-item-content-inf0-saller">12345人已售</span>
                </div>
                <span class="s-l-list-item-content-info-old-price">￥999</span>
            </div>
            <p class="s-l-list-item-content-tags-wrapper">
                <span>立减1元</span>
                <span>立减1元</span>
                <span>立减1元</span>
            </p>
            <p class="s-l-list-item-content-remark-wrapper">
                预定须知：一定要从正规渠道购买，重要的事说三遍。一定要从正规渠道购买，重要的事说三遍一定要从正规渠道购买，重要的事说三遍一定要从正规渠道购买，重要的事说三遍
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ScenicListItem'
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-l-list-item-container
    margin rem(.2)
    border-bottom #f5f5f5 solid 1px
    padding-bottom rem(.2)
    display flex
    .s-l-list-item-img-wrapper
        height rem(2)
        width rem(2.5)
        & img
            width 100%
            height 100%
            object-fit cover
    .s-l-list-item-content-wrapper
        flex 1
        display flex
        flex-direction column
        padding-left rem(.2)
        justify-content space-between
        overflow hidden
        .s-l-list-item-content-title-wrapper
            display flex
            .s-l-list-item-content-title
                flex 1
                ellipsis()
                textStyle(#333, .32)
            .s-l-list-item-content-price
                textStyle($primary, .35)
                & i
                    textStyle(#ccc, .2)
        .s-l-list-item-content-info-wrapper
            display flex
            .s-l-list-item-content-info
                flex 1
                textStyle(#888, .25)
                .s-l-list-item-content-inf0-rate
                    textStyle($primary, .25)
            .s-l-list-item-content-info-old-price
                textStyle(#888, .25)
                text-decoration line-through
        .s-l-list-item-content-tags-wrapper
            display flex
            & span
                normalTextStyle($primary, .18)
                line-height rem(.2)
                text-align center
                vertical-align middle
                border $primary solid 1px
                padding rem(.02) rem(.1)
                padding-top rem(.05)
                margin-left rem(.1)
        .s-l-list-item-content-remark-wrapper
            background-color #f5f5f5
            ellipsis()
            normalTextStyle(#888, .25)
            padding 0 rem(.1)
            border-radius rem(.1)
</style>
