<template>
<div class="r-d-ticket-info-remark-content-wrapper">
    <!-- <p class="r-d-ticket-info-remark-content-title">{{remarkInfo.title}}</p> -->
    <p class="r-d-ticket-info-remark-content-title-info">
        <span class="remark-key">
            {{remark.title}}
        </span>
        <span class="remark-value">
            {{value || '暂无'}}
        </span>
    </p>
</div>
</template>

<script>

export default {
  name: 'ticketRemark',
  props: {
    remark: Object
  },
  computed: {
    value () {
      if (this.remark) {
        for (let key in this.remark) {
          if (key === 'title') {
            continue
          }
          return this.remark[key]
        }
      } else {
        return '暂无'
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.r-d-ticket-info-remark-content-wrapper
    margin rem(.3) 0
    .r-d-ticket-info-remark-content-title
        padding rem(.1)
        vertical-align bottom
        font-size rem(.3)
        &::before
            content ""
            display inline-block
            width 2px
            height rem(.3)
            margin-right rem(.2)
            background-color $primary
            vertical-align bottom
    .r-d-ticket-info-remark-content-title-info
        margin-left .55rem
        & span
            display inline-block
        .remark-key
            color #333333
            width 30%
            vertical-align top
        .remark-value
            width 60%
            margin-left 5%
            vertical-align middle
            color #888888
            line-height rem(.4)
</style>
