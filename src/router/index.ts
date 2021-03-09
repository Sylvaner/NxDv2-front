import { createRouter, createWebHistory } from 'vue-router';
import DeviceManager from '../components/DeviceManager.vue';
import Render from '../components/Render.vue';

const routes = [
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