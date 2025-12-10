<template>
  <div class="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-100 overflow-hidden relative">
    <CelebrationOverlay v-if="loginState === LoginState.SUCCESS" />

    <div class="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] transition-all duration-300">
      <!-- Left Side: Interactive Illustration -->
      <div class="w-full md:w-1/2 bg-gray-50 relative overflow-hidden order-1 md:order-1 h-[300px] md:h-auto border-b md:border-b-0 md:border-r border-gray-100">
        <MascotPanel :is-shy="isShy" :is-celebrating="loginState === LoginState.SUCCESS" />
      </div>

      <!-- Right Side: Login Form -->
      <div class="w-full md:w-1/2 p-8 lg:p-12 flex items-center justify-center order-2 md:order-2">
        <LoginForm 
          @set-shy="setIsShy" 
          @login="handleLogin" 
          :login-state="loginState"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MascotPanel from './components/MascotPanel.vue';
import LoginForm from './components/LoginForm.vue';
import CelebrationOverlay from './components/CelebrationOverlay.vue';
import { LoginState } from './types';

const isShy = ref(false);
const loginState = ref<LoginState>(LoginState.IDLE);

const setIsShy = (shy: boolean) => {
  isShy.value = shy;
};

const handleLogin = () => {
  loginState.value = LoginState.LOADING;
  
  // Simulate API call
  setTimeout(() => {
    loginState.value = LoginState.SUCCESS;
    // Reset after animation
    setTimeout(() => {
      loginState.value = LoginState.IDLE;
    }, 3000);
  }, 1500);
};
</script>

