<template>
    <div class="o-i-user-info">
        <el-collapse value="1">
            <el-collapse-item name="1">
                <template slot="title">
                    <p class="o-i-use-info-title">{{title}}</p>
                </template>
                <div class="o-i-user-info-wrapper">
                    <div v-for="(item, index) of tourist" :key="index" class="user-info-container">
                        <p class="wrapper">
                            <span class="user-key">姓名</span>
                            <span class="user-value">{{item.t_username ? item.t_username : '暂无'}}</span>
                        </p>
                        <p class="wrapper">
                            <span class="user-key">手机号</span>
                            <span class="user-value">{{item.t_phone ? item.t_phone : '暂无'}}</span>
                        </p>
                        <p class="wrapper">
                            <span class="user-key">身份证</span>
                            <span class="user-value">{{item.t_id_no ? item.t_id_no : '暂无'}}</span>
                        </p>
                        <p class="wrapper">
                            <span class="user-key">学校</span>
                            <span class="user-value">{{item.t_school ? item.t_school : '暂无'}}</span>
                        </p>
                    </div>
                    <ticket-remark v-for="(item, index) of remarks" :key="index" :remark="item"></ticket-remark>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import orderInfoKeyValue from './orderInfoKeyValue'
import TicketRemark from 'common/components/ticket-remark'
export default {
  name: 'orderInfoUserInfo',
  props: {
    title: {
      type: String,
      default: ''
    },
    tourist: Array,
    remarks: Array
  },
  components: {
    orderInfoKeyValue,
    TicketRemark
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
>>> .el-collapse-item__content
    padding-bottom 0
.o-i-use-info-title
    color #333333
    font-size .28rem
    padding-left .2rem
    &::before
        beforeLine()
.o-i-user-info-wrapper
    padding-left .2rem
    .user-info-container
        border-bottom 1px solid #f5f5f5
        .wrapper
            margin-left .2rem
            margin .3rem .2rem
            & span
                display inline-block
            & .user-key
                color #333333
                width 30%
                vertical-align top
            & .user-value
                width 60%
                margin-left 5%
                vertical-align middle
                color #888888
</style>
