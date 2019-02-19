<template>
    <div class="c-container">
        <navi title="联系人" :isFixed="true" :isRightAction="true">
             <template slot="rightAction">
               <span @click="deleteContacts" class="c-delete-action">删除</span>
           </template>
        </navi>
        <ul class="c-item-container">
            <li v-for="(item,index) of contactsList" :key="index">
                <div>
                    <el-checkbox class="c-checkbox"/>
                    <div class="c-item-content">
                        <p>{{item.name}}</p>
                        <p>手机号：{{item.phone}}</p>
                        <span class="iconfont">&#xe609;</span>
                    </div>
                </div>
            </li>
            <li class="c-add-new-container" @click="addContacts">
                <span class="iconfont">&#xe6da; 新增联系人</span>
            </li>
        </ul>
    </div>
</template>
<script>
import navi from 'common/components/navigation'
export default {
  name: 'contacts',
  components: {
    navi
  },
  data () {
    return {
      contactsList: [
        {
          name: '王大宝',
          phone: '15000000000'
        },
        {
          name: '王大宝',
          phone: '15000000000'
        },
        {
          name: '王大宝',
          phone: '15000000000'
        },
        {
          name: '王大宝',
          phone: '15000000000'
        },
        {
          name: '王大宝',
          phone: '15000000000'
        },
        {
          name: '王大宝',
          phone: '15000000000'
        },
        {
          name: '王大宝',
          phone: '15000000000'
        },
        {
          name: '王大宝',
          phone: '15000000000'
        },
        {
          name: '王大宝',
          phone: '15000000000'
        },
        {
          name: '王大宝',
          phone: '15000000000'
        },
        {
          name: '王大宝',
          phone: '15000000000'
        }
      ]
    }
  },
  methods: {
    deleteContacts () {
      console.log('delete')
    },
    addContacts () {
      this.$router.push({name: 'addContacts'})
    }
  },
  mounted () {
    if (this.$route.query.constacts) {
      this.contactsList.push(this.$route.query.constacts)
      this.$route.query.constacts = null
    }
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
</style>
