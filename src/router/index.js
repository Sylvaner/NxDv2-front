import { createRouter, createWebHistory } from 'vue-router';
import DevicesList from '../views/DevicesList.vue';
import Scenarios from '../views/Scenarios.vue';

const routes = [
  {
    path: '/',
    name: 'DevicesList',
    component: DevicesList
  },
  {
    path: '/scenarios',
    name: 'Scenarios',
    component: Scenarios
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
