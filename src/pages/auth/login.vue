<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
    <!-- Left Side - Branding -->
    <div class="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 bg-gradient-to-br from-orange-500 to-orange-600">
      <div class="max-w-md mx-auto">
        <h1 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          class="text-6xl font-extrabold text-white tracking-tight"
        >
          ProductHunt
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
          class="mt-6 text-xl text-orange-100"
        >
          Discover the best new products in tech
        </p>
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
          class="mt-12"
        >
          <h2 class="text-3xl font-bold text-white">
            Join our community
          </h2>
          <p class="mt-4 text-lg text-orange-100">
            Connect with makers, share your products, and be part of the next big thing in tech.
          </p>
        </div>

        <!-- Features List -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
          class="mt-12 space-y-6"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-orange-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p class="ml-3 text-base text-orange-100">
              Launch your product to thousands of early adopters
            </p>
          </div>
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-orange-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p class="ml-3 text-base text-orange-100">
              Get valuable feedback from the community
            </p>
          </div>
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-orange-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p class="ml-3 text-base text-orange-100">
              Connect with other makers and innovators
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 800 } }"
          class="mt-12 grid grid-cols-3 gap-4"
        >
          <div class="text-center">
            <p class="text-3xl font-bold text-white">2M+</p>
            <p class="text-sm text-orange-100">Monthly Visitors</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-white">50K+</p>
            <p class="text-sm text-orange-100">Products Launched</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-white">100K+</p>
            <p class="text-sm text-orange-100">Active Makers</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <!-- Mobile Logo -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          class="lg:hidden text-center"
        >
          <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 tracking-tight">
            ProductHunt
          </h1>
          <p class="mt-2 text-sm text-gray-500">Discover the best new products in tech</p>
        </div>

        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
          class="mt-8"
        >
          <h2 class="text-2xl font-bold text-gray-900 text-center">
            Welcome back
          </h2>
          <p class="mt-2 text-sm text-gray-600 text-center">
            Don't have an account?
            <NuxtLink to="/auth/register" class="font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200">
              Register
            </NuxtLink>
          </p>
        </div>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
          class="bg-white py-8 px-6 rounded-2xl sm:px-10 border border-gray-100"
        >
          <form class="space-y-6" @submit.prevent="handleLogin">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  placeholder="Enter your email address"
                  class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.email }"
                />
                <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
              </div>
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  placeholder="Enter your password"
                  class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.password }"
                />
                <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
              </div>
            </div>

            <!-- Role Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <div class="flex space-x-6">
                <div class="flex items-center">
                  <input
                    id="role-user"
                    v-model="form.role"
                    name="role"
                    type="radio"
                    value="user"
                    class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 transition-colors duration-200"
                  />
                  <label for="role-user" class="ml-2 block text-sm text-gray-700">
                    User
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="role-admin"
                    v-model="form.role"
                    name="role"
                    type="radio"
                    value="admin"
                    class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 transition-colors duration-200"
                  />
                  <label for="role-admin" class="ml-2 block text-sm text-gray-700">
                    Admin
                  </label>
                </div>
              </div>
              <p v-if="errors.role" class="mt-2 text-sm text-red-600">{{ errors.role }}</p>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="form.rememberMe"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded transition-colors duration-200"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200">
                  Forgot your password?
                </a>
              </div>
            </div>

            <!-- Submit Button -->
            <div>
              <p v-if="successMessage" class="mb-4 text-sm text-green-600 text-center">{{ successMessage }}</p>
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading">Signing in...</span>
                <span v-else>Sign in</span>
              </button>
            </div>
          </form>

          <!-- Social Sign In -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
            class="mt-8"
          >
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                class="w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
              >
                <span class="sr-only">Sign in with Google</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
              </button>

              <button
                type="button"
                class="w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
              >
                <span class="sr-only">Sign in with GitHub</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { $axios } = useNuxtApp()

const form = ref({
  email: '',
  password: '',
  rememberMe: false,
  role: 'user' // Default role
})

const errors = ref({})
const loading = ref(false)
const successMessage = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    errors.value = {}
    successMessage.value = ''

    const response = await $axios.post('/api/v1/auth/login', {
      email: form.value.email,
      password: form.value.password
    })

    // Store the token and user data
    localStorage.setItem('token', response.data.data.accessToken)
    localStorage.setItem('user', JSON.stringify(response.data.data.user))
    
    // Show success message
    successMessage.value = 'Login successful! Redirecting...'
    
    // Wait for 1 second to show the success message
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to home page
    router.push('/')
  } catch (error) {
    if (error.response?.data?.message) {
      errors.value = {
        general: error.response.data.message
      }
    } else if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      errors.value = {
        general: 'An error occurred during login. Please try again.'
      }
    }
  } finally {
    loading.value = false
  }
}
</script> 