import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Register from '@/pages/login/register'
import Protocol from '@/pages/login/protocol'
import ForgetPasswordStepOne from '@/pages/login/forgetpasswordstepone'
import ForgetPasswordStepTwo from '@/pages/login/forgetpasswordsteptwo'
import FastLogin from '@/pages/login/FastLogin'
import Personal from '@/pages/mine/Personal'
import Message from '@/pages/mine/Message'
import PInfo from '@/pages/mine/PInfo'
import ResetPassword from '@/pages/mine/ResetPassword'
import Contacts from '@/pages/mine/Contacts'
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
import TestScroller from '@/pages/mine/TestScroller'
// home
import Home from '@/pages/home/Home'
import HomeSearch from '@/pages/home/HomeSearch'
// scenicdetail
import ScenicDetail from '@/pages/scenicdetail/ScenicDetail'
import ScenicInfo from '@/pages/scenicdetail/ScenicInfo'
// scenicList
import ScenicList from '@/pages/sceniclist/ScenicList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '/login',
      name: 'login',
      component: Login
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
      component: ForgetPasswordStepTwo
    },
    {
      path: '/fastlogin',
      name: 'fastlogin',
      component: FastLogin
    },
    // 个人中心
    {
      path: '/mine',
      name: 'personal',
      component: Personal,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/message',
      name: 'message',
      component: Message
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
        'x5-fullscreen': true,
        'apple-mobile-web-app-capable': 'yes'
      }
    },
    {
      path: '/addcontacts',
      name: 'addContacts',
      component: AddContacts
    },
    {
      path: '/leavemessage',
      name: 'leaveMessage',
      component: LeaveMessage,
      meta: {
        'x5-fullscreen': true,
        'apple-mobile-web-app-capable': 'yes'
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
      path: '/test',
      name: 'testScroller',
      component: TestScroller,
      meta: {
        keepAlive: true
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
      path: '/customservice',
      name: 'customService',
      component: CustomService
    },
    {
      path: '/orderinfo/:orderType',
      name: 'orderInfo',
      component: OrderInfo,
      props: true,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/ordercodeinfo',
      name: 'orderCodeInfo',
      component: OrderCodeInfo
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
    }
  ]
})
