<template>
    <div>
        <navi title="联系客服" :isShowBack="false"></navi>
        <div class="c-s-container">
            <p class="c-s-title">
                <i></i>
                店铺客服
            </p>
            <div v-if="info">
                <p class="item">
                  <span>
                      店铺名称
                  </span>
                  <span>
                      {{info.store_name}}
                  </span>
                </p>
                <p class="item">
                  <span>
                      联系人
                  </span>
                  <span>
                      {{info.link_name}}
                  </span>
                </p>
                <p class="item">
                  <span>
                      手机号
                  </span>
                  <span>
                      {{info.phone}}
                  </span>
                </p>
            </div>
            <!-- <div class="sperator-line"></div> -->
            <!-- <p class="c-s-title">
                <i></i>
                平台客服
            </p>
            <p v-for="(item,index) of platServiceInfoMap" :key="index">
                <span>
                    {{item.name}}
                </span>
                <span>
                    {{item.info}}
                </span>
            </p> -->
        </div>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
export default {
  name: 'customService',
  components: {
    navi
  },
  data () {
    return {
      info: null
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.customService, {
        identity: this.$root.state.identity,
        store_id: this.$root.state.storeId
      }, '', (data) => {
        if (data.data) {
          this.info = data.data
        }
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.c-s-container
    & > div
        padding .2rem
        margin-left .7rem
        & span
            display inline-block
            color #888888
        & span:nth-child(1)
            width 30%
            vertical-align middle
        & span:nth-child(2)
            width 60%
            margin-left 5%
            vertical-align middle
    .item
        padding .2rem
    .c-s-title
        color #333333
        font-size .36rem
        line-height .4rem
        margin-left 0
        margin-top .2rem
        & i
            display inline-block
            circleNotify($primary)
            width .2rem
            height .2rem
            margin 0 .2rem
.sperator-line
    border-bottom .1rem solid #f5f5f5
    margin-top .1rem
</style>
