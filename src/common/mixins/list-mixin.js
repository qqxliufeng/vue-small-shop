let listHandlerMixin = {
  methods: {
    loadSuccess (page, mescroll, tempList) {
      if (page.num === 1) this.list = []
      if (tempList && tempList instanceof Array) {
        this.list = this.list.concat(tempList)
        mescroll.endSuccess(tempList.length)
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
