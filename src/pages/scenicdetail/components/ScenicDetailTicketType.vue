<template>
    <div class="s-d-t-type-container">
        <div class="s-d-t-type-title-wrapper">
             <span>门票类型</span>
        </div>
        <div>
            <el-tabs>
                <el-tab-pane label="成人票">
                    <ul>
                        <li v-for="(item, index) of ticketList" :key="index">
                            <scenic-detail-ticket-item :item="item"></scenic-detail-ticket-item>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="学生票">
                    <ul>
                        <li v-for="(item, index) of tempList" :key="index">
                            <scenic-detail-ticket-item :item="item"></scenic-detail-ticket-item>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="特价票">
                    <ul>
                        <li v-for="(item, index) of ticketList" :key="index">
                            <scenic-detail-ticket-item :item="item"></scenic-detail-ticket-item>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="双人票">
                    <ul>
                        <li v-for="(item, index) of tempList" :key="index">
                            <scenic-detail-ticket-item :item="item"></scenic-detail-ticket-item>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="一日游">
                    <ul>
                        <li v-for="(item, index) of ticketList" :key="index">
                            <scenic-detail-ticket-item :item="item"></scenic-detail-ticket-item>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="一日游">
                    <ul>
                        <li v-for="(item, index) of tempList" :key="index">
                            <scenic-detail-ticket-item :item="item"></scenic-detail-ticket-item>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import ScenicDetailTicketItem from './ScenicDetailTicketItem'
export default {
  name: 'scenicDetailTicketType',
  components: {
    ScenicDetailTicketItem
  },
  data () {
    return {
      ticketList: [
        {
          name: '成人票',
          remark: '这是预定须知'
        },
        {
          name: '成人票',
          remark: '这是预定须知'
        },
        {
          name: '成人票',
          remark: '这是预定须知'
        },
        {
          name: '成人票',
          remark: '这是预定须知'
        },
        {
          name: '成人票',
          remark: '这是预定须知'
        }
      ],
      tempList: [
        {
          name: '学生票',
          remark: '这是预定须知'
        },
        {
          name: '学生票',
          remark: '这是预定须知'
        },
        {
          name: '学生票',
          remark: '这是预定须知'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-t-type-container
    border-top #f5f5f5 solid rem(.1)
    .s-d-t-type-title-wrapper
        padding rem(.2)
        normalTextStyle(#333, .35)
        borderBottom()
    .s-d-t-type-wrapper
        padding rem(.2)
</style>
