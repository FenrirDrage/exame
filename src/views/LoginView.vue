<template>
  <div class="login-view">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/user'; // Certifica-te que o caminho está correto
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    // Variáveis reativas
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');

    // Função de login
    const handleLogin = () => {
      if (authStore.login(username.value, password.value)) {
        router.push('/hlogin'); // Redireciona para a página /hlogin
      } else {
        errorMessage.value = 'Invalid username or password'; // Mostra a mensagem de erro
      }
    };

    return {
      username,
      password,
      errorMessage,
      handleLogin,
    };
  },
};
</script>

<style>
/* Estilo opcional */
.error {
  color: red;
}
</style>

  