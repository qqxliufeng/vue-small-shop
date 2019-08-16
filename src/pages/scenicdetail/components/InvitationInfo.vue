<template>
  <div>
    <div class='invitation-friend-info-container'>
    <div class="header">
      <div class="user-info">
        <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
        <span class="friend-tip">您的好友正在参加助力活动</span>
      </div>
      <span class="action">我要参加</span>
    </div>
    <div class="friend-info-wrapper">
      <p class="tip">已邀请3位好友为他助力，还需3位</p>
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <img src="http://www.liuyiqinzi.com/uploads/20190713/24451307ff15be83416dbcbb268a4769.jpg">
      <span class="helper">为他助力</span>
    </div>
  </div>
  <div class="s-d-info-middle-wrapper">
      <div class="activity-info-wrapper">
        <p>活动详情</p>
        <p class="activity-info">活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情活动详情</p>
      </div>
      <div class="open-time-wrapper">
          <p>营业时间</p>
          <p>{{scenicInfo.open}}</p>
      </div>
      <div class="s-d-info-scenic-location-wrapper">
          <span class="iconfont s-d-info-scenic-location-icon">&#xe850;</span>
          <div class="s-d-info-scenic-location">
              <p>{{scenicInfo.city}}</p>
              <p>{{scenicInfo.tel}}</p>
          </div>
          <a :href="'tel:' + scenicInfo.tel" class="iconfont s-d-info-scenic-phone">&#xe6a9;</a>
      </div>
    </div>
    <safe-protect></safe-protect>
  </div>
</template>

<script>
import SafeProtect from 'common/components/safe-protect'
export default {
  name: 'activityFriendInfo',
  props: {
    scenicInfo: Object
  },
  data () {
    return {
    }
  },
  components: {
    SafeProtect
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.invitation-friend-info-container
    border-top #f5f5f5 solid rem(.05)
    border-bottom #f5f5f5 solid rem(.05)
    padding rem(.2)
    .header
        display flex
        justify-content space-between
        align-items center
        .user-info
            textStyle(#333, .3)
            & > img
                width rem(.5)
                height rem(.5)
                border-radius 50%
                margin-right rem(.1)
                vertical-align middle
                object-fit cover
            .friend-tip
                textStyle(#333, .25)
                vertical-align middle
        .action
            textStyle(#fff, .23)
            border-radius rem(.3)
            padding rem(.05) rem(.2)
            line-height rem(.35)
            background $orangeColor
    .friend-info-wrapper
        border #F8D79E solid 1px
        overflow hidden
        margin-top rem(.2)
        padding rem(.1)
        border-radius rem(.08)
        .tip
            textStyle(#666, .2)
            margin-left rem(.1)
            margin-top rem(.1)
            margin-bottom rem(.1)
        & > img
            object-fit cover
            height rem(.5)
            width rem(.5)
            border-radius 50%
            float left
            margin-left rem(.1)
            margin-top rem(.1)
        .helper
            float right
            textStyle(#fff, .23)
            border-radius rem(.3)
            padding rem(.05) rem(.2)
            line-height rem(.35)
            background $primary
            margin-left rem(.1)
            margin-top rem(.1)
.s-d-info-middle-wrapper
      padding rem(.2)
      overflow hidden
      .s-d-info-scenic-location-wrapper
          margin-top rem(.2)
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
      .open-time-wrapper
          background-color #f5f5f5
          padding rem(.1)
          margin-top rem(.2)
          border-radius rem(.1)
          & p:nth-child(1)
              normalTextStyle(#333, .28)
          & p:nth-child(2), & p:nth-child(3)
              normalTextStyle(#888, .25)
      .activity-info-wrapper
          margin-top rem(.2)
          textStyle(#333, .3)
          .activity-info
              ellipsis()
              margin-top rem(.2)
              textStyle(#888, .25)
</style>
