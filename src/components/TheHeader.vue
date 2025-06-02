<template>
  <header
    v-motion
    :initial="{ y: -100 }"
    :enter="{ y: 0 }"
    class="bg-white shadow-sm sticky top-0 z-50"
  >
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center space-x-4">
          <NuxtLink
            v-motion
            :hover="{ scale: 1.05 }"
            to="/"
            class="text-2xl font-bold text-orange-500"
          >
            ProductHunt
          </NuxtLink>
          
        </div>

        <!-- Center Navigation -->
        <div class="hidden md:flex items-center justify-center flex-1 px-8">
          <div class="flex space-x-8">
            <NuxtLink
              v-for="(link, index) in links"
              :key="link.text"
              v-motion
              :initial="{ opacity: 0, y: -20 }"
              :enter="{ opacity: 1, y: 0 }"
              :delay="index * 100"
              :hover="{ scale: 1.05 }"
              :to="link.href"
              class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200"
              :class="{ 'text-orange-500': $route.path === link.href }"
            >
              {{ link.text }}
            </NuxtLink>
          </div>
        </div>

        <!-- Auth Buttons / User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Show these buttons when user is not logged in -->
          <template v-if="!isAuthenticated">
            <NuxtLink
              v-motion
              :hover="{ scale: 1.05 }"
              :tap="{ scale: 0.95 }"
              to="/auth/login"
              class="px-4 py-2 text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200"
            >
              Login
            </NuxtLink>
            <NuxtLink
              v-motion
              :hover="{ scale: 1.05 }"
              :tap="{ scale: 0.95 }"
              to="/auth/register"
              class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
            >
              Sign Up
            </NuxtLink>
          </template>

          <!-- Show user menu when logged in -->
          <div v-else class="relative group">
            <button
              v-motion
              :hover="{ scale: 1.05 }"
              :tap="{ scale: 0.95 }"
              class="flex items-center space-x-3 text-gray-600 hover:text-orange-500 transition-colors duration-200 pr-2"
              @click="toggleUserMenu"
            >
            <div v-if="isAuthenticated" class="hidden md:block">
            <p class="text-gray-600">
              Welcome back, <span class="font-medium text-orange-500">{{ user.username }}</span>!
            </p>
          </div>
              <div class="relative">
                <img
                  :src="user.avatar"
                  alt="User avatar"
                  class="h-10 w-10 rounded-full border-2 border-orange-500 object-cover"
                  @error="handleAvatarError"
                />
                <div v-if="showFallbackIcon" class="absolute -right-1 -bottom-1 bg-orange-50 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </button>

            <!-- Dropdown menu -->
            <div
              v-show="showUserMenu"
              class="absolute right-0 mt-3 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden transform origin-top-right z-50"
            >
              <!-- User Info Section -->
              <div class="p-4 bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
                <div class="flex items-center space-x-3">
                  <img
                    :src="user.avatar"
                    alt="User avatar"
                    class="h-12 w-12 rounded-full border-2 border-orange-500 object-cover"
                    @error="handleAvatarError"
                  />
                  <div>
                    <p class="font-semibold text-gray-900">{{ user.username }}</p>
                    <p class="text-sm text-gray-600 capitalize">{{ user.role }}</p>
                  </div>
                </div>
              </div>

              <!-- Menu Items -->
              <div class="py-2">
                <NuxtLink
                  to="/profile"
                  class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200"
                  @click="showUserMenu = false"
                >
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Your Profile
                </NuxtLink>

                <NuxtLink
                  to="/settings"
                  class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200"
                  @click="showUserMenu = false"
                >
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </NuxtLink>

                <div class="border-t border-gray-100 my-1"></div>

                <button
                  @click="handleLogout"
                  class="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <svg class="w-5 h-5 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 rounded-lg hover:bg-gray-100"
            @click="toggleMobileMenu"
          >
            <svg
              class="h-6 w-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!showMobileMenu"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="showMobileMenu"
        class="md:hidden mt-4 py-4 border-t border-gray-100"
      >
        <div class="flex flex-col space-y-4">
          <NuxtLink
            v-for="link in links"
            :key="link.text"
            :to="link.href"
            class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200"
            :class="{ 'text-orange-500': $route.path === link.href }"
            @click="showMobileMenu = false"
          >
            {{ link.text }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const config = useRuntimeConfig()
const isDev = ref(config.public.isDev || false)
const userStore = useUserStore()

// Replace the existing user state with computed properties from the store
const user = computed(() => userStore.user)
const isAuthenticated = computed(() => userStore.isAuthenticated)
const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const showFallbackIcon = ref(false)

const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXVzZXIiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4='

const links = [
  { text: 'Home', href: '/' },
  { text: 'Products', href: '/products' },
  { text: 'Submit', href: '/submit' },
  { text: 'About', href: '/about' }
]

// Toggle user menu
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) {
    showMobileMenu.value = false
  }
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    showUserMenu.value = false
  }
}

// Update the checkAuthStatus function
const checkAuthStatus = async () => {
  if (process.client) {
    const token = localStorage.getItem('token')
    if (token && !userStore.isAuthenticated) {
      try {
        const { $axios } = useNuxtApp()
        const response = await $axios.get('/api/v1/users/me')
        userStore.setUser(response.data.data)
      } catch (error) {
        // If there's an error, clear the token and user data
        localStorage.removeItem('token')
        userStore.clearUser()
      }
    }
  }
}

// Handle avatar error
const handleAvatarError = (event) => {
  event.target.src = defaultAvatar
  showFallbackIcon.value = true
}

// Update the handleLogout function
const handleLogout = () => {
  if (process.client) {
    localStorage.removeItem('token')
    userStore.clearUser()
    router.push('/auth/login')
  }
}

// Handle click outside
const handleClickOutside = (event) => {
  const userMenu = document.querySelector('.user-menu')
  const mobileMenu = document.querySelector('.mobile-menu')
  
  if (showUserMenu.value && userMenu && !userMenu.contains(event.target)) {
    showUserMenu.value = false
  }
  if (showMobileMenu.value && mobileMenu && !mobileMenu.contains(event.target)) {
    showMobileMenu.value = false
  }
}

// Call checkAuthStatus when the component is mounted
onMounted(() => {
  checkAuthStatus()
  if (process.client) {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script> 