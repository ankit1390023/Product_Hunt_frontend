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
        <div class="flex-shrink-0">
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
          <template v-if="!isLoggedIn">
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
            >
              <div class="text-right">
                <p class="font-medium text-gray-900">Welcome, {{ userName }}</p>
              </div>
              <img
                :src="userAvatar || '/default-avatar.png'"
                alt="User avatar"
                class="h-12 w-12 rounded-full border-2 border-orange-500 object-cover"
              />
            </button>

            <!-- Dropdown menu -->
            <div
              class="absolute right-0 mt-3 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform origin-top-right"
            >
              <!-- User Info Section -->
              <div class="p-4 bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
                <div class="flex items-center space-x-3">
                  <img
                    :src="userAvatar || '/default-avatar.png'"
                    alt="User avatar"
                    class="h-12 w-12 rounded-full border-2 border-orange-500 object-cover"
                  />
                  <div>
                    <p class="font-semibold text-gray-900">{{ userName }}</p>
                    <p class="text-sm text-gray-600 capitalize">{{ userRole }}</p>
                  </div>
                </div>
              </div>

              <!-- Menu Items -->
              <div class="py-2">
                <NuxtLink
                  to="/profile"
                  class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200"
                >
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Your Profile
                </NuxtLink>

                <NuxtLink
                  to="/settings"
                  class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200"
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const config = useRuntimeConfig()
const isDev = ref(config.public.isDev || false)
const isLoggedIn = ref(false)
const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const userName = ref('')
const userAvatar = ref('')
const userRole = ref('')

const links = [
  { text: 'Home', href: '/' },
  { text: 'Products', href: '/products' },
  { text: 'Categories', href: '/categories' },
  { text: 'About', href: '/about' }
]

// Check if user is logged in
const checkAuthStatus = () => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (token) {
    isLoggedIn.value = true
    userName.value = user.username || 'User'
    userAvatar.value = user.avatar || null
    userRole.value = user.role || 'user'
  } else {
    isLoggedIn.value = false
    userName.value = ''
    userAvatar.value = null
    userRole.value = ''
  }
}

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

// Handle logout
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isLoggedIn.value = false
  showUserMenu.value = false
  showMobileMenu.value = false
  router.push('/auth/login')
}

// Close menus when clicking outside
const handleClickOutside = (event) => {
  if (showUserMenu.value && !event.target.closest('.user-menu')) {
    showUserMenu.value = false
  }
  if (showMobileMenu.value && !event.target.closest('.mobile-menu')) {
    showMobileMenu.value = false
  }
}

onMounted(() => {
  checkAuthStatus()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 