<!--
 * @Author: your name
 * @Date: 2020-04-28 10:11:41
 * @LastEditTime: 2020-04-28 10:33:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/src/pages/mine/FriendList.vue
 -->
<template>
  <div>
    <navi title="我的好友" class="navi" :isFixed="true"></navi>
    <div class="content">
       <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
          <ul id="friend_content">
            <li v-for="item of list" :key="item.id">
              <div class="padding-sm bg-white flex align-center solid-bottom">
                <img class="image-wrapper" mode="aspectFill" :src="$utils.image.getImagePath(item.wx_headimgurl)" />
                <div class="flex flex-direction justify-between margin-left-sm">
                  <span class="text-black">{{item.username}}</span>
                  <span class="text-gray" style="margin-top: 10px;">{{$utils.common.dateFormat(item.jointime * 1000)}}</span>
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
export default {
  name: 'MyWallet',
  mixins: [listMixin],
  components: {
    navi,
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('friend_content', this.upCallback),
      list: []
    }
  },
  methods: {
    upCallback (page, mescroll) {
      this.$http(this.$urlPath.myFriendList, {
        page: page.num
      }, '', (data) => {
        // data.data = [
        //   {
        //     id: 1,
        //     jointime: 1491461418,
        //     username: '小土豆',
        //     wx_headimgurl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLLib1iacTzcMKSZNP5z3eIdXspiaTVPMX9Qyd66JhsGhE6ibxYnahZwZ7c0LdqEdicDrobo1vT0GrcSug/132'
        //   }
        // ]
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.$toast(error)
        this.loadError(mescroll)
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.mescroll
    mescroller()
    top $headerHeight
    height 94%
.image-wrapper
    background-color #F5F5F5
    border-radius 50%
    width 40px
    height 40px
</style>
