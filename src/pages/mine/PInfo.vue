<template>
    <div>
       <navi title="个人信息"></navi>
       <ul class="p-i-ul">
           <li class="p-i-item">
               <div>
                   <span class="p-i-left">头像</span>
                   <span class="iconfont p-i-right">&#xe65f;</span>
               </div>
           </li>
           <li class="p-i-item">
               <div>
                   <span class="p-i-left">用户名</span>
                   <span class="p-i-right p-i-text">王大宝</span>
               </div>
           </li>
           <li class="p-i-item">
               <div>
                   <span class="p-i-left">用户名</span>
                   <span class="p-i-right p-i-text">王大宝</span>
               </div>
           </li>
           <li class="p-i-item">
               <div>
                   <span class="p-i-left">E-MAIL</span>
                   <span class="p-i-right p-i-text">1234@qq.com</span>
               </div>
           </li>
           <li class="p-i-item">
               <div>
                   <span class="p-i-left">性别</span>
                   <div class="p-i-sex">
                        <el-radio v-model="sex" label="1">男</el-radio>
                        <el-radio v-model="sex" label="2">女</el-radio>
                   </div>
               </div>
           </li>
           <li class="p-i-item">
               <div>
                   <span class="p-i-left">QQ</span>
                   <span class="p-i-right p-i-text">123456789</span>
               </div>
           </li>
           <li class="p-i-item">
               <div>
                   <span class="p-i-left">所在城市</span>
                   <span class="p-i-right p-i-text">王大宝</span>
               </div>
           </li>
           <li class="p-i-item">
               <div>
                   <span class="p-i-left">真实姓名</span>
                   <span class="p-i-right p-i-text">王大宝</span>
               </div>
           </li>
            <li class="p-i-item">
               <div>
                   <span class="p-i-left">邮政编码</span>
                   <span class="p-i-right p-i-text">251200</span>
               </div>
           </li>
       </ul>
       <button class="p-i-submit">确定</button>
    </div>
</template>
<script>
import navi from 'common/components/navigation'
export default {
  name: 'pinfo',
  components: {
    navi
  },
  data () {
    return {
      sex: '1'
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.p-i-ul
  margin-top $headerHeight
  .p-i-item
   borderBottom()
   margin-left .2rem
   line-height 1rem
   overflow hidden
   .p-i-left
       float left
       color #333333
       font-size .32rem
   .p-i-right
       float right
       margin-right .2rem
       font-size 1rem
    .p-i-text
        color #888888
        font-size .3rem
    .p-i-sex
        float right
        margin-right .2rem
.p-i-submit
    display block
    width 80%
    border-radius 2rem
    background-color $primary
    height .8rem
    margin 0 auto
    margin-top .5rem
    color #ffffff
    font-size .32rem
</style>
