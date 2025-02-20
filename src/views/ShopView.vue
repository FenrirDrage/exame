<template>
    <div class="shop-view">
      <h1>Shop</h1>
      <div v-for="item in items" :key="item.id" class="item">
        <h3>{{ item.name }}</h3>
        <p>Price: €{{ item.price }}</p>
        <button @click="addToCart(item)">Add to Cart</button>
      </div>
  
      <!-- Exibir o carrinho apenas se o utilizador estiver autenticado -->
      <h2 v-if="isAuthenticated">Shopping Cart</h2>
      <div v-if="isAuthenticated && cartItems.length === 0">Your cart is empty</div>
      <div v-else-if="isAuthenticated">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <p>{{ item.name }} (x{{ item.quantity }}) - €{{ item.price * item.quantity }}</p>
          <button @click="removeFromCart(item.id)">Remove</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useCartStore } from '@/stores/cartStore';
  import { useAuthStore } from '@/stores/user';
  
  export default {
    setup() {
      const cartStore = useCartStore();
      const authStore = useAuthStore();
  
      // Itens disponíveis na loja
      const items = ref([
        { id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 15 },
        { id: 3, name: 'Item 3', price: 20 },
      ]);
  
      // Funções para adicionar e remover itens
      const addToCart = (item) => {
        cartStore.addToCart(item);
      };
  
      const removeFromCart = (itemId) => {
        cartStore.removeFromCart(itemId);
      };
  
      // Computed para verificar se o utilizador está autenticado
      const isAuthenticated = computed(() => authStore.isAuthenticated);
  
      return {
        items,
        cartItems: cartStore.cartItems,
        addToCart,
        removeFromCart,
        isAuthenticated,
      };
    },
  };
  </script>
  
  <style>
  .shop-view {
    padding: 20px;
  }
  
  .item,
  .cart-item {
    margin: 10px 0;
  }
  
  button {
    padding: 5px 10px;
    margin-top: 5px;
  }
  </style>
  