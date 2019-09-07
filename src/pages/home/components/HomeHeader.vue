<template>
    <div class="h-h-header-container">
      <div class="header-bg"></div>
      <div class="h-h-header-wrapper">
        <span class="h-h-header-title" @click="citySelector">{{currentCity.value}}<i class="el-icon-arrow-down"></i></span>
        <span class="h-h-header-search" @click="startSearch"><i class="el-icon-search"></i>搜索景点、关键字</span>
        <span class="iconfont h-h-header-mine" @click="startPersonal">&#xe8a0;</span>
      </div>
      <!-- <el-amap vid="amap" :plugin="plugin" class="amap-demo" style="display:none"></el-amap> -->
    </div>
</template>
<script>
export default {
  name: 'homeHeader',
  props: {
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // plugin: [{
      //   pName: 'Geolocation',
      //   events: {
      //     init: (amap) => {
      //       amap.getCityInfo((status, result) => {
      //         if (result.city) {
      //           let saveCity = this.$root.state.currentCity.value
      //           if (saveCity !== result.city) {
      //             this.$emit('cityDiffrent', {city: result.city})
      //           } else {
      //             this.$root.state.changeCity({
      //               value: result.city,
      //               code: '-1'
      //             })
      //           }
      //         }
      //       }
      //       )
      //     }
      //   }
      // }]
    }
  },
  computed: {
    currentCity () {
      return this.$root.state.currentCity
    },
    opacityStyle () {
      let opacity = 0
      if (this.scrollTop > 0) {
        opacity = Math.min(1, this.scrollTop / 140)
      }
      return {
        opacity
      }
    },
    colorStyle () {
      return { color: this.scrollTop === 0 ? '#fff' : '#000' }
    }
  },
  methods: {
    startSearch () {
      this.$router.push({name: 'homeSearch'})
    },
    startPersonal () {
      this.$router.replace({name: 'personal', params: {backName: 'personal'}})
      this.$root.$emit('changeTab', {index: '4'})
    },
    citySelector () {
      this.$router.push({name: 'city', params: { backName: 'home' }})
    }
  },
  mounted () {
    this.$root.$on('selectedCity', (data) => {
      if (data.city) {
        this.$root.state.changeCity(data.city.city)
        this.$emit('changeCity')
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-h-header-container
    position fixed
    top 0
    left 0
    right 0
    z-index 999
    height rem($headerHeight)
    .h-h-header-wrapper
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        display flex
        padding .1rem .2rem
        align-items center
        overflow hidden
        z-index 998
        .h-h-header-title
            min-width rem(.5)
            ellipse()
            normalTextStyle(#333, .3)
            margin-right rem(.2)
            & i
                margin-left .1rem
        .h-h-header-search
            flex 1
            background-color #dddddd
            border-radius rem(.1)
            normalTextStyle(#888, .25)
            height rem(.6)
            line-height rem(.6)
            text-align center
            opacity .5
            & i
              font-size rem(.3)
              margin-right rem(.15)
        .h-h-header-mine
            normalTextStyle(#333, .45)
            margin-left rem(.2)
    .header-bg
        height 100%
        background-color #f5f5f5
</style>
