<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Error Message -->
      <div v-if="error" class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
        <div class="flex items-center gap-2 text-red-600">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="font-medium">{{ error }}</p>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="success" class="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
        <div class="flex items-center gap-2 text-green-600">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <p class="font-medium">Product submitted successfully! Redirecting...</p>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div v-if="isUploading" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <div class="flex items-center gap-3">
            <svg class="animate-spin h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <p class="text-gray-900 font-medium">Uploading files...</p>
          </div>
        </div>
      </div>

      <!-- Header -->
      <div class="text-center mb-12 space-y-4">
        <h1 class="text-5xl font-extrabold text-gray-900 tracking-tight">Submit Your Product</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">Share your innovation with our community of makers and early adopters. Make your product stand out.</p>
      </div>

      <!-- Main Form -->
      <div class="bg-white rounded-2xl overflow-hidden ring-1 ring-gray-200/50">
        <form @submit.prevent="handleSubmit" class="divide-y divide-gray-100">
          <!-- Product Name -->
          <div class="p-8 bg-white">
            <label for="name" class="block text-base font-semibold text-gray-900 mb-2">
              Product Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="w-full rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 px-5 py-3.5 text-gray-900 placeholder-gray-400 text-base transition-all duration-200 outline-none"
              placeholder="What's your product called?"
              required
            />
          </div>

          <!-- Tagline -->
          <div class="p-8 bg-white">
            <label for="tagline" class="block text-base font-semibold text-gray-900 mb-2">
              Tagline <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="tagline"
              v-model="form.tagline"
              class="w-full rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 px-5 py-3.5 text-gray-900 placeholder-gray-400 text-base transition-all duration-200 outline-none"
              placeholder="A one-line description of your product"
              required
            />
          </div>

          <!-- Description -->
          <div class="p-8 bg-white">
            <label for="description" class="block text-base font-semibold text-gray-900 mb-2">
              Description <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="w-full rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 px-5 py-3.5 text-gray-900 placeholder-gray-400 text-base transition-all duration-200 outline-none"
                placeholder="Tell us about your product. What makes it special?"
                required
              ></textarea>
              <div class="absolute bottom-3 right-3 text-sm text-gray-400 font-medium">
                {{ form.description.length }}/500
              </div>
            </div>
          </div>

          <!-- Website URL -->
          <div class="p-8 bg-white">
            <label for="website" class="block text-base font-semibold text-gray-900 mb-2">
              Website URL <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="url"
                id="website"
                v-model="form.website"
                class="w-full rounded-xl border border-gray-200 pl-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 px-5 py-3.5 text-gray-900 placeholder-gray-400 text-base transition-all duration-200 outline-none"
                placeholder="https://your-product.com"
                required
              />
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Category -->
          <div class="p-8 bg-white">
            <label for="category" class="block text-base font-semibold text-gray-900 mb-2">
              Category <span class="text-red-500">*</span>
            </label>
            <select
              id="category"
              v-model="form.category"
              class="w-full rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 px-5 py-3.5 text-gray-900 placeholder-gray-400 text-base transition-all duration-200 outline-none"
              required
            >
              <option value="" disabled>Select a category</option>
              <option v-for="category in categories" :key="category.value" :value="category.value">
                {{ category.label }}
              </option>
            </select>
            <p v-if="!form.category" class="mt-2 text-sm text-gray-500">Select a category that best describes your product</p>
          </div>

          <!-- Logo Upload -->
          <div class="p-8 bg-gray-50/50">
            <label class="block text-base font-semibold text-gray-900 mb-2">
              Product Logo <span class="text-red-500">*</span>
            </label>
            <div class="flex items-center gap-8 mt-3">
              <div 
                class="relative h-28 w-28 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden hover:border-orange-500 transition-all duration-200 bg-white cursor-pointer"
                @click="$refs.logoInput.click()"
              >
                <img
                  v-if="logoPreview"
                  :src="logoPreview"
                  class="h-full w-full object-cover"
                  alt="Logo preview"
                />
                <div v-else class="text-center p-4">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p class="mt-2 text-sm text-gray-500">Click to upload</p>
                </div>
                <button
                  v-if="logoPreview"
                  type="button"
                  @click.stop="clearLogo"
                  class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-all duration-200"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleLogoChange"
                  class="hidden"
                  ref="logoInput"
                  required
                />
                <button
                  type="button"
                  @click="$refs.logoInput.click()"
                  class="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  {{ logoPreview ? 'Change Logo' : 'Upload Logo' }}
                </button>
                <p class="mt-3 text-sm text-gray-500">Square image, at least 400x400px, max 2MB.</p>
              </div>
            </div>
          </div>

          <!-- Screenshots -->
          <div class="p-8 bg-white">
            <label class="block text-base font-semibold text-gray-900 mb-2">
              Product Screenshots
            </label>
            <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              <div
                v-for="(preview, index) in imagePreviews"
                :key="index"
                class="relative group"
              >
                <div class="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden border border-gray-200 hover:ring-2 hover:ring-orange-500 transition-all duration-200 bg-white">
                  <img
                    :src="preview"
                    class="w-full h-full object-cover"
                    alt="Screenshot"
                  />
                  <button
                    type="button"
                    @click="removeImage(index)"
                    class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-all duration-200"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                v-if="imagePreviews.length < 5"
                @click="$refs.imageInput.click()"
                class="aspect-w-4 aspect-h-3 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-orange-500 transition-all duration-200 bg-gray-50/50"
              >
                <div class="text-center p-4">
                  <svg class="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p class="mt-2 text-sm font-medium text-gray-500">Add screenshot</p>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                @change="handleImagesChange"
                class="hidden"
                ref="imageInput"
              />
            </div>
            <p class="mt-4 text-sm text-gray-500">Add up to 5 screenshots of your product.</p>
          </div>

          <!-- Social Links -->
          <div class="p-8 bg-gray-50/50">
            <h3 class="text-base font-semibold text-gray-900 mb-4">Social Links</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="twitter" class="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                <input
                  type="url"
                  id="twitter"
                  v-model="form.twitter"
                  class="w-full rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 px-5 py-3.5 text-gray-900 placeholder-gray-400 text-base transition-all duration-200 outline-none"
                  placeholder="https://twitter.com/your-handle"
                />
              </div>
              <div>
                <label for="github" class="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                <input
                  type="url"
                  id="github"
                  v-model="form.github"
                  class="w-full rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 px-5 py-3.5 text-gray-900 placeholder-gray-400 text-base transition-all duration-200 outline-none"
                  placeholder="https://github.com/your-repo"
                />
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="px-8 py-6 bg-gray-50/50 flex justify-end">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg v-if="isSubmitting" class="animate-spin h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              {{ isSubmitting ? 'Submitting...' : 'Submit Product' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProduct } from '~/composables/useProduct'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { submitProduct, isLoading: isSubmitting } = useProduct()
const { isAuthenticated, user, checkAuth } = useAuth()

// Define categories as a simple array
const categories = ref([
    { value: 'AI', label: 'AI 🤖' },
    { value: 'SaaS', label: 'SaaS ☁️' },
    { value: 'DevTools', label: 'DevTools 🛠️' }
])

onMounted(() => {
    // Only check auth on client side
    if (process.client) {
        if (!checkAuth()) {
            return
        }
    }
})

const form = ref({
  name: '',
  tagline: '',
  description: '',
  website: '',
  category: '',
  twitter: '',
  github: ''
})

const logoFile = ref(null)
const logoPreview = ref(null)
const imagePreviews = ref([])
const imageFiles = ref([])
const success = ref(false)
const isUploading = ref(false)
const error = ref(null)

const validateForm = () => {
  if (!form.value.name.trim()) {
    throw new Error('Product name is required')
  }
  if (!form.value.tagline.trim()) {
    throw new Error('Tagline is required')
  }
  if (!form.value.description.trim()) {
    throw new Error('Description is required')
  }
  if (!form.value.website.trim()) {
    throw new Error('Website URL is required')
  }
  if (!form.value.category) {
    throw new Error('Category is required')
  }
  if (!logoFile.value) {
    throw new Error('Product logo is required')
  }
  
  // Validate website URL format
  try {
    new URL(form.value.website)
  } catch {
    throw new Error('Please enter a valid website URL')
  }

  // Validate social links if provided
  if (form.value.twitter) {
    try {
      new URL(form.value.twitter)
    } catch {
      throw new Error('Please enter a valid Twitter URL')
    }
  }
  if (form.value.github) {
    try {
      new URL(form.value.github)
    } catch {
      throw new Error('Please enter a valid GitHub URL')
    }
  }
}

const handleLogoChange = (event) => {
  const files = event.target.files;
  if (files && files[0]) {
    logoFile.value = files[0];
    logoPreview.value = URL.createObjectURL(files[0]);
  }
}

const handleImagesChange = async (event) => {
  const files = Array.from(event.target.files)
  if (imagePreviews.value.length + files.length > 5) {
    error.value = 'Maximum 5 images allowed'
    return
  }
  
  try {
    isUploading.value = true
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        error.value = 'Each image should be less than 5MB'
        return
      }
      if (!file.type.startsWith('image/')) {
        error.value = 'Please upload only image files'
        return
      }
      imageFiles.value.push(file)
      imagePreviews.value.push(URL.createObjectURL(file))
    }
    error.value = null
  } catch (err) {
    error.value = 'Error processing image files'
  } finally {
    isUploading.value = false
  }
}

const removeImage = (index) => {
  imageFiles.value.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

const handleSubmit = async () => {
  error.value = null
  success.value = false
  
  // Check authentication before submitting
  if (!isAuthenticated.value) {
    error.value = 'Please log in to submit a product'
    router.push('/auth/login?redirect=/submit')
    return
  }

  try {
    // Validate form
    validateForm()

    const formData = new FormData()
    formData.append('name', form.value.name.trim())
    formData.append('tagline', form.value.tagline.trim())
    formData.append('description', form.value.description.trim())
    formData.append('website', form.value.website.trim())
    formData.append('category', form.value.category)
    
    // Append logo if exists
    if (logoFile.value) {
      formData.append('logo', logoFile.value)
    } else {
      throw new Error('Product logo is required')
    }
    
    // Append screenshots if any
    imageFiles.value.forEach((file, index) => {
      formData.append(`images`, file)
    })
    
    if (form.value.twitter) formData.append('twitter', form.value.twitter.trim())
    if (form.value.github) formData.append('github', form.value.github.trim())

    // Debug: Log the FormData contents
    console.log('Form Data Contents:')
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1])
    }

    const response = await submitProduct(formData)
    console.log('Submit response:', response)

    if (response.statusCode === 201) {
      success.value = true
      alert('Product submitted successfully! Redirecting...')
      // Clear form
      form.value = {
        name: '',
        tagline: '',
        description: '',
        website: '',
        category: '',
        twitter: '',
        github: ''
      }
      logoPreview.value = null
      imagePreviews.value = []
      logoFile.value = null
      imageFiles.value = []
      
      // Redirect after short delay to show success message
      setTimeout(() => {
        router.push('/products/' + response.data._id)
      }, 1500)
    } else {
      throw new Error(response.message || 'Failed to submit product')
    }
  } catch (err) {
    console.error('Error submitting product:', err)
    if (err.response?.status === 401) {
      error.value = 'Your session has expired. Please log in again.'
      router.push('/auth/login?redirect=/submit')
    } else {
      error.value = err.response?.data?.message || err.message || 'Failed to submit product. Please try again.'
      alert(error.value)
    }
  }
}

const clearLogo = () => {
  if (logoPreview.value) {
    URL.revokeObjectURL(logoPreview.value)
  }
  logoFile.value = null
  logoPreview.value = null
  if (logoInput.value) {
    logoInput.value.value = ''
  }
}
</script>
