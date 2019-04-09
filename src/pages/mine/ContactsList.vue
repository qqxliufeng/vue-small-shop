<template>
    <div class="c-container">
        <navi title="选择联系人" :isFixed="true" :isRightAction="true">
        </navi>
        <ul class="c-item-container" v-if="contactsList && contactsList.length > 0">
            <li v-for="item of contactsList" :key="item.l_id">
                <div @click="itemClick(item)">
                    <el-checkbox class="c-checkbox" v-model="item.isChecked" disabled/>
                    <div class="c-item-content">
                        <p>{{item.l_name}}</p>
                        <p>手机号：{{item.l_mobile}}</p>
                    </div>
                </div>
            </li>
            <li class="confirm" @click="confirm" v-if="contactsList && contactsList.length > 0">
              <span>确定</span>
            </li>
        </ul>
        <div v-else class="empty-list">
          暂无联系人
        </div>
    </div>
</template>
<script>
import navi from 'common/components/navigation'
export default {
  name: 'contactsList',
  components: {
    navi
  },
  data () {
    return {
      contactsList: null,
      selectContacts: []
    }
  },
  methods: {
    itemClick (item) {
      item.isChecked = !item.isChecked
      let index = this.selectContacts.indexOf(item)
      if (index !== -1) {
        this.selectContacts.splice(index, 1)
      } else {
        this.selectContacts.push(item)
      }
    },
    confirm () {
      if (this.selectContacts.length === 0) {
        this.$toast('请选择至少一位联系人')
      } else {
        this.$router.go(-1)
      }
    },
    getData () {
      this.$http(this.$urlPath.linkManUrl, {}, '加载中…', (data) => {
        if (data.data) {
          data.data.forEach(item => {
            item.isChecked = false
          })
          this.contactsList = data.data
        }
      }, (error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getData()
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'reseveDetail' && this.selectContacts.length > 0) {
      to.params.contacts = this.selectContacts
    }
    next()
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.c-container
    position relative
    .c-delete-action
        color #333333
        font-size .26rem
    .c-item-container
        position fixed
        top $headerHeight
        left 0
        right 0
        height 88%
        padding .2rem 0
        overflow scroll
        & li > div
            line-height .5rem
            display flex
            align-items center
            .c-checkbox
                flex 1
                text-align center
                margin-right -.1rem
            .c-item-content
                position relative
                borderBottom()
                flex 6
                padding .2rem 0
                & p:nth-child(1)
                    color #333333
                    font-size .32rem
                & p:nth-child(2)
                    color #888888
                    font-size .3rem
                & span
                    color $primary
                    position absolute
                    right .5rem
                    top 50%
                    font-size .5rem
                    margin-top -.25rem
        .c-add-new-container
            text-align center
            color $primary
            font-size .35rem
            margin-top .3rem
        .confirm
            background $primary
            text-align center
            color #fff
            width 80%
            font-size .35rem
            margin .3rem auto
            padding rem(.2)
            border-radius rem(.2)
    .empty-list
        textStyle(#888, .32)
        height 95vh
        display flex
        justify-content center
        align-items center
</style>
