<template>
  <div class='simple-scenic-detail-container'>
    <navi title="门票详情" :isFixed="true"></navi>
    <div style="height: .86rem"></div>
    <div class="img-wrapper">
      <img :src="$utils.image.getImagePath(image)">
    </div>
    <scenic-detail-ticket-type :typeGoodsList="typeGoodsList" @reseve-detail="reseveDetail"></scenic-detail-ticket-type>
  </div>
</template>

<script>
import navi from 'common/components/navigation'
import ScenicDetailTicketType from './components/ScenicDetailTicketType'
export default {
  name: 'simpleScenicDetail',
  components: {
    navi,
    ScenicDetailTicketType
  },
  data () {
    return {
      image: '',
      categoryId: null,
      typeGoodsList: null
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.simpleScenicDetailUrl, {
        s_id: this.$route.query.sid,
        businessId: this.$route.query.bId,
        identity: this.$route.query.identity,
        store_id: this.$route.query.tid
      }, '', (res) => {
        this.image = res.data.scenicimage
        this.categoryId = res.data.category_id
        this.typeGoodsList = res.data.type_list
      }, (errorCode, error) => {
      })
    },
    reseveDetail (goodsId) {
      switch (this.categoryId) {
        case 14:
          this.$router.push({name: 'productionDetail', query: { goodsId: goodsId.goodsId }})
          break
        case 13:
          this.$router.push({name: 'reseveDetail', query: { goods_id: goodsId.goodsId, scenicId: this.$route.query.sid }})
          break
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.simple-scenic-detail-container
    position relative
    .img-wrapper
        height 0
        padding-bottom 50%
        overflow hidden
        & img
            width 100%
            object-fit cover
            background-color #f5f5f5
</style>
