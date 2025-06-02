<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Filters and Search -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <select 
            v-model="sortBy"
            class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </select>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '~/components/ProductCard.vue'
import { useProduct } from '~/composables/useProduct'

const { isLoading, error, upvoteProduct, removeUpvote } = useProduct()

const searchQuery = ref('')
const sortBy = ref('newest')
const products = ref([])

// Fetch products from API
const fetchProducts = async () => {
  try {
    const { $axios } = useNuxtApp()
    const response = await $axios.get('/api/v1/products', {
      params: {
        sort: sortBy.value,
        search: searchQuery.value
      }
    })
    
    console.log('Products API Response:', response.data)
    products.value = response.data.data.products
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

// Watch for changes in search and sort
watch([searchQuery, sortBy], () => {
  fetchProducts()
})

// Fetch products on mount
onMounted(() => {
  fetchProducts()
})
</script> 