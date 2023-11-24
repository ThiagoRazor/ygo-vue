import { createRouter, createWebHistory } from 'vue-router'
import HeroView from '@/views/HeroView.vue'
import CardsView from '@/views/CardsView.vue'
import LoginView from '@/views/LoginView.vue'
import CardView from '@/views/CardView.vue'
import OpponentsList from '@/views/OpponentsList.vue';
import OpponentView from '@/views/OpponentView.vue';
import DashBoard from '@/views/DashBoard.vue';
import SearchError from '@/views/SearchError.vue';
import { getAuth } from "firebase/auth";

const authGuard = (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    next();
  } else {
    next({ name: 'login' });
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'hero',
      component: HeroView
    },
    {
      path: '/cards',
      name: 'cards',
      component: CardsView
    },
    {
      path: '/error',
      name: 'error',
      component: SearchError
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/card/:id',
      name: 'card',
      component: CardView,
    },
    {
      path: '/enemies',
      name: 'enemies',
      component: OpponentsList,
    },{
      path: '/enemy/:id',
      name: 'enemy',
      component: OpponentView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      beforeEnter: authGuard
    }
  ]
})

export default router
