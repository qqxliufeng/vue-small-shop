<template>
    <div>
        <navi title="评价" :isFixed="true"></navi>
        <div class="o-i-comment-container">
            <div class="o-i-comment-container-start-wrapper">
                <span class="black-text-style">星级评价</span>
                 <el-rate class="o-i-comment-container-start" void-icon-class="el-icon-star-off" v-model="rate"></el-rate>
            </div>
            <p class="black-text-style">文字评价</p>
            <div class="o-i-comment-content-wrapper">
                <el-input type="textarea" placeholder="请输入评论内容" :rows="7" v-model="content" maxLength="200"></el-input>
            </div>
             <p class="black-text-style">上传图片<span>最多三张</span></p>
             <div class="o-i-comment-upload-wrapper">
                <el-upload
                    class="o-i-comment-upload-item dash-border"
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
            <div>
                <el-button type="primary" class="o-i-comment-submit" @click="upload">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import navi from 'common/components/navigation'
export default {
  name: 'orderComment',
  components: {
    navi
  },
  data () {
    return {
      rate: 5,
      orderId: this.$route.query.orderId,
      imageList: [],
      content: ''
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
        this.$toast('请输入评论内容')
        return
      }
      if (this.content.length > 200) {
        this.$toast('评论内容最多200字')
        return
      }
      const image = this.imageList.join(',')
      this.$http(this.$urlPath.addCommentUrl, {
        ord_id: this.$route.query.orderId,
        mark: this.rate,
        content: this.content,
        images: image
      }, '正在上传…', (data) => {
        this.$toast('评论发表成功')
        this.$root.$emit('onReload')
        this.$router.go(-1)
      }, (errorCode, error) => {
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

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.black-text-style
    color #333
    font-size .32rem
.o-i-comment-container
    margin-top $headerHeight
    .o-i-comment-container-start-wrapper
        padding .3rem
        line-height .5rem
        font-size .5rem
        .o-i-comment-container-start
            display inline-block
            margin-left .3rem
            .el-rate__icon
                font-size .45rem
    & > p
        padding .3rem
        & span
            margin-left .3rem
            font-size .28rem
            color #888
    .o-i-comment-content-wrapper
        margin 0 .3rem
        & textarea
            background-color #f5f5f5
            display block
            width 100%
            padding .2rem
            box-sizing border-box
    .o-i-comment-upload-wrapper
        .o-i-comment-upload-item
            margin .3rem
            border-radius: 6px
            position: relative
            overflow: hidden
            box-sizing border-box
            .o-i-comment-upload-progress
                position absolute
                top 0rem
                left 0rem
                margin-top .1rem
                margin-left .1rem
                color $primary
            .o-i-comment-upload-add-icon
                color: #8c939d
                text-align: center
                line-height 1.8rem
                font-size .8rem
            & img
                width 100%
                height 100%
                object-fit cover
    .o-i-comment-submit
        width 85%
        display block
        margin 1rem auto
>>> .el-upload--picture-card
>>> .el-upload-list--picture-card
>>> .el-upload-list__item
        width rem(1.6)
        height rem(1.6)
        line-height rem(1.6)
>>> .el-upload-list__item.is-success .el-upload-list__item-status-label
        display none
>>> .el-progress-circle
        width rem(1)
        height rem(1)
</style>
