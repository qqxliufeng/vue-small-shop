<template>
  <div class="container">
    <div v-if="error" class="error-info-conatainer">
      <el-button type="warning" @click="getData">加载失败，点击重试</el-button>
    </div>
    <div v-else>
      {{info}}
      <router-link v-for="(item,index) in links" :to="{name: 'HelloWorldA',params: {nameId: item}}" :key="index">
        <el-button type="warning">跳转</el-button>
      </router-link>
    </div>
    <div v-if="this.$userInfo.isLogined()">登录了</div>
    <div v-else @click="hanlderClick">没有登录</div>
  </div>
</template>

<script>
import myUrl from '@/common/urlConfig'
export default {
  name: 'HelloWorld',
  data () {
    return {
      info: null,
      error: false,
      links: ['1', '2', '3', '4'],
      shareState: this.$userInfo
    }
  },
  methods: {
    successClick: function () {
      console.log('asdf')
    },
    hanlderClick: function () {
      var confirm = window.confirm('当前用户没有登录，是否要登录')
      if (confirm) {
        this.$router.push({name: 'login', params: {id: '22222'}})
      } else {
        this.$router.push({name: 'HelloWorldA', params: {nameId: '100'}})
      }
    },
    getData: function () {
      const load = this.$loading({
        text: '加载中……',
        lock: true,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.error = false
      this.$http.get(myUrl.home)
        .then((response) => {
          this.info = response.data.bpi
          load.close()
        })
        .catch(errorInfo => {
          this.error = true
          load.close()
        })
        .finally(() => {
          load.close()
        })
    }
  },
  mounted: function () {
    console.log(this.$userInfo.isLogined())
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
  .container
    position relative
    .load-container
    .error-info-conatainer
      position fixed
      display flex
      justify-content center
      align-items center
      top 0
      left 0
      bottom 0
      right 0
    .my-button
      background-color red
      width 50px
      height 25px
      padding 0
</style>
