import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/user'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import HloginView from '@/views/HloginView.vue'

const routes =[
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    { 
    path: '/hlogin',
    component: HloginView,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.user) {
        next();
      } else {
        next('/login');
      }
    },
  },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
    },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;