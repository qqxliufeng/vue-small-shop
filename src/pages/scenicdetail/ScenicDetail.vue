<template>
    <div>
        <scenic-detail-header></scenic-detail-header>
        <scenic-detail-images></scenic-detail-images>
        <scenic-detail-info></scenic-detail-info>
        <scenic-detail-hot></scenic-detail-hot>
        <scenic-detail-ticket-type></scenic-detail-ticket-type>
        <scenic-detail-leave-message></scenic-detail-leave-message>
        <scenic-detail-comment></scenic-detail-comment>
    </div>
</template>

<script>
import ScenicDetailHeader from './components/ScenicDetailHeader'
import ScenicDetailImages from './components/ScenicDetailImages'
import ScenicDetailInfo from './components/ScenicDetailInfo'
import ScenicDetailHot from './components/ScenicDetailHot'
import ScenicDetailTicketType from './components/ScenicDetailTicketType'
import ScenicDetailLeaveMessage from './components/ScenicDetailLeaveMessage'
import ScenicDetailComment from './components/ScenicDetailComment'
export default {
  name: 'scenicDetail',
  components: {
    ScenicDetailHeader,
    ScenicDetailImages,
    ScenicDetailInfo,
    ScenicDetailHot,
    ScenicDetailTicketType,
    ScenicDetailLeaveMessage,
    ScenicDetailComment
  }
}
</script>

<style lang="stylus" scoped>
.test
    height 1000px
</style>
