<template>
  <div class="home">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">카카오톡 웹</h1>
        <p class="hero-subtitle">카카오톡 API를 사용하여 웹에서 대화를 확인하세요</p>
        
        <div class="features">
          <div class="feature-card">
            <div class="feature-icon">🔐</div>
            <h3>안전한 로그인</h3>
            <p>카카오톡 OAuth를 통한 안전한 인증</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💬</div>
            <h3>실시간 채팅</h3>
            <p>웹에서 카카오톡 대화 확인</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>반응형 디자인</h3>
            <p>모든 기기에서 최적화된 경험</p>
          </div>
        </div>
        
        <div class="cta-section">
          <button v-if="!isLoggedIn" @click="login" class="cta-button">
            카카오톡으로 시작하기
          </button>
          <router-link v-else to="/chat" class="cta-button">
            채팅방으로 이동
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)

const login = () => {
  window.location.href = '/api/auth/kakao'
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section {
  text-align: center;
  max-width: 800px;
  padding: 2rem;
}

.hero-title {
  font-size: 3.5rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: white;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

.cta-section {
  margin-top: 2rem;
}

.cta-button {
  background: #fee500;
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(254, 229, 0, 0.3);
}

.cta-button:hover {
  background: #fdd835;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(254, 229, 0, 0.4);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
