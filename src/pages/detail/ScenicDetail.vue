<template>
    <div>
        <scenic-detail-header></scenic-detail-header>
        <scenic-detail-images></scenic-detail-images>
        <scenic-detail-info></scenic-detail-info>
        <scenic-detail-hot></scenic-detail-hot>
    </div>
</template>

<script>
import ScenicDetailHeader from './components/ScenicDetailHeader'
import ScenicDetailImages from './components/ScenicDetailImages'
import ScenicDetailInfo from './components/ScenicDetailInfo'
import ScenicDetailHot from './components/ScenicDetailHot'
export default {
  name: 'scenicDetail',
  components: {
    ScenicDetailHeader,
    ScenicDetailImages,
    ScenicDetailInfo,
    ScenicDetailHot
  }
}
</script>

<style lang="stylus" scoped>
.test
    height 1000px
</style>
