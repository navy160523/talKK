import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(localStorage.getItem('accessToken') || null)
  const userId = ref(localStorage.getItem('userId') || null)

  const isLoggedIn = computed(() => !!accessToken.value)

  const setUser = (userData) => {
    user.value = userData
  }

  const setToken = (token) => {
    accessToken.value = token
    localStorage.setItem('accessToken', token)
  }

  const setUserId = (id) => {
    userId.value = id
    localStorage.setItem('userId', id)
  }

  const login = (token, id, userData) => {
    setToken(token)
    setUserId(id)
    setUser(userData)
  }

  const logout = () => {
    user.value = null
    accessToken.value = null
    userId.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
  }

  return {
    user,
    accessToken,
    userId,
    isLoggedIn,
    setUser,
    setToken,
    setUserId,
    login,
    logout
  }
})
