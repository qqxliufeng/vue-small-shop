<template>
    <div>
        <scenic-detail-header></scenic-detail-header>
        <scenic-detail-images></scenic-detail-images>
        <scenic-detail-info></scenic-detail-info>
        <scenic-detail-hot></scenic-detail-hot>
        <scenic-detail-leave-message></scenic-detail-leave-message>
    </div>
</template>

<script>
import ScenicDetailHeader from './components/ScenicDetailHeader'
import ScenicDetailImages from './components/ScenicDetailImages'
import ScenicDetailInfo from './components/ScenicDetailInfo'
import ScenicDetailHot from './components/ScenicDetailHot'
import ScenicDetailLeaveMessage from './components/ScenicDetailLeaveMessage'
export default {
  name: 'scenicDetail',
  components: {
    ScenicDetailHeader,
    ScenicDetailImages,
    ScenicDetailInfo,
    ScenicDetailHot,
    ScenicDetailLeaveMessage
  }
}
</script>

<style lang="stylus" scoped>
.test
    height 1000px
</style>
