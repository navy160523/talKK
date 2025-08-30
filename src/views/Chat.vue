<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>카카오톡 채팅</h2>
      <div class="user-info" v-if="user">
        <span class="username">{{ user.nickname || '사용자' }}</span>
        <img v-if="user.profile_image" :src="user.profile_image" :alt="user.nickname" class="profile-image">
      </div>
    </div>

    <div class="chat-content">
      <div class="chat-sidebar">
        <div class="chat-list">
          <h3>대화 목록</h3>
          <div class="chat-item" 
               v-for="chat in chatList" 
               :key="chat.id"
               :class="{ active: selectedChat?.id === chat.id }"
               @click="selectChat(chat)">
            <div class="chat-avatar">
              <span class="avatar-text">{{ chat.name?.charAt(0) || '?' }}</span>
            </div>
            <div class="chat-info">
              <div class="chat-name">{{ chat.name || '알 수 없음' }}</div>
              <div class="chat-preview">{{ chat.lastMessage || '대화가 없습니다' }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-main">
        <div v-if="selectedChat" class="chat-messages">
          <div class="messages-container" ref="messagesContainer">
            <div v-for="message in selectedChat.messages" 
                 :key="message.id" 
                 :class="['message', message.isMe ? 'message-mine' : 'message-other']">
              <div class="message-content">
                <div class="message-text">{{ message.text }}</div>
                <div class="message-time">{{ formatTime(message.timestamp) }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="no-chat-selected">
          <div class="no-chat-icon">💬</div>
          <h3>대화를 선택하세요</h3>
          <p>왼쪽에서 대화를 선택하여 메시지를 확인할 수 있습니다.</p>
        </div>
      </div>
    </div>

    <div class="loading-overlay" v-if="loading">
      <div class="loading-spinner"></div>
      <p>로딩 중...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const route = useRoute()
const authStore = useAuthStore()
const loading = ref(false)
const chatList = ref([])
const selectedChat = ref(null)
const messagesContainer = ref(null)

const user = ref(null)

onMounted(async () => {
  // URL 파라미터에서 토큰과 사용자 ID 확인
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')
  const userId = urlParams.get('userId')
  
  if (token && userId) {
    authStore.login(token, userId)
    await fetchUserInfo(token)
    await fetchChatList(token)
  } else if (authStore.accessToken) {
    await fetchUserInfo(authStore.accessToken)
    await fetchChatList(authStore.accessToken)
  }
})

const fetchUserInfo = async (token) => {
  try {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    user.value = response.data.properties
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error)
  }
}

const fetchChatList = async (token) => {
  loading.value = true
  try {
    // 실제 카카오톡 API는 대화 목록을 제공하지 않으므로 샘플 데이터 사용
    // 실제 구현시에는 다른 방법을 사용해야 합니다
    chatList.value = [
      {
        id: 1,
        name: '가족 그룹',
        lastMessage: '오늘 저녁 뭐 먹을까요?',
        messages: [
          { id: 1, text: '안녕하세요!', timestamp: new Date(Date.now() - 3600000), isMe: false },
          { id: 2, text: '오늘 날씨가 좋네요', timestamp: new Date(Date.now() - 1800000), isMe: true },
          { id: 3, text: '오늘 저녁 뭐 먹을까요?', timestamp: new Date(Date.now() - 600000), isMe: false }
        ]
      },
      {
        id: 2,
        name: '친구',
        lastMessage: '주말에 만나요!',
        messages: [
          { id: 4, text: '주말에 뭐해요?', timestamp: new Date(Date.now() - 7200000), isMe: true },
          { id: 5, text: '주말에 만나요!', timestamp: new Date(Date.now() - 3600000), isMe: false }
        ]
      }
    ]
  } catch (error) {
    console.error('채팅 목록 조회 실패:', error)
  } finally {
    loading.value = false
  }
}

const selectChat = (chat) => {
  selectedChat.value = chat
  nextTick(() => {
    scrollToBottom()
  })
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.chat-container {
  height: calc(100vh - 120px);
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.chat-header {
  background: #fee500;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6d800;
}

.chat-header h2 {
  margin: 0;
  color: #000;
  font-size: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.username {
  color: #000;
  font-weight: 500;
}

.profile-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #000;
}

.chat-content {
  display: flex;
  height: calc(100% - 70px);
}

.chat-sidebar {
  width: 300px;
  border-right: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.chat-list {
  padding: 1rem;
}

.chat-list h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 0.5rem;
}

.chat-item:hover {
  background: #e9ecef;
}

.chat-item.active {
  background: #fee500;
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.avatar-text {
  font-size: 1.1rem;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-preview {
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  margin-bottom: 0.5rem;
}

.message-mine {
  justify-content: flex-end;
}

.message-other {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 18px;
  position: relative;
}

.message-mine .message-content {
  background: #fee500;
  color: #000;
  border-bottom-right-radius: 4px;
}

.message-other .message-content {
  background: #f1f3f4;
  color: #333;
  border-bottom-left-radius: 4px;
}

.message-text {
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
  text-align: right;
}

.no-chat-selected {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  text-align: center;
}

.no-chat-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-chat-selected h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #fee500;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .chat-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .chat-content {
    flex-direction: column;
  }
}
</style>
