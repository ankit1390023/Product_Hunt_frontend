<template>
  <div 
    class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
  >
    <!-- Product Image Carousel -->
    <div class="relative group">
      <div class="relative h-48 overflow-hidden">
        <transition-group name="fade" tag="div" class="h-full">
          <img 
            v-for="(image, index) in product.images" 
            :key="image"
            v-show="currentImageIndex === index"
            :src="image" 
            :alt="product.name" 
            class="absolute w-full h-full object-cover transition-opacity duration-500"
            @error="handleImageError"
          />
        </transition-group>
      </div>

      <!-- Category Badge -->
      <div class="absolute top-4 left-4 z-10">
        <span class="px-3 py-1 text-xs font-medium text-white bg-orange-500 rounded-full">
          {{ product.category || 'Uncategorized' }}
        </span>
      </div>

      <!-- Navigation Arrows -->
      <div class="absolute inset-y-0 left-0 flex items-center">
        <button 
          @click="prevImage" 
          class="p-2 text-white bg-black/30 hover:bg-black/50 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center">
        <button 
          @click="nextImage" 
          class="p-2 text-white bg-black/30 hover:bg-black/50 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Image Indicators -->
      <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        <button 
          v-for="(_, index) in product.images" 
          :key="index"
          @click="currentImageIndex = index"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'"
        />
      </div>
    </div>

    <div class="p-6">
      <!-- Product Name and Logo -->
      <div class="flex items-center gap-4 mb-3">
        <div class="relative">
          <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-100 bg-white shadow-sm">
            <img 
              :src="product.logo || '/placeholder.png'" 
              :alt="product.name" 
              class="w-full h-full object-contain p-1"
              @error="handleLogoError"
            />
          </div>
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-gray-900 line-clamp-1">{{ product.name }}</h3>
          <span class="text-sm text-gray-500">{{ formatDate(product.createdAt) }}</span>
        </div>
      </div>
      
      <p class="text-gray-600 mb-4 line-clamp-2">{{ product.tagline }}</p>
      
      <div class="flex items-center justify-between pt-3 border-t border-gray-100">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
            <img 
              :src="getUserAvatar(product.submittedBy?._id)" 
              :alt="product.submittedBy?.username || 'Anonymous'" 
              class="w-full h-full object-cover"
              @error="handleAvatarError"
            />
          </div>
          <span class="text-sm text-gray-600">by {{ product.submittedBy?.username || 'Anonymous' }}</span>
        </div>
        <div class="flex items-center gap-2">
          <button 
            class="flex items-center gap-1 px-3 py-1.5 text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all duration-200" 
            @click.stop="handleUpvote"
            :class="{ 'text-orange-600 bg-orange-50': product.hasUpvoted }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span class="text-sm font-medium">{{ product.upvoteCount || 0 }}</span>
          </button>
          <NuxtLink
            :to="`/product/${product._id}`"
            class="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all duration-200"
          >
            <span class="text-sm font-medium">View Details</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import { useUserStore } from '~/stores/user'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value === 'object' && 'name' in value && '_id' in value
    }
  }
})

const emit = defineEmits(['upvote'])
const currentImageIndex = ref(0)
let rotationInterval = null

const userStore = useUserStore()

const nextImage = () => {
  if (!props.product.images?.length) return
  currentImageIndex.value = (currentImageIndex.value + 1) % props.product.images.length
}

const prevImage = () => {
  if (!props.product.images?.length) return
  currentImageIndex.value = (currentImageIndex.value - 1 + props.product.images.length) % props.product.images.length
}

const startRotation = () => {
  if (props.product.images?.length > 1) {
    rotationInterval = setInterval(nextImage, 5000) // Change image every 5 seconds
  }
}

const stopRotation = () => {
  if (rotationInterval) {
    clearInterval(rotationInterval)
  }
}

onMounted(() => {
  startRotation()
})

onUnmounted(() => {
  stopRotation()
})

const formatDate = (date) => {
  if (!date) return ''
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

const handleUpvote = (event) => {
  event.stopPropagation()
  emit('upvote', props.product)
}

const handleImageError = (e) => {
  e.target.src = '/placeholder.png'
}

const handleLogoError = (e) => {
  e.target.src = '/placeholder.png'
}

const getUserAvatar = (userId) => {
  if (!userId) return '/default-avatar.png'
  
  // If the current user is the submitter, use their avatar
  if (userStore.user?._id === userId) {
    return userStore.user.avatar || '/default-avatar.png'
  }
  
  // For other users, you might want to fetch their avatar from an API
  // For now, return default avatar
  return '/default-avatar.png'
}

const handleAvatarError = (e) => {
  console.log('Avatar load error for:', props.product.submittedBy?.username)
  e.target.src = '/default-avatar.png'
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 