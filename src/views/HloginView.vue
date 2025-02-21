<template>
  <div class="home-view">
    <h2>Welcome, {{ authStore.user?.username }}</h2>
    <button @click="logout">Logout</button>

    <div v-if="purchasedItems.length > 0">
      <h3>Purchased Items:</h3>
      <ul>
        <li v-for="item in purchasedItems" :key="item.id">
          {{ item.name }} - Quantity: {{ item.quantity }} - Total: €{{ item.price * item.quantity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const purchasedItems= router.currentRoute.value.state?.boughtItems || [];

    // Recupera os itens comprados da query string
    //const purchasedItems = route.query.items ? JSON.parse(route.query.items) : [];

    const logout = () => {
      authStore.logout();
      router.push('/');
    };

    return {
      authStore,
      logout,
      purchasedItems,
    };
  },
};
</script>
