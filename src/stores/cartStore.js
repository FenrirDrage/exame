import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    // Função para adicionar um item ao carrinho
    addToCart(item) {
      const existingItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1; // Incrementa a quantidade se o item já estiver no carrinho
      } else {
        this.cartItems.push({ ...item, quantity: 1 }); // Adiciona um novo item
      }
    },

    // Função para remover um item do carrinho
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    },

    // Função para limpar o carrinho
    clearCart() {
      this.cartItems = [];
    },
  },
});