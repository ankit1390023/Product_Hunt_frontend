<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Filters and Search -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <select 
            v-model="selectedCategory"
            class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category._id" :value="category._id">
              {{ category.name }}
            </option>
          </select>
          <select class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="">Sort By</option>
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      <!-- Featured Products -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Product Card 1 -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <img src="https://picsum.photos/400/200" alt="Product" class="w-full h-48 object-cover" />
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-orange-500 font-medium">AI & ML</span>
                <span class="text-sm text-gray-500">2 days ago</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">AI Content Generator</h3>
              <p class="text-gray-600 mb-4">Create high-quality content in seconds with our advanced AI technology.</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <img src="https://picsum.photos/32/32" alt="Maker" class="w-8 h-8 rounded-full" />
                  <span class="text-sm text-gray-600">John Doe</span>
                </div>
                <button class="text-orange-500 hover:text-orange-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Product Card 2 -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <img src="https://picsum.photos/400/201" alt="Product" class="w-full h-48 object-cover" />
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-orange-500 font-medium">Productivity</span>
                <span class="text-sm text-gray-500">1 week ago</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Task Management Pro</h3>
              <p class="text-gray-600 mb-4">Streamline your workflow with our powerful task management solution.</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <img src="https://picsum.photos/32/33" alt="Maker" class="w-8 h-8 rounded-full" />
                  <span class="text-sm text-gray-600">Jane Smith</span>
                </div>
                <button class="text-orange-500 hover:text-orange-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Product Card 3 -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <img src="https://picsum.photos/400/202" alt="Product" class="w-full h-48 object-cover" />
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-orange-500 font-medium">Design Tools</span>
                <span class="text-sm text-gray-500">3 days ago</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Design Studio Pro</h3>
              <p class="text-gray-600 mb-4">Create stunning designs with our professional design toolkit.</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <img src="https://picsum.photos/32/34" alt="Maker" class="w-8 h-8 rounded-full" />
                  <span class="text-sm text-gray-600">Mike Johnson</span>
                </div>
                <button class="text-orange-500 hover:text-orange-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trending Products -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Trending Now</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Trending Product Cards (Similar structure as above) -->
          <!-- Add more product cards here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCategory } from '~/composables/useCategory'

const { categories, fetchCategories } = useCategory()
const selectedCategory = ref('')

onMounted(() => {
  fetchCategories()
})
</script> 