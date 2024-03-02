import { createRouter, createWebHistory } from 'vue-router';
import PathwayDetail from '../views/PathwayDetail.vue';
import ExerciseDetail from '../views/ExerciseDetail.vue';
import ExercisesList from '../views/ExercisesList.vue';
import HomePage from '../views/HomePage.vue';

const routes = [
  {
    path: '/record/:id',
    name: 'PathwayDetail',
    component: PathwayDetail,
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/exercises',
    name: 'ExercisesList',
    component: ExercisesList,
  },
  {
  path: '/exercise/:id',
  name: 'ExerciseDetail',
  component: ExerciseDetail
},

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
