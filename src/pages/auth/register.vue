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

    <!-- Right Side - Registration Form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center">
          <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 tracking-tight">
            ProductHunt
          </h1>
          <p class="mt-2 text-sm text-gray-500">Discover the best new products in tech</p>
        </div>

        <div class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 text-center">
            Create your account
          </h2>
          <p class="mt-2 text-sm text-gray-600 text-center">
            Already have an account?
            <NuxtLink to="/auth/login" class="font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200">
              Login
            </NuxtLink>
          </p>
        </div>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-6 rounded-2xl sm:px-10 border border-gray-100">
          <form class="space-y-6" @submit.prevent="handleRegister">
            <!-- Username -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div class="mt-1">
                <input
                  id="username"
                  v-model="form.username"
                  name="username"
                  type="text"
                  autocomplete="username"
                  required
                  placeholder="Choose a username"
                  class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.username }"
                />
                <p v-if="errors.username" class="mt-2 text-sm text-red-600">{{ errors.username }}</p>
              </div>
            </div>

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
                  class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 sm:text-sm"
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
                  autocomplete="new-password"
                  required
                  placeholder="Create a password (min. 8 characters)"
                  class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.password }"
                />
                <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div class="mt-1">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autocomplete="new-password"
                  required
                  placeholder="Confirm your password"
                  class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.confirmPassword }"
                />
                <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-600">{{ errors.confirmPassword }}</p>
              </div>
            </div>

            <!-- Avatar Upload -->
            <div>
              <label for="avatar" class="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture (Optional)
              </label>
              <div class="mt-1">
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  @change="handleAvatarChange"
                  class="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-orange-50 file:text-orange-700
                    hover:file:bg-orange-100
                    cursor-pointer"
                />
                <p class="mt-1 text-sm text-gray-500">
                  JPG, PNG or GIF (max. 2MB)
                </p>
                <p v-if="avatarError" class="mt-2 text-sm text-red-600">
                  {{ avatarError }}
                </p>
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-center">
              <input
                id="terms"
                v-model="form.acceptTerms"
                name="terms"
                type="checkbox"
                required
                class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded transition-colors duration-200"
                :class="{ 'border-red-500': errors.acceptTerms }"
              />
              <label for="terms" class="ml-2 block text-sm text-gray-700">
                I agree to the
                <a href="#" class="font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200">Terms and Conditions</a>
              </label>
            </div>
            <p v-if="errors.acceptTerms" class="mt-2 text-sm text-red-600">{{ errors.acceptTerms }}</p>

            <!-- Success Message -->
            <div v-if="successMessage" class="rounded-md bg-green-50 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
                </div>
              </div>
            </div>

            <!-- General Error Message -->
            <div v-if="errors.general" class="rounded-md bg-red-50 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-red-800">{{ errors.general }}</p>
                </div>
              </div>
            </div>

            <!-- Debug Information (only in development) -->
            <div v-if="isDev" class="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 class="text-sm font-medium text-gray-700 mb-2">Debug Information:</h3>
              <pre class="text-xs text-gray-600">{{ JSON.stringify({
                username: form.value.username,
                email: form.value.email,
                hasAvatar: !!form.value.avatar,
                hasPassword: !!form.value.password,
                hasConfirmPassword: !!form.value.confirmPassword,
                acceptTerms: form.value.acceptTerms
              }, null, 2) }}</pre>
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading">Creating account...</span>
                <span v-else>Create account</span>
              </button>
            </div>
          </form>

          <!-- Social Sign Up -->
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
                <span class="sr-only">Sign up with Google</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
              </button>

              <button
                type="button"
                class="w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
              >
                <span class="sr-only">Sign up with GitHub</span>
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
const config = useRuntimeConfig()
const isDev = ref(config.public.isDev || false)

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  avatar: null
})

const errors = ref({})
const loading = ref(false)
const successMessage = ref('')
const avatarError = ref('')

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!validTypes.includes(file.type)) {
    avatarError.value = 'Please upload a valid image file (JPEG, PNG, or GIF)'
    return
  }

  // Validate file size (max 2MB)
  const maxSize = 2 * 1024 * 1024 // 2MB
  if (file.size > maxSize) {
    avatarError.value = 'Image size should be less than 2MB'
    return
  }

  // Clear any previous errors
  avatarError.value = ''
  
  // Store the file
  form.value.avatar = file
}

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.username) {
    errors.value.username = 'Username is required'
    return false
  }

  if (!form.value.email) {
    errors.value.email = 'Email is required'
    return false
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required'
    return false
  }
  
  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
    return false
  }
  
  if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters long'
    return false
  }
  
  if (!form.value.acceptTerms) {
    errors.value.acceptTerms = 'You must accept the terms and conditions'
    return false
  }
  
  return true
}

const handleRegister = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    errors.value = {}
    successMessage.value = ''

    // Create FormData object
    const formData = new FormData()
    
    // Append all form fields
    formData.append('username', form.value.username.trim())
    formData.append('email', form.value.email.trim())
    formData.append('password', form.value.password)
    
    // Append avatar if exists
    if (form.value.avatar) {
      formData.append('avatar', form.value.avatar)
    }

    // Debug: Log the FormData contents
    console.log('Frontend - Form Data Contents:')
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + (pair[0] === 'password' ? '******' : pair[1]))
    }

    // Make the API request
    const response = await $axios.post('/api/v1/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log('Frontend - Registration response:', response.data)

    // Store the token
    localStorage.setItem('token', response.data.data.accessToken)
    
    // Show success message
    successMessage.value = 'Registration successful! Redirecting...'
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (error) {
    console.error('Frontend - Registration error:', error.response?.data || error)
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      errors.value = {
        general: 'An error occurred during registration. Please try again.'
      }
    }
  } finally {
    loading.value = false
  }
}
</script> 