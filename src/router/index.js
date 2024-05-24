import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '控制台',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '欢迎', icon: 'dashboard' }
    }]
  },
  {
    path: '/profile',
    component: Layout,
    name: '个人信息',
    children: [
      {
        path: 'index',
        name: '个人信息',
        component: () => import('@/views/profile/index'),
        meta: { title: '个人信息', icon: 'edit' }
      }
    ]
  },
  {
    path: '/complaint',
    component: Layout,
    name: '投诉',
    children: [{
      path: 'index',
      name: '投诉',
      component: () => import('@/views/Complaint/index'),
      meta: { title: '投诉', icon: 'table' }
    }]
  },
  {
    path: '/suggestion',
    component: Layout,
    name: '建议',
    children: [{
      path: 'index',
      name: '建议',
      component: () => import('@/views/Suggestion/index'),
      meta: { title: '建议', icon: 'table' }
    }]
  },
  {
    path: '/notice',
    component: Layout,
    name: '温馨提示',
    children: [{
      path: 'index',
      name: '温馨提示',
      component: () => import('@/views/Notice/index'),
      meta: { title: '温馨提示', icon: 'table' }
    }]
  },
  {
    path: '/limit',
    component: Layout,
    name: '车辆限行',
    children: [{
      path: 'index',
      name: '车辆限行',
      component: () => import('@/views/limit/index'),
      meta: { title: '车辆限行', icon: 'table' }
    }]
  },
  {
    path: '/panel',
    component: Layout,
    name: '社区信息',
    children: [{
      path: 'index',
      name: '社区信息',
      component: () => import('@/views/Panel/index'),
      meta: { title: '社区信息', icon: 'table' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
