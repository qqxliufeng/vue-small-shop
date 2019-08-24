<template>
  <div>
    <div class='activity-friend-info-container' v-if="assist">
      <div class="header">
        <span class="friend-tip" v-if="$root.userInfo.isLogin()">已有<i>{{assist.join.join_number}}</i>位好友为您助力<span v-if="assist.number - assist.join.join_number !== 0">，还需<i>{{assist.number - assist.join.join_number}}</i>位</span></span>
        <span class="friend-tip" v-else>快快邀请好友参加吧~</span>
        <span class="action" @click="inviteFriend">{{tip}}</span>
      </div>
      <div class="friend-info-wrapper" v-if="$root.userInfo.isLogin() && assist.join.user && assist.join.user.length > 0">
        <img v-for="(item, index) of assist.join.user" :key="index" :src="$utils.image.getImagePath(item.avatar)">
      </div>
    </div>
    <div class="s-d-info-middle-wrapper">
      <div class="activity-info-wrapper" @click="activityRuleInfo">
        <p>活动详情</p>
        <p class="activity-info">{{delHtmlTag(assist.details)}}</p>
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
    scenicInfo: Object,
    assist: Object
  },
  components: {
    SafeProtect
  },
  data () {
    return {
    }
  },
  computed: {
    tip () {
      if (this.$root.userInfo.isLogin()) {
        if (this.assist && this.assist.join.status === 1) {
          return '立即购买'
        }
        return '邀请好友'
      } else {
        return '邀请好友'
      }
    }
  },
  methods: {
    activityRuleInfo () {
      this.$emit('ativityRuleInfo')
    },
    inviteFriend () {
      this.$emit('inviteFriend')
    },
    delHtmlTag (str) {
      if (str) {
        return str.replace(/<[^>]+>/g, '')
      }
      return ''
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.activity-friend-info-container
    border-top #f5f5f5 solid rem(.05)
    border-bottom #f5f5f5 solid rem(.05)
    padding rem(.2)
    .header
        display flex
        justify-content space-between
        align-items center
        .friend-tip
            textStyle(#333, .25)
            & i
                textStyle($orangeColor, .3)
                margin 0 rem(.1)
        .action
            textStyle(#fff, .23)
            border-radius rem(.3)
            padding rem(.05) rem(.25)
            line-height rem(.35)
            background $primary
    .friend-info-wrapper
        border #F8D79E solid 1px
        background #FFFDEF
        overflow hidden
        margin-top rem(.2)
        padding rem(.1)
        border-radius rem(.08)
        & > img
            object-fit cover
            height rem(.5)
            width rem(.5)
            border-radius 50%
            float left
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
              muitlLineEllipsis(2)
              line-height rem(.32)
              margin-top rem(.2)
              textStyle(#888, .25)
</style>
