import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { useAuthStore } from '@/store/auth.store';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next)=> {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn && to.name !== 'login') {
    next({ name: 'login'})
  }else {
    next();
  }
})

export default router;