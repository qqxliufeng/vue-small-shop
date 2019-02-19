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
                <div v-for="(item,index) of fileList" :key="index" class="o-i-comment-upload-item">
                    <img :src="item.url">
                    <el-progress type="circle" :percentage="25" class="o-i-comment-upload-progress" :width="80" status="success" :show-text="false"></el-progress>
                </div>
                <el-upload
                    class="o-i-comment-upload-item dash-border"
                    action="https://jsonplaceholder.typicode.com/posts/">
                    <i class="el-icon-plus o-i-comment-upload-add-icon"></i>
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
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550315558341&di=5eb3ae6776ef018e8eadf3eaabbeb16f&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb3119313b07eca8043a138229c2397dda044834a.jpg'
        },
        {
          name: 'food2.jpeg',
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550315558341&di=50dda8d5d8ecc59c08344e15845aa066&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F2f738bd4b31c8701e96739342a7f9e2f0608ff0b.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
@import '~styles/varibles.styl'
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
        display flex
        .dash-border
            border: 1px dashed #d9d9d9
        .o-i-comment-upload-item
            margin .3rem
            border-radius: 6px
            position: relative
            overflow: hidden
            width: 1.8rem
            height: 1.8rem
            line-height: 1.8rem
            text-align center
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

</style>
