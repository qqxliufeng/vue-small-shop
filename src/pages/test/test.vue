<template>
  <div>
    <ul>
      <li v-for="(item, index) of list" :key="index">
        <div class="name" @click="itemNameClick(index)">{{item.name}}</div>
        <div v-if="item.activited">
           <div v-for="(it, i) of item.listItem" :key="i">
            {{it.title}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'testVue',
  components: {},
  data () {
    return {
      list: [
        {
          name: 'list item1',
          activited: true,
          listItem: [
            {
              title: 'list item1 title'
            },
            {
              title: 'list item1 title'
            },
            {
              title: 'list item1 title'
            },
            {
              title: 'list item1 title'
            }
          ]
        },
        {
          name: 'list item2',
          activited: false,
          listItem: [
            {
              title: 'list item2 title'
            }
          ]
        },
        {
          name: 'list item3',
          activited: false,
          listItem: [
            {
              title: 'list item3 title'
            }
          ]
        },
        {
          name: 'list item4',
          activited: false,
          listItem: [
            {
              title: 'list item4 title'
            }
          ]
        }
      ]
    }
  },
  methods: {
    itemNameClick (index) {
      this.list.forEach((it, i) => {
        it.activited = index === i
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.name
    background-color $orangeColor
    line-height rem(.5)
</style>
