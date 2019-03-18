<template>
    <div class="c-container">
        <navi title="联系人" :isFixed="true" :isRightAction="true">
             <template slot="rightAction">
               <span @click="deleteContacts" class="c-delete-action">删除</span>
           </template>
        </navi>
        <ul class="c-item-container" v-if="contactsList">
            <li v-for="item of contactsList" :key="item.l_id">
                <div @click="itemClick(item)">
                    <el-checkbox class="c-checkbox" v-model="item.isChecked"/>
                    <div class="c-item-content">
                        <p>{{item.l_name}}</p>
                        <p>手机号：{{item.l_mobile}}</p>
                        <span class="iconfont" @click="modifyContact(item)">&#xe609;</span>
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
      contactsList: null,
      deleteContactsList: []
    }
  },
  methods: {
    deleteContacts () {
      this.deleteContactsList.length = 0
      this.contactsList.forEach(el => {
        if (el.isChecked) {
          this.deleteContactsList.push(el.l_id)
        }
      })
      if (this.deleteContactsList.length > 0) {
        this.$http(this.$urlPath.deleteLinkManUrl, {
          l_id: this.deleteContactsList.join(',')
        }, '正在删除…', (data) => {
          this.$toast('删除成功')
          this.getData()
        }, (error) => {
          this.$toast(error)
        })
      } else {
        this.$toast('请先选择要删除的联系人')
      }
    },
    itemClick (item) {
      item.isChecked = !item.isChecked
    },
    addContacts () {
      this.$router.push({name: 'addContacts'})
    },
    modifyContact (item) {
      this.$router.push({name: 'addContacts', params: { tempConstacts: item }})
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let constacts = vm.$route.query.constacts
      if (constacts) {
        if (constacts.l_id) {
          vm.contactsList.forEach((el, index) => {
            if (el.l_id === constacts.l_id) {
              vm.contactsList.splice(index, 1, constacts)
            }
          })
        } else {
          vm.getData()
        }
        vm.$route.query.constacts = null
      }
    })
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
