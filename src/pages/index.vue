<template>
  <div>
    <TheHero />
    <main class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product._id"
          :product="product"
          @upvote="handleUpvote"
          @comment="handleComment"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { checkAuth } = useAuth()
const { get } = useApi()
const products = ref([])

// Check authentication on mount
onMounted(async () => {
  if (!checkAuth()) {
    router.push('/auth/login?redirect=/')
    return
  }
  
  try {
    const { data, error } = await get('/api/products')
    if (error.value) throw error.value
    products.value = data.value
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})

const handleUpvote = (updatedProduct) => {
  const index = products.value.findIndex(p => p._id === updatedProduct._id)
  if (index !== -1) {
    products.value[index] = updatedProduct
  }
}

const handleComment = (product) => {
  // Handle comment action
  console.log('Comment on product:', product.name)
}
</script> 