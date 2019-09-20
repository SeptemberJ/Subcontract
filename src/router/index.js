import Vue from 'vue'
import VueRouter from 'vue-router'
import ContractAdd from '@/pages/ContractAdd'
import ContractList from '@/pages/ContractList'
import ContractDetail from '@/pages/ContractDetail'
import Login from '@/pages/Login'
// import store from '../vuex/store'
import {getCookie} from '@/util/utils'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {requireAuth: false}
    },
    {
      path: '/ContractAdd',
      name: 'ContractAdd',
      component: ContractAdd,
      meta: {requireAuth: true}
    },
    {
      path: '/ContractList',
      name: 'ContractList',
      component: ContractList,
      meta: {requireAuth: true}
    },
    {
      path: '/ContractDetail',
      name: 'ContractDetail',
      component: ContractDetail,
      meta: {requireAuth: true}
    },
    {path: '*', redirect: '/Login'}
  ]
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

// 登录控制
router.beforeEach((to, from, next) => {
  // store.dispatch('changePath', to.name)
  if (to.meta.requireAuth) {
    if (getCookie('ZTC_14a808c40bba58c2c')) {
      next()
    } else {
      localStorage.clear()
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
  // store.dispatch('changePath', to.name)
})
export default router
