import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';


const pinia = createPinia();

pinia.use(({ store }) => {
  const piniaStore = store;
  // piniaStore.axios = api;
});

createApp(App).use(router).use(pinia).mount('#app')
