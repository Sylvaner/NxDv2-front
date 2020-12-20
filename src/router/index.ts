import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DevicesList from '../views/DevicesList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'DevicesList',
    component: DevicesList
  },
  {
    path: '/scenarios',
    name: 'Scenarios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "scenarios" */ '../views/Scenarios.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
