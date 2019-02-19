<template>
    <div @click="comment">
      <button>进入</button>
    </div>
</template>

<script>
export default {
  name: 'orderInfoWaitingComment',
  methods: {
    comment () {
      this.$router.push({name: 'orderComment'})
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
