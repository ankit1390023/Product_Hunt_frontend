<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
    <img 
      :src="product.images?.[0] || '/placeholder.png'" 
      :alt="product.name" 
      class="w-full h-48 object-cover"
      @error="handleImageError" 
    />
    <div class="p-6">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-orange-500 font-medium">{{ product.category || 'Uncategorized' }}</span>
        <span class="text-sm text-gray-500">{{ formatDate(product.createdAt) }}</span>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{{ product.name }}</h3>
      <p class="text-gray-600 mb-4 line-clamp-2">{{ product.tagline }}</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img 
            :src="getAvatarUrl(product.maker?.avatar)" 
            :alt="product.maker?.name || 'Anonymous'" 
            class="w-8 h-8 rounded-full"
            @error="handleAvatarError"
          />
          <span class="text-sm text-gray-600">{{ product.maker?.name || 'Anonymous' }}</span>
        </div>
        <button 
          class="flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-200" 
          @click="handleUpvote"
          :class="{ 'text-orange-600': product.hasUpvoted }"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span class="text-sm ml-1">{{ product.upvotes || 0 }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDistanceToNow } from 'date-fns'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value === 'object' && 'name' in value
    }
  }
})

const emit = defineEmits(['upvote'])

const formatDate = (date) => {
  if (!date) return ''
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

const handleUpvote = () => {
  emit('upvote', props.product)
}

const handleImageError = (e) => {
  e.target.src = '/placeholder.png'
}

const handleAvatarError = (e) => {
  console.log('Avatar load error for:', props.product.maker?.name)
  console.log('Attempted avatar URL:', props.product.maker?.avatar)
  e.target.src = '/default-avatar.png'
}

const getAvatarUrl = (avatar) => {
  console.log('Processing avatar URL:', avatar)
  if (!avatar) {
    console.log('No avatar URL provided, using default')
    return '/default-avatar.png'
  }
  
  if (avatar.startsWith('http')) {
    return avatar
  }
  
  return `${import.meta.env.VITE_API_URL || ''}${avatar}`
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 