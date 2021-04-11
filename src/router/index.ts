import { createRouter, createWebHistory } from 'vue-router';
import DeviceManager from '../components/DeviceManager.vue';
import Render from '../components/Render.vue';
import Login from '../components/Login.vue';
import component from '../shims-vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'DeviceManager',
    component: DeviceManager
  },
  {
    path: '/render',
    name: 'Render',
    component: Render
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;