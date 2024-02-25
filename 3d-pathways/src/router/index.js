import { createRouter, createWebHistory } from 'vue-router';
import RecordDetail from '../views/RecordDetail.vue';
import HomePage from '../views/HomePage.vue';

const routes = [
  {
    path: '/record/:id',
    name: 'RecordDetail',
    component: RecordDetail,
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
