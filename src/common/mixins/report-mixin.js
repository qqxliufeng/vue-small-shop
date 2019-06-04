export default {
  data () {
    return {
      report: this.$root.report
    }
  },
  methods: {
    doReport (type, ids, cause) {
      this.$http(this.$urlPath.doReport, {
        type: type,
        ids: ids,
        cause: cause
      }, '', (data) => {
        this.$toast('举报成功')
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  }
}
