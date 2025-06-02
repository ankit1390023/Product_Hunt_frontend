<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
      
      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Category Card -->
        <div 
          v-for="category in categories" 
          :key="category._id" 
          class="bg-white rounded-xl border border-gray-200 p-6 hover:border-orange-200 transition-all duration-200"
        >
          <div class="flex items-start gap-4">
            <div class="text-3xl">{{ category.icon }}</div>
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ category.name }}</h2>
              <p class="text-gray-600 mb-4">{{ category.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ category.productCount || 0 }} products</span>
                <NuxtLink 
                  :to="`/products?category=${category._id}`"
                  class="text-orange-500 hover:text-orange-600 font-medium"
                >
                  View Products
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCategory } from '~/composables/useCategory'

const { categories, fetchCategories } = useCategory()

onMounted(() => {
  fetchCategories()
})
</script> 