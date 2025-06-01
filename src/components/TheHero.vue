<template>
  <section class="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
    <div class="container mx-auto px-4">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
        class="max-w-3xl mx-auto text-center"
      >
        <h2
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 500,
              ease: 'easeOut',
              delay: 200
            }
          }"
          class="text-4xl font-bold text-gray-900 mb-4"
        >
          Discover the best new products
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 500,
              ease: 'easeOut',
              delay: 400
            }
          }"
          class="text-xl text-gray-600 mb-8"
        >
          Join thousands of makers and enthusiasts to discover and share the latest products, tools, and services.
        </p>
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 500,
              ease: 'easeOut',
              delay: 600
            }
          }"
          class="flex justify-center space-x-4"
        >
          <button
            v-motion
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
            :tap="{ scale: 0.95, transition: { duration: 100 } }"
            class="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Browse Products
          </button>
          <button
            v-motion
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
            :tap="{ scale: 0.95, transition: { duration: 100 } }"
            class="px-6 py-3 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50"
          >
            Submit Product
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No imports needed for @vueuse/motion
</script> 