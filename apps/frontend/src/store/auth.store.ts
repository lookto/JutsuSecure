import router from '@/router';
import axios from 'axios';
import { defineStore } from 'pinia';

export type Jutsu =
  | 'monkey'
  | 'dragon'
  | 'rat'
  | 'bird'
  | 'snake'
  | 'ox'
  | 'dog'
  | 'horse'
  | 'tiger'
  | 'boar'
  | 'ram'
  | 'hare';

  interface User {
  id: string,
    hashedJutsu: string,
    email: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: null as User | null,
    loginJutsu: [] as Array<Jutsu>,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async login(email:string) {
      try {
        const {data} = await axios.post('http://localhost:3000/api/signin', {
          email: email,
          jutsu: this.loginJutsu }
      ) 

      this.user = data;

      router.push('/')
        
      } catch (error) {
        
      }

    },
    addJutsuToLogin(newJutsu: Jutsu) {
      if (this.loginJutsu.length < 1 || this.loginJutsu[this.loginJutsu.length -1] !== newJutsu) {
        this.loginJutsu.push(newJutsu)
      }
    },
  },
});
