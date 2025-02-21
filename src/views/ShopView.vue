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
      <!-- Botão para comprar os itens -->
      <button @click="buyItems" class="buy-button">Buy</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/user';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const router = useRouter();

    console.log(cartStore);

    const items = ref([
      { id: 1, name: 'Item 1', price: 10 },
      { id: 2, name: 'Item 2', price: 15 },
      { id: 3, name: 'Item 3', price: 20 },
    ]);

    const addToCart = (item) => {
      cartStore.addToCart(item);
    };

    const removeFromCart = (itemId) => {
      cartStore.removeFromCart(itemId);
    };

    const isAuthenticated = computed(() => authStore.isAuthenticated);

    // Função para comprar os itens
    const buyItems = () => {
      router.push({
    name: 'hlogin', // Nome da rota para HloginView
    state: {
      boughtItems: cartStore.cartItems, // Itens comprados
    },
  });

  // Limpar o carrinho após a compra
  cartStore.clearCart();
};

    return {
      items,
      cartItems: cartStore.cartItems,
      addToCart,
      removeFromCart,
      isAuthenticated,
      buyItems,
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

.buy-button {
  margin-top: 10px;
  background-color: green;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}
</style>
