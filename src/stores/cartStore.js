// src/stores/cartStore.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    purchasedItems: [],
  }),
  actions: {
    addToCart(item) {
      // Verificar se o item já está no carrinho
      const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        // Se já existir, incrementar a quantidade
        existingItem.quantity += 1;
      } else {
        // Se não existir, adicionar ao carrinho com quantidade 1
        this.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    },
  },
});
