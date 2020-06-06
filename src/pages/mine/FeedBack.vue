<!--
 * @Author: your name
 * @Date: 2020-05-08 10:16:38
 * @LastEditTime: 2020-05-08 11:07:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop/src/pages/mine/FeedBack.vue
 -->
<template>
  <div class=''>
    <navi title="意见反馈"></navi>
    <div class="bg-white padding">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 4}"
        :maxlength="200"
        placeholder="请输入您的宝贵意见，我们将不断优化您的体验(1~200)"
        v-model="content">
      </el-input>
      <div class="margin-top">
        <span class="text-black">联系方式：</span>
        <el-input placeholder="请输入手机号(必填)" v-model="phone" type="number" class="margin-top" :maxlength="11"/>
      </div>
      <p class="text-black margin-top-lg">上传图片<span>最多三张</span></p>
      <div class="o-i-comment-upload-wrapper">
        <el-upload
            class="margin-top dash-border"
            :action="uploadPath"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            list-type="picture-card"
            :limit="3"
            :on-exceed="onExceed">
            <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </div>
    <div class="text-center">
      <el-button type="primary" class="button" @click="upload">确定</el-button>
    </div>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
export default {
  name: 'FeedBack',
  components: {
    navi
  },
  data () {
    return {
      content: '',
      phone: '',
      imageList: []
    }
  },
  computed: {
    uploadPath () {
      return this.$urlPath.imageActionUrl + '?token=' + this.$root.userInfo.state.token
    }
  },
  methods: {
    upload () {
      if (!this.content) {
        this.$toast('请输入您的宝贵意见')
        return
      }
      if (!this.phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!this.$utils.validator.isPhone(this.phone)) {
        this.$toast('请输入合法的手机号')
        return
      }
      const uploadData = {
        content: this.content,
        images: this.imageList.length > 0 ? this.imageList.join(',') : '',
        mobile: this.phone
      }
      this.$http(this.$urlPath.feedback, {
        params: JSON.stringify(uploadData)
      }, '正在上传', () => {
        this.$toast('感谢您的宝贵意见')
        this.$router.back()
      }, (code, error) => {
        this.$toast(error)
      })
    },
    beforeUpload (file) {
      let checkResult = this.$utils.image.beforeUploadImageCheck(this.$root, file)
      if (checkResult) {
        this.$loading('正在上传…')
      }
      return checkResult
    },
    uploadSuccess (response, file, fileList) {
      if (response.data) {
        this.imageList.push(response.data.url)
        this.$toast('图片上传成功')
        this.$loading.close()
      } else {
        this.$toast(response.msg)
      }
    },
    uploadError (err, file, fileList) {
      this.$toast('图片上传失败' + err)
      this.$loading.close()
    },
    onExceed (file, fileList) {
      this.$toast('最多只能上传三张')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
>>> .el-upload--picture-card
>>> .el-upload-list--picture-card
>>> .el-upload-list__item
        width rem(1.6)
        height rem(1.6)
        line-height rem(1.6)
>>> .el-upload-list__item.is-success
      .el-upload-list__item-status-label
        display none
>>> .el-progress-circle
        width rem(1)
        height rem(1)
.button
  width 95%
  margin-top 100px
</style>
