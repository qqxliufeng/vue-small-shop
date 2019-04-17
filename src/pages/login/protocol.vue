<template>
    <div>
        <navi title="用户协议" :isFixed="true"></navi>
        <div v-if="protocol" v-html="protocol" class="protocol">
        </div>
    </div>
</template>
<script>
import navi from 'common/components/navigation'
export default {
  name: 'protocol',
  components: {
    navi
  },
  data () {
    return {
      protocol: ''
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.registerProtocol, {}, '', (data) => {
        this.protocol = data.data
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.protocol
    padding .2rem
    margin-top $headerHeight
</style>
