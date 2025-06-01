<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0 }"
    :hover="{ scale: 1.02 }"
    class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
  >
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <img
          v-motion
          :initial="{ scale: 0.8 }"
          :enter="{ scale: 1 }"
          :hover="{ scale: 1.1 }"
          :src="product.image"
          :alt="product.name"
          class="w-16 h-16 rounded-lg object-cover"
        >
      </div>
      <div class="flex-grow">
        <h3 class="font-semibold text-lg mb-1">{{ product.name }}</h3>
        <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
        <div class="flex items-center space-x-4 mt-4">
          <button
            @click="handleUpvote"
            class="flex items-center space-x-1 text-gray-600 hover:text-orange-500"
          >
            <span class="text-lg">↑</span>
            <span>{{ product.upvotes }}</span>
          </button>
          <button
            @click="handleComment"
            class="flex items-center space-x-1 text-gray-600 hover:text-orange-500"
          >
            <span class="text-lg">💬</span>
            <span>{{ product.comments?.length || 0 }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '../composables/useApi'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      name: 'Product Name',
      description: 'A brief description of the product goes here.',
      image: 'https://via.placeholder.com/60',
      upvotes: 0
    })
  }
})

const emit = defineEmits(['upvote', 'comment'])
const { put } = useApi()

const handleUpvote = async () => {
  try {
    const { data, error } = await put(`/api/products/${props.product._id}/upvote`)
    if (error.value) throw error.value
    emit('upvote', data.value)
  } catch (error) {
    console.error('Error upvoting product:', error)
  }
}

const handleComment = () => {
  emit('comment', props.product)
}
</script> 