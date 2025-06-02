<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
    <div class="text-center px-4">
      <h1 class="text-6xl font-bold text-orange-600 mb-4">
        {{ error.statusCode === 404 ? '404' : 'Oops!' }}
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
      </p>
      <NuxtLink
        to="/"
        class="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
      >
        <span>Go Home</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object
})
</script> 