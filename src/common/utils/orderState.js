export function createStateModel (it) {
  switch (it.status) {
    case 'PAY_STATUS_NO': // 待付款
      it.stateModel = {
        orderType: '1',
        stateTip: '待付款',
        time: {
          title: '剩余支付时间：',
          time: Math.max(0, (Number(it.timeout_express) - Number(this.serverTime)) * 1000)
        },
        action1: {
          title: '取消订单',
          show: true,
          action: () => {
            let confirm = window.confirm('是否要取消此订单？')
            if (confirm) {
              this.$http(this.$urlPath.orderCancel, {
                ord_id: it.ord_id
              }, '正在取消…', (result) => {
                this.list.splice(this.list.indexOf(it), 1)
                this.$toast('订单取消成功')
              }, (errorCode, error) => {
                this.$toast(error)
              })
            }
          }
        },
        action2: {
          title: '立即支付',
          show: Number(it.timeout_express) - Number(this.serverTime) > 0,
          action: () => {}
        }
      }
      break
    case 'PAY_STATUS_YES': // 已支付
      it.stateModel = {
        orderType: '2',
        stateTip: '已支付',
        time: {
          title: '支付时间：',
          time: it.ord_play_time
        },
        action1: {
          title: '',
          show: false,
          action: null
        },
        action2: {
          title: it.is_refund === 1 ? '申请退款' : '',
          show: it.is_refund === 1,
          action: it.is_refund ? () => {
            this.$router.push({name: 'orderBackMoney', query: {id: it.ord_id}})
          } : null
        }
      }
      break
    case 'PAY_STATUS_PARTIAL_REFUND': // 部分退款
      break
    case 'PAY_STATUS_REFUNDED': // 已退款
      break
    case 'USE_STATUS_NO': // 未使用
      break
    case 'USE_STATUS': // 已使用
      break
    case 'USE_STATUS_OFF': // 被取消
    case 'USE_STATUS_EXPIRD': // 已过期
      it.stateModel = {
        orderType: '6',
        stateTip: '已过期',
        time: {
          title: '过期时间：',
          time: it.express_time
        },
        action1: {
          title: '删除订单',
          show: true,
          action: () => {
            let confirm = window.confirm('是否要删除此订单？')
            if (confirm) {
              this.$http(this.$urlPath.orderDelete, {
                ord_id: it.ord_id
              }, '正在删除…', (result) => {
                this.list.splice(this.list.indexOf(it), 1)
                this.$toast('订单删除成功')
              }, (errorCode, error) => {
                this.$toast(error)
              })
            }
          }
        },
        action2: {
          title: '重新购票',
          show: true,
          action: () => {
            this.$router.push({name: 'reseveDetail', query: { goods_id: it.ord_goodsId }})
          }
        }
      }
      break
    case 'NO_COMMENT': // 待评价
      it.stateModel = {
        orderType: '3',
        stateTip: '待评价',
        time: {
          title: '验票时间：',
          time: it.express_time
        },
        action1: {
          title: '',
          show: false,
          action: null
        },
        action2: {
          title: '去评价',
          show: true,
          action: () => {
            this.$router.push({name: 'orderComment', params: {orderId: it.ord_id.toString()}})
          }
        }
      }
      break
    case 'ALREADY_COMMENT': // 已经评价
      it.stateModel = {
        orderType: '5',
        stateTip: '已完成',
        time: {
          title: '评价时间：',
          time: it.express_time
        },
        action1: {
          title: '',
          show: false,
          action: null
        },
        action2: {
          title: '',
          show: false,
          action: null
        }
      }
      break
    case 'REFUND_STATUS_NO': // 未退票
      break
    case 'REFUND_STATUS_PENDING': // 退款中
      it.stateModel = {
        orderType: '7',
        stateTip: '退款/售后',
        time: {
          title: '评价时间：',
          time: it.express_time
        },
        action1: {
          title: '',
          show: false,
          action: null
        },
        action2: {
          title: '查看进度',
          show: true,
          action: () => {
            this.$router.push({name: 'orderComment', params: {orderId: it.ord_id.toString()}})
          }
        }
      }
      break
    case 'REFUND_STATUS_YES': // 已退票
      break
  }
}
