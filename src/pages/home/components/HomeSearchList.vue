<template>
    <div class="h-s-list-container">
        <div v-for="(item, index) of resultList" :key="index">{{item}}</div>
    </div>
</template>

<script>
export default {
  name: 'homeSearchList',
  data () {
    return {
      resultList: []
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-s-list-container
    position fixed
    top $headerHeight
    left 0
    right 0
    height 100%
    padding-bottom rem($headerHeight)
    box-sizing border-box
    overflow-y scroll
    & div
        height rem(1)
</style>
