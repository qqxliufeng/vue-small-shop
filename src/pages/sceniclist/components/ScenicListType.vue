<template>
    <div class="s-l-tags-container">
        <span v-for="(item, index) of tagsList" :key="index" class="s-l-tags-item" :class="{ 's-l-tags-item-selected': item.selected }" @click="itemClick(item)">{{item.name}}</span>
    </div>
</template>

<script>
export default {
  name: 'ScenicListType',
  data () {
    return {
      tagsList: [
        {
          name: '随买随用',
          selected: true
        },
        {
          name: '热门产品',
          selected: false
        },
        {
          name: '随买随用随买随用',
          selected: false
        },
        {
          name: '随买',
          selected: false
        },
        {
          name: '随买随用',
          selected: false
        },
        {
          name: '热门产品',
          selected: false
        },
        {
          name: '随买随用随买随用',
          selected: false
        },
        {
          name: '随买',
          selected: false
        }
      ]
    }
  },
  methods: {
    itemClick (item) {
      this.tagsList.forEach(element => {
        element.selected = element === item
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-l-tags-container
    padding-top rem(.1)
    overflow hidden
    .s-l-tags-item
        float left
        margin rem(.1) rem(.2)
        border-radius rem(.1)
        border #eeeeee solid 1px
        padding rem(.1) rem(.2)
        color #888
    .s-l-tags-item-selected
        border $primary solid 1px
        color $primary
</style>
