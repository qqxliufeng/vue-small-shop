<template>
    <div class="o-i-step-container">
        <el-steps :active="2" align-center finish-status="success" process-status="wait">
            <el-step title="提交" ></el-step>
            <el-step title="正在审核"></el-step>
            <el-step title="退款完成"></el-step>
        </el-steps>
    </div>
</template>

<script>
export default {
  name: 'orderStep'
}
</script>

<style lang="stylus" scoped>
.o-i-step-container
    background-color #ffffff
    border-radius .1rem
    padding .2rem 0
    margin-top .2rem
    .o-i-step-item
        font-size .2rem
</style>
