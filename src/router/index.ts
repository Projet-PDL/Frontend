import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth.store.ts'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'welcome',
          component: () => import('../components/TheWelcome.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('../views/ContactView.vue'),
        },

        {
          path: '/login',
          name: 'login',
          component: () => import('../views/Login.vue'),
        },

        {
          path: '/register',
          name: 'register',
          component: () => import('../views/Register.vue'),
        },
      ]
    },
    {
      path: '/creation',
      name: 'creation',
      component: () => import('../views/Creation.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
})

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
});

export default router