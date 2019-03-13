<template>
    <div>
       <navi title="个人信息"></navi>
       <ul class="p-i-ul">
           <li>
               <div class="p-i-item">
                   <span class="p-i-left">头像</span>
                    <el-upload
                        class="avatar-uploader"
                        :action="avatarAction + '?token=' + this.$root.userInfo.state.token"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-success="uploadSuccess"
                        :on-error="uploadError">
                        <img class="avatar p-i-right" :src="avatar">
                    </el-upload>
               </div>
           </li>
           <li>
               <div class="p-i-item">
                   <span class="p-i-left">用户名</span>
                   <input class="p-i-right p-i-text" placeholder="请输入用户名" maxlength="10" v-model="userName"/>
               </div>
           </li>
           <li>
               <div class="p-i-item">
                   <span class="p-i-left">真实姓名</span>
                   <input class="p-i-right p-i-text" placeholder="请输入真实姓名" maxlength="5" v-model="realName"/>
               </div>
           </li>
           <li>
               <div class="p-i-item">
                   <span class="p-i-left">E-MAIL</span>
                   <input class="p-i-right p-i-text" placeholder="请输入邮箱" maxlength="20" v-model="email"/>
               </div>
           </li>
           <li>
               <div class="p-i-item">
                   <span class="p-i-left">性别</span>
                   <div class="p-i-sex">
                        <el-radio v-model="sex" label="1">男</el-radio>
                        <el-radio v-model="sex" label="2">女</el-radio>
                   </div>
               </div>
           </li>
           <li>
               <div class="p-i-item">
                   <span class="p-i-left">QQ</span>
                   <input class="p-i-right p-i-text" placeholder="请输入QQ号" maxlength="12" v-model="qq"/>
               </div>
           </li>
           <li>
               <div class="p-i-item">
                   <span class="p-i-left">所在城市</span>
                   <span class="p-i-right p-i-text">山东省济南市</span>
               </div>
           </li>
       </ul>
       <button class="p-i-submit" @click="submit">确定</button>
       <loading :loadingTip="loading.tip" v-show="loading.show"></loading>
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
      avatar: this.$urlPath.imageUrl + this.$root.userInfo.state.avatar,
      userName: this.$root.userInfo.state.name,
      realName: this.$root.userInfo.state.realName,
      email: this.$root.userInfo.state.email,
      qq: this.$root.userInfo.state.qq,
      sex: this.$root.userInfo.state.gender,
      avatarAction: this.$urlPath.imageActionUrl,
      loading: this.$loading()
    }
  },
  methods: {
    submit () {
      if (!this.userName) {
        this.$toast('用户名不能为空')
        return
      }
      if (!this.realName) {
        this.$toast('真实姓名不能为空')
        return
      }
      if (!this.email) {
        this.$toast('邮箱不能为空')
        return
      }
      if (!this.$utils.validator.isEmail(this.email)) {
        this.$toast('请输入合法的邮箱')
        return
      }
      this.$http(this.$urlPath.userInfoResetInfo, {
        username: this.userName,
        realname: this.realName,
        email: this.email,
        gender: this.sex,
        qq: this.qq
      }, '正在修改…', (data) => {
        this.$toast(data.msg)
        if (this.userName) {
          this.$root.userInfo.setUserInfoName(this.userName)
        }
        if (this.realName) {
          this.$root.userInfo.setUserInfoRealName(this.realName)
        }
        if (this.email) {
          this.$root.userInfo.setUserInfoEmail(this.email)
        }
        if (this.sex) {
          this.$root.userInfo.setUserInfoGender(this.sex)
        }
        if (this.qq) {
          this.$root.userInfo.setUserInfoQQ(this.qq)
        }
        this.$router.go(-1)
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    beforeUpload (file) {
      let checkResult = this.$utils.image.beforeUploadImageCheck(this.$root, file)
      if (checkResult) {
        this.loading.tip = '正在上传…'
        this.loading.show = true
      }
      return checkResult
    },
    uploadSuccess (response, file, fileList) {
      if (response.data) {
        this.$toast('头像上传成功')
        this.loading.show = false
        this.avatar = this.$utils.image.getImagePath(this.$root, response.data.url)
        this.$root.userInfo.setUserInfoAvatar(response.data.url)
      } else {
        this.$toast(response.msg)
      }
    },
    uploadError (err, file, fileList) {
      console.log(err)
      this.$toast('头像上传失败')
      this.loading.show = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.p-i-ul
    margin-top rem(.5)
    .p-i-item
        borderBottom()
        padding 0 rem(.2)
        overflow hidden
        display flex
        flex-direction row
        align-items center
        justify-content space-between
        height rem(1.2)
        .avatar
            width rem(.8)
            height rem(.8)
            object-fit cover
            border-radius 50%
        .p-i-left
            color #333333
            font-size .32rem
        .p-i-right
            font-size 1rem
            text-align right
        .p-i-text
            color #888888
            font-size .3rem
            padding rem(.2) 0
            box-sizing border-box
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
    margin-top 1rem
    color #ffffff
    font-size .32rem
</style>
