<template>
  <section class="relative bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-[85vh] flex items-center overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
        class="max-w-4xl mx-auto text-center"
      >
        <h1
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 700,
              ease: 'easeOut',
              delay: 200
            }
          }"
          class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
        >
          Discover the Best New
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
            Products
          </span>
        </h1>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 700,
              ease: 'easeOut',
              delay: 400
            }
          }"
          class="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of makers and enthusiasts to discover and share the latest products, tools, and services that are shaping the future.
        </p>
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 700,
              ease: 'easeOut',
              delay: 600
            }
          }"
          class="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <NuxtLink
            to="/products"
            v-motion
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
            :tap="{ scale: 0.95, transition: { duration: 100 } }"
            class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Browse Products</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="/submit"
            v-motion
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
            :tap="{ scale: 0.95, transition: { duration: 100 } }"
            class="w-full sm:w-auto px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-500 flex items-center justify-center gap-2"
          >
            <span>Submit Product</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Stats Section -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 700,
              ease: 'easeOut',
              delay: 800
            }
          }"
          class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600 mb-2">10K+</div>
            <div class="text-gray-600">Products</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600 mb-2">5K+</div>
            <div class="text-gray-600">Makers</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600 mb-2">50K+</div>
            <div class="text-gray-600">Upvotes</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600 mb-2">100+</div>
            <div class="text-gray-600">Categories</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No imports needed for @vueuse/motion
</script>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
</style> 