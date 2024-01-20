import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, _from, next)=> {
//   const authStore = useAuthStore();

//   if (!authStore.isLoggedIn && !['login'].includes(String(to.name))) {
//     next({ name: 'login'})
//   }
// })

export default router;