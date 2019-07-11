import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Register from '@/pages/login/register'
import Protocol from '@/pages/login/protocol'
import ForgetPasswordStepOne from '@/pages/login/forgetpasswordstepone'
import ForgetPasswordStepTwo from '@/pages/login/forgetpasswordsteptwo'
import FastLogin from '@/pages/login/FastLogin'
import LoginContainer from '@/pages/login/LoginContainer'
import Personal from '@/pages/mine/Personal'
import Message from '@/pages/mine/Message'
import PInfo from '@/pages/mine/PInfo'
import ResetPassword from '@/pages/mine/ResetPassword'
import Contacts from '@/pages/mine/Contacts'
import ContactsList from '@/pages/mine/ContactsList'
import AddContacts from '@/pages/mine/AddContacts'
import LeaveMessage from '@/pages/mine/leavemessage/LeaveMessage'
import Coupon from '@/pages/mine/coupon/Coupon'
import Collection from '@/pages/mine/collection/Collection'
import OrderList from '@/pages/mine/order/OrderList'
import OrderInfo from '@/pages/mine/order/OrderInfo'
import OrderCodeInfo from '@/pages/mine/order/OrderCodeInfo'
import OrderBackMoney from '@/pages/mine/order/OrderInfoBackMoney'
import OrderComment from '@/pages/mine/order/OrderInfoComment'
import OrderInfoPay from '@/pages/mine/order/OrderInfoPay'
import CustomService from '@/pages/mine/CustomService'
// home
import Home from '@/pages/home/Home'
import HomeSearch from '@/pages/home/HomeSearch'
// scenicdetail
import ScenicDetail from '@/pages/scenicdetail/ScenicDetail'
import ScenicInfo from '@/pages/scenicdetail/ScenicInfo'
// scenicList
import ScenicList from '@/pages/sceniclist/ScenicList'
// ticketDetail
import TicketDetail from '@/pages/scenicdetail/TicketDetail'
// reseve
import ReseveDetail from '@/pages/reseve/ReseveDetail'
// commentList
import CommentList from '@/pages/scenicdetail/comment/CommentList'
// leaveMessageList
import LeaveMessageList from '@/pages/scenicdetail/leavemessage/LeaveMessageList'
import LeaveMessageInfo from '@/pages/scenicdetail/leavemessage/LeaveMessageInfo'
// askMessage
import AskMessage from '@/pages/scenicdetail/leavemessage/AskMessage'
import ReplyMessage from '@/pages/scenicdetail/leavemessage/ReplyMessage'

import City from '@/pages/city/City'

import Gallary from 'common/components/gallary/Gallary'

import Auth from '@/pages/wx/Auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        keepAlive: true,
        showTab: true
      },
      props: true
    },
    {
      path: '/index/:identity/:storeId',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true,
        showTab: true
      },
      props: true
    },
    {
      path: '/homesearch',
      name: 'homeSearch',
      component: HomeSearch
    },
    {
      path: '/scenicdetail',
      name: 'scenicDetail',
      component: ScenicDetail
    },
    {
      path: '/scenicinfo',
      name: 'scenicInfo',
      component: ScenicInfo,
      props: true
    },
    {
      path: '/sceniclist',
      name: 'scenicList',
      component: ScenicList
    },
    {
      path: '/ticketdetail',
      name: 'ticketDetail',
      component: TicketDetail
    },
    {
      path: '/resevedetail',
      name: 'reseveDetail',
      component: ReseveDetail,
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/commentlist',
      name: 'commentList',
      component: CommentList
    },
    {
      path: '/leavemessagelist',
      name: 'leaveMessageList',
      component: LeaveMessageList
    },
    {
      path: '/leavemessageinfo',
      name: 'leaveMessageInfo',
      component: LeaveMessageInfo,
      meta: {
        auth: true
      }
    },
    {
      path: '/askmessage',
      name: 'askMessage',
      component: AskMessage,
      meta: {
        auth: true
      }
    },
    {
      path: '/replymessage',
      name: 'replyMessage',
      component: ReplyMessage
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/logincontainer',
      name: 'loginContainer',
      component: LoginContainer,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: Protocol
    },
    {
      path: '/forgetpasswordstepone',
      name: 'fpone',
      component: ForgetPasswordStepOne
    },
    {
      path: '/forgetpasswordsteptwo',
      name: 'fptwo',
      component: ForgetPasswordStepTwo,
      props: true
    },
    {
      path: '/fastlogin',
      name: 'fastLogin',
      component: FastLogin,
      props: true
    },
    // 个人中心
    {
      path: '/mine',
      name: 'personal',
      component: Personal,
      meta: {
        auth: true,
        showTab: true
      }
    },
    {
      path: '/message',
      name: 'message',
      component: Message,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/messageinfo',
      name: 'messageInfo',
      component: () => import('@/pages/mine/MessageInfo')
    },
    {
      path: '/pinfo',
      name: 'pinfo',
      component: PInfo
    },
    {
      path: '/resetpassword',
      name: 'resetPassword',
      component: ResetPassword
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/contactslist',
      name: 'contactsList',
      component: ContactsList
    },
    {
      path: '/addcontacts',
      name: 'addContacts',
      component: AddContacts,
      props: true
    },
    {
      path: '/leavemessage',
      name: 'leaveMessage',
      component: LeaveMessage,
      meta: {
        'x5-fullscreen': true,
        'apple-mobile-web-app-capable': 'yes',
        keepAlive: true
      }
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: Coupon,
      meta: {
        'x5-fullscreen': true,
        'apple-mobile-web-app-capable': 'yes'
      }
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection,
      meta: {
        'x5-fullscreen': true,
        'apple-mobile-web-app-capable': 'yes'
      }
    },
    {
      path: '/orderlist',
      name: 'orderList',
      component: OrderList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/orderAlllist',
      name: 'orderAllList',
      component: () => import('@/pages/mine/order/OrderAllList'),
      meta: {
        auth: true,
        showTab: true,
        keepAlive: true
      }
    },
    {
      path: '/customservice',
      name: 'customService',
      component: CustomService,
      meta: {
        showTab: true,
        keepAlive: true
      }
    },
    {
      path: '/orderinfo/:orderId/:orderType',
      name: 'orderInfo',
      component: OrderInfo,
      props: true
    },
    {
      path: '/ordercodeinfo',
      name: 'orderCodeInfo',
      component: OrderCodeInfo,
      props: true
    },
    {
      path: '/orderbackmoney',
      name: 'orderBackMoney',
      component: OrderBackMoney
    },
    {
      path: '/ordercomment',
      name: 'orderComment',
      component: OrderComment
    },
    {
      path: '/orderinfopay',
      name: 'orderInfoPay',
      component: OrderInfoPay
    },
    {
      path: '/orderpayresult',
      name: 'orderPayResult',
      component: () => import('@/pages/mine/order/OrderPayResult')
    },
    {
      path: '/orderbackprogress',
      name: 'orderBackProgress',
      component: () => import('@/pages/mine/order/OrderBackProgress'),
      props: true
    },
    {
      path: '/adsdetail',
      name: 'adsDetail',
      component: () => import('@/pages/ads/AdsDetail'),
      props: true
    },
    {
      path: '/noticedetail',
      name: 'noticeDetail',
      component: () => import('@/pages/notice/NoticeDetail')
    },
    {
      path: '/city',
      name: 'city',
      component: City,
      props: true
    },
    {
      path: '/gallary',
      name: 'gallary',
      component: Gallary,
      props: true
    },
    {
      path: 'Auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '*',
      component: () => import('@/pages/empty/EmptyPage')
    }
  ],
  scrollBehavior (to, from, saveTop) {
    if (saveTop) {
      return saveTop
    } else {
      return {x: 0, y: 0}
    }
  }
})
