<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-2xl font-bold text-center mb-8">Connection Test</h1>
      
      <!-- Server Info -->
      <div class="mb-6 p-4 bg-blue-50 rounded">
        <h2 class="text-lg font-semibold mb-2">Server Information:</h2>
        <p>Frontend: http://localhost:3000</p>
        <p>Backend: http://localhost:5000</p>
        <p>Health Check: http://localhost:5000/health</p>
      </div>

      <!-- Test Buttons -->
      <div class="space-y-4">
        <button 
          @click="testBackendConnection" 
          class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Test Backend Connection
        </button>
      </div>

      <!-- Response Display -->
      <div v-if="response" class="mt-6">
        <h2 class="text-lg font-semibold mb-2">Response:</h2>
        <div class="bg-gray-50 p-4 rounded">
          <pre class="whitespace-pre-wrap">{{ JSON.stringify(response, null, 2) }}</pre>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="mt-6">
        <h2 class="text-lg font-semibold text-red-600 mb-2">Error:</h2>
        <div class="bg-red-50 p-4 rounded text-red-700">
          <p class="font-bold">Error Message:</p>
          <p>{{ error.message }}</p>
          <p class="font-bold mt-2">Error Details:</p>
          <pre class="whitespace-pre-wrap">{{ JSON.stringify(error.response?.data || error, null, 2) }}</pre>
        </div>
      </div>

      <!-- Connection Status -->
      <div class="mt-6 p-4 rounded" :class="connectionStatusClass">
        <p class="text-center font-medium">
          {{ connectionStatus }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { $axios } = useNuxtApp()
const response = ref(null)
const error = ref(null)
const connectionStatus = ref('Not tested')
const connectionStatusClass = ref('bg-gray-100')

const testBackendConnection = async () => {
  try {
    connectionStatus.value = 'Testing...'
    connectionStatusClass.value = 'bg-yellow-100'
    
    // Log the request URL
    console.log('Making request to:', $axios.defaults.baseURL + '/health')
    
    // Use the correct health check endpoint
    const result = await $axios.get('/health')
    response.value = result.data
    error.value = null
    connectionStatus.value = 'Connected Successfully!'
    connectionStatusClass.value = 'bg-green-100'
  } catch (err) {
    console.error('Connection error:', err)
    error.value = err
    response.value = null
    connectionStatus.value = 'Connection Failed'
    connectionStatusClass.value = 'bg-red-100'
  }
}
</script> 