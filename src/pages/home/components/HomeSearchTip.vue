<template>
    <div class="h-t-tip-container">
        <div class="h-t-tip-wrapper">
            <div class="h-t-tip-title">
                <span><i class="iconfont">&#xe62f;</i>搜索历史</span>
                <span class="el-icon-delete"></span>
            </div>
            <div class="h-t-tip-tags-wrapper">
                <el-tag size="small" type="info" v-for="(item, index) of historyTagList" :key="index" class="h-t-tip-tag-item">{{item.name}}</el-tag>
            </div>
        </div>
        <div class="h-t-tip-wrapper">
            <div class="h-t-tip-title">
                <span><i class="iconfont">&#xe6a0;</i>热门搜索</span>
                <span class="el-icon-delete"></span>
            </div>
            <div class="h-t-tip-tags-wrapper">
                <el-tag size="small" type="info" v-for="(item, index) of historyTagList" :key="index" class="h-t-tip-tag-item">{{item.name}}</el-tag>
                <el-tag size="small" type="info" v-for="(item, index) of historyTagList" :key="index" class="h-t-tip-tag-item">{{item.name}}</el-tag>
                <el-tag size="small" type="info" v-for="(item, index) of historyTagList" :key="index" class="h-t-tip-tag-item">{{item.name}}</el-tag>
                <el-tag size="small" type="info" v-for="(item, index) of historyTagList" :key="index" class="h-t-tip-tag-item">{{item.name}}</el-tag>
                <el-tag size="small" type="info" v-for="(item, index) of historyTagList" :key="index" class="h-t-tip-tag-item">{{item.name}}</el-tag>
                <el-tag size="small" type="info" v-for="(item, index) of historyTagList" :key="index" class="h-t-tip-tag-item">{{item.name}}</el-tag>
                <el-tag size="small" type="info" v-for="(item, index) of historyTagList" :key="index" class="h-t-tip-tag-item">{{item.name}}</el-tag>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'homeSearchTip',
  data () {
    return {
      historyTagList: [
        {
          name: '这是标签'
        },
        {
          name: '这是标签'
        },
        {
          name: '这是标签'
        },
        {
          name: '这是标签2'
        },
        {
          name: '这是标签2222'
        },
        {
          name: '这是标签'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-t-tip-container
    position fixed
    top $headerHeight
    left 0
    right 0
    height 100%
    box-sizing border-box
    padding-bottom rem($headerHeight)
    overflow-y scroll
    .h-t-tip-wrapper
        padding rem(.2)
        .h-t-tip-title
            overflow hidden
            width 100%
            line-height rem(.4)
            & span:nth-child(1)
                float left
                normalTextStyle(#555, .3)
                line-height rem(.6)
                & i
                    color $orangeColor
                    margin-right rem(.1)
            & span:nth-child(2)
                float right
                normalTextStyle(#555, .4)
    .h-t-tip-tags-wrapper
        .h-t-tip-tag-item
            margin rem(.2)
</style>
