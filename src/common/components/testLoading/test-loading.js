let TestLoading = {}

TestLoading.install = (Vue) => {
  let testLoad = Vue.extend({
    data () {
      return {
        show: false,
        tip: '正在加载…'
      }
    },
    render: function (createElement) {
      if (this.show) return false
      return createElement(
        'div', {
          style: {
            backgroundColor: '#f00',
            color: '#fff',
            zIndex: 1111,
            width: '100%'
          }
        },
        [
          createElement('span', {
            domProps: {
              innerHTML: '这是子结点'
            }
          })
        ]
      )
    }
  })
  Vue.component('testLoading', testLoad)
}

export default TestLoading
