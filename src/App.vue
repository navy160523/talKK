<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">
        <h1>카카오톡 웹</h1>
      </div>
      <div class="nav-menu">
        <router-link to="/" class="nav-link">홈</router-link>
        <router-link to="/chat" class="nav-link" v-if="isLoggedIn">채팅</router-link>
        <button v-if="!isLoggedIn" @click="login" class="login-btn">카카오톡 로그인</button>
        <button v-else @click="logout" class="logout-btn">로그아웃</button>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isLoggedIn = computed(() => authStore.isLoggedIn)

const login = () => {
  window.location.href = '/api/auth/kakao'
}

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-brand h1 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.login-btn, .logout-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.login-btn {
  background: #fee500;
  color: #000;
}

.login-btn:hover {
  background: #fdd835;
  transform: translateY(-2px);
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.main-content {
  padding: 2rem;
}
</style>
