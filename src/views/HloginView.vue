<template>
    <div class="home-view">
      <h2>Welcome, {{ authStore.user?.username }}</h2>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const authStore = useAuthStore();
      const router = useRouter();
  
      const logout = () => {
        authStore.logout();
        router.push('/login');
      };
  
      return {
        authStore,
        logout,
      };
    },
  };
  </script>