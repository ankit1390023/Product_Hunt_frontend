<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Filters and Search -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Search -->
          <div class="flex-1 min-w-[200px]">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <!-- Category Filter -->
          <div class="min-w-[200px]">
            <select 
              v-model="selectedCategory"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Sort Options -->
          <div class="min-w-[200px]">
            <select 
              v-model="sortBy"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="newest">Latest</option>
              <option value="trending">Trending</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- No Results -->
      <div v-else-if="products.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">No products found matching your criteria</p>
      </div>

      <!-- Products Grid -->
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in products"
            :key="product._id"
            :product="product"
            @upvote="handleUpvote"
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-8 flex justify-center">
          <div class="flex items-center gap-2">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span class="px-3 py-1">{{ currentPage }} of {{ totalPages }}</span>
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ProductCard from '~/components/ProductCard.vue'
import { useProduct } from '~/composables/useProduct'

const { isLoading, error, upvoteProduct, removeUpvote } = useProduct()

// State
const searchQuery = ref('')
const sortBy = ref('newest')
const selectedCategory = ref('')
const currentPage = ref(1)
const products = ref([])
const totalPages = ref(1)
const categories = ref([
  // Primary Categories (Required)
  'AI',
  'SaaS',
  'DevTools',
  
  // Additional Categories
  'Design',
  'Productivity'
])

// Fetch products from API
const fetchProducts = async () => {
  try {
    const { $axios } = useNuxtApp()
    const response = await $axios.get('/api/v1/products', {
      params: {
        sort: sortBy.value,
        search: searchQuery.value,
        category: selectedCategory.value,
        page: currentPage.value,
        limit: 12
      }
    })
    
    console.log('Products API Response:', response.data)
    products.value = response.data.data.products
    totalPages.value = response.data.data.pagination.pages
  } catch (err) {
    console.error('Error fetching products:', err)
  }
}

// Handle upvote
const handleUpvote = async (product) => {
  try {
    if (product.hasUpvoted) {
      await removeUpvote(product._id)
    } else {
      await upvoteProduct(product._id)
    }
    // Refresh products after upvote
    await fetchProducts()
  } catch (err) {
    console.error('Error handling upvote:', err)
  }
}

// Watch for changes in filters and pagination
watch([searchQuery, sortBy, selectedCategory, currentPage], () => {
  currentPage.value = 1 // Reset to first page when filters change
  fetchProducts()
})

// Fetch products on mount
onMounted(() => {
  fetchProducts()
})
</script> 