<template>
    <div>
        <navi title="评价" :isFixed="true"></navi>
        <div class="o-i-comment-container">
            <div class="o-i-comment-container-start-wrapper">
                <span class="black-text-style">星级评价</span>
                 <el-rate class="o-i-comment-container-start" void-icon-class="el-icon-star-off"></el-rate>
            </div>
            <p class="black-text-style">文字评价</p>
            <div class="o-i-comment-content-wrapper">
                <el-input type="textarea" placeholder="请输入评论内容" :rows="7"></el-input>
            </div>
             <p class="black-text-style">上传图片<span>最多三张</span></p>
             <div class="o-i-comment-upload-wrapper">
                <!-- <div v-for="(item,index) of fileList" :key="index" class="o-i-comment-upload-item">
                    <img :src="item.url" v-show='!item.showProgress'>
                    <el-progress type="circle" :percentage="item.percent" class="o-i-comment-upload-progress" :width="80" status="success" :show-text="false" v-show='item.showProgress'></el-progress>
                </div> -->
                <!-- <el-upload
                    class="o-i-comment-upload-item dash-border"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-progress="onProgress"
                    :on-success="onSuccess"
                    :on-error="onError"
                    list-type="picture-card"
                    :limit="3"
                    :file-list="fileList"
                    :before-upload="beforeUpload">
                    <i class="el-icon-plus"></i>
                </el-upload> -->
                <el-upload
                    class="o-i-comment-upload-item dash-border"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-progress="onProgress"
                    :on-success="onSuccess"
                    :on-error="onError"
                    list-type="picture-card"
                    :limit="3"
                    :on-exceed="onExceed">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <div>
                <el-button type="primary" class="o-i-comment-submit">确定</el-button>
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
      fileList: []
    }
  },
  methods: {
    onProgress (event, file, fileList) {
    //   this.fileList[this.fileList.length - 1].percent = event.percent
    },
    onSuccess (response, file, fileList) {
    //   this.fileList[this.fileList.length - 1].showProgress = false
    //   if (this.fileList.length === 3) {
    //     this.showUpload = false
    //   }
    },
    onError (err, file, fileList) {
      console.log(err)
      this.$toast('上传失败…')
    //   this.fileList.splice(this.fileList.length - 1, 1)
    },
    onExceed (file, fileList) {
      this.$toast('最大上传三张')
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
