<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
        
        <div class="space-y-6">
          <div class="flex items-center space-x-4">
            <div class="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-gray-900">User Profile</h2>
              <p class="text-gray-600">user@example.com</p>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Hello World!</h3>
            <p class="text-gray-600">
              Welcome to your profile page. This is where you can manage your account settings and view your information.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { checkAuth } = useAuth()

// Check authentication on mount
onMounted(() => {
  if (!checkAuth()) {
    router.push('/auth/login?redirect=/profile')
    return
  }
})
</script> 