<template>
    <div>
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp">
            <ul>
                <li v-for="(item,index) of mList" :key="index">
                    <div class="test-div" @click="myClick">
                      {{item}}
                    </div>
                </li>
            </ul>
        </mescroll-vue>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'testScroller',
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollDown: {}, // 下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: { // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        // 以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 // 每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
        noMoreSize: 5, // 如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: 'xxid', // 父布局的id (1.3.5版本支持传入dom元素)
          // icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
          tip: '暂无相关数据~' // 提示
        }
      },
      mList: []
    }
  },
  methods: {
    upCallback (page, mescroll) {
      const tempList = []
      for (let index = 0; index < 20; index++) {
        tempList.push('item' + index)
      }
      setTimeout(() => {
        this.mList = this.mList.concat(tempList)
        mescroll.endSuccess(10)
      }, 1000)
    },
    myClick () {
      this.$router.push({name: 'orderInfo', params: {orderType: '4'}})
    }
  },
  beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      console.log(vm)
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
  },
  beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
  // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
  }
}
</script>

<style lang="stylus" scoped>
.mescroll
    position: fixed
    top 0
    bottom 0
    left 0
    right 0
    height auto
    .test-div
      height 2rem
</style>
