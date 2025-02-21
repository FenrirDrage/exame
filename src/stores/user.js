import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    users: [
      { username: 'admin', password: 'admin' },
      { username: 'user1', password: '123456' },
    ],
  }),
  actions: {
    login(username, password) {
      // Verificar se o utilizador e a password correspondem a um utilizador existente
      const validUser = this.users.find(
        (user) => user.username === username && user.password === password
      );

      if (validUser) {
        this.user = { username: validUser.username }; // Armazenar apenas o nome do utilizador para o estado de login
        return true;
      }
      return false;
    },
    logout() {
      this.user = null;
      router.push({ name: '/' });
    },
  },
  getters:{
    isAuthenticated: (state) => !!state.user,
    }
  });
