import { createRouter, createWebHistory } from 'vue-router'
import HeroView from '@/views/HeroView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CardView from '@/views/CardView.vue'
import DashBoard from '@/views/DashBoard.vue';
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
      path: '/home',
      name: 'home',
      component: HomeView
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
    },{
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      beforeEnter: authGuard
    }
  ]
})

export default router
