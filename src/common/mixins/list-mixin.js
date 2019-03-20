let listHandlerMixin = {
  methods: {
    loadSuccess (page, mescroll, data) {
      if (page.num === 1) this.list = []
      if (data.data && data.data instanceof Array) {
        this.list = this.list.concat(data.data)
        mescroll.endSuccess(data.data.length)
      } else {
        mescroll.endSuccess(0)
      }
    },
    loadError (mescroll) {
      this.$toast('加载失败')
      mescroll.endErr()
    }
  }
}

export default listHandlerMixin
