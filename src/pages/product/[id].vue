<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
        <h2 class="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
        <p class="text-gray-600">{{ error.message }}</p>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <!-- Product Header -->
          <div class="p-8 border-b border-gray-100">
            <div class="flex items-start gap-8">
              <div class="w-32 h-32 rounded-2xl overflow-hidden border-2 border-orange-100 bg-white shadow-sm flex-shrink-0">
                <img 
                  :src="product.logo || '/placeholder.png'" 
                  :alt="product.name"
                  class="w-full h-full object-contain p-3"
                  @error="handleLogoError"
                />
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <h1 class="text-4xl font-bold text-gray-900">{{ product.name }}</h1>
                  <span 
                    v-if="product.status === 'draft'"
                    class="px-3 py-1 text-xs font-medium text-yellow-600 bg-yellow-50 rounded-full"
                  >
                    Draft
                  </span>
                </div>
                <p class="text-xl text-gray-600 mb-6">{{ product.tagline }}</p>
                <div class="flex items-center gap-4">
                  <button 
                    class="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
                    @click="handleUpvote"
                    :class="{ 'bg-orange-600': product.hasUpvoted }"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span class="font-medium">{{ product.upvoteCount || 0 }} Upvotes</span>
                  </button>
                  <a 
                    v-if="product.website"
                    :href="product.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span class="font-medium">Visit Website</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Images -->
          <div class="relative bg-white rounded-xl overflow-hidden border border-gray-100">
            <!-- Main Image Display -->
            <div class="relative h-[400px]">
              <transition-group name="fade" tag="div" class="h-full">
                <img 
                  v-for="(image, index) in product.images" 
                  :key="image"
                  v-show="currentImageIndex === index"
                  :src="image" 
                  :alt="`${product.name} - Image ${index + 1}`"
                  class="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-300"
                  @error="handleImageError"
                />
              </transition-group>

              <!-- Image Navigation -->
              <div class="absolute inset-y-0 left-0 flex items-center">
                <button 
                  @click="prevImage" 
                  class="p-2 text-white bg-black/30 hover:bg-black/50 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  :disabled="currentImageIndex === 0"
                  :class="{ 'opacity-50 cursor-not-allowed': currentImageIndex === 0 }"
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
                  :disabled="currentImageIndex === product.images.length - 1"
                  :class="{ 'opacity-50 cursor-not-allowed': currentImageIndex === product.images.length - 1 }"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <!-- Image Counter -->
              <div class="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {{ currentImageIndex + 1 }} / {{ product.images.length }}
              </div>
            </div>

            <!-- Thumbnail Navigation -->
            <div class="p-4 border-t border-gray-100">
              <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button 
                  v-for="(image, index) in product.images" 
                  :key="image"
                  @click="currentImageIndex = index"
                  class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200"
                  :class="currentImageIndex === index ? 'border-orange-500' : 'border-transparent hover:border-gray-200'"
                >
                  <img 
                    :src="image" 
                    :alt="`${product.name} - Thumbnail ${index + 1}`"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Product Details -->
          <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Main Content -->
              <div class="lg:col-span-2 space-y-8">
                <!-- Description -->
                <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div class="p-8">
                    <div class="flex items-center gap-3 mb-6">
                      <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 class="text-2xl font-bold text-gray-900">About</h2>
                    </div>
                    
                    <div class="prose prose-lg max-w-none">
                      <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
                    </div>

                    <!-- Key Features -->
                    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="p-4 bg-gray-50 rounded-xl">
                        <div class="flex items-start gap-3">
                          <div class="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 class="font-medium text-gray-900">Centralized Logging</h3>
                            <p class="text-sm text-gray-600 mt-1">Collect and manage logs from multiple sources in one place</p>
                          </div>
                        </div>
                      </div>

                      <div class="p-4 bg-gray-50 rounded-xl">
                        <div class="flex items-start gap-3">
                          <div class="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 class="font-medium text-gray-900">Advanced Search</h3>
                            <p class="text-sm text-gray-600 mt-1">Powerful search capabilities to find exactly what you need</p>
                          </div>
                        </div>
                      </div>

                      <div class="p-4 bg-gray-50 rounded-xl">
                        <div class="flex items-start gap-3">
                          <div class="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 class="font-medium text-gray-900">Analytics</h3>
                            <p class="text-sm text-gray-600 mt-1">Deep insights and analytics for your application logs</p>
                          </div>
                        </div>
                      </div>

                      <div class="p-4 bg-gray-50 rounded-xl">
                        <div class="flex items-start gap-3">
                          <div class="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                          </div>
                          <div>
                            <h3 class="font-medium text-gray-900">Customizable</h3>
                            <p class="text-sm text-gray-600 mt-1">Flexible configuration options to suit your needs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Comments Section -->
                <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div class="p-8">
                    <div class="flex items-center gap-3 mb-6">
                      <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <h2 class="text-2xl font-bold text-gray-900">Comments</h2>
                    </div>

                    <!-- Comment Form -->
                    <div v-if="userStore.isAuthenticated" class="mb-8">
                      <div class="flex gap-4">
                        <div class="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                          <img 
                            :src="userStore.user?.avatar || '/default-avatar.png'" 
                            :alt="userStore.user?.username"
                            class="w-full h-full object-cover"
                            @error="handleAvatarError"
                          />
                        </div>
                        <div class="flex-1">
                          <textarea
                            v-model="newComment"
                            :placeholder="editingComment ? 'Edit your comment...' : 'Add a comment...'"
                            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            rows="3"
                          ></textarea>
                          <div class="flex justify-end mt-2 gap-2">
                            <button
                              v-if="editingComment"
                              @click="cancelEditing"
                              class="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                              Cancel
                            </button>
                            <button
                              @click="submitComment"
                              :disabled="!newComment.trim()"
                              class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {{ editingComment ? 'Update Comment' : 'Post Comment' }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Comments List -->
                    <div v-if="comments.length" class="space-y-6">
                      <div v-for="comment in comments" :key="comment._id" class="comment">
                        <!-- Main Comment -->
                        <div class="flex gap-4">
                          <div class="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                            <img 
                              :src="getUserAvatar(comment.author._id)" 
                              :alt="comment.author.username"
                              class="w-full h-full object-cover"
                              @error="handleAvatarError"
                            />
                          </div>
                          <div class="flex-1">
                            <div class="bg-gray-50 rounded-xl p-4">
                              <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                  <span class="font-medium text-gray-900">{{ comment.author.username }}</span>
                                  <span class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                                  <span v-if="comment.isEdited" class="text-sm text-gray-500">(edited)</span>
                                </div>
                                <div class="flex items-center gap-2">
                                  <button 
                                    v-if="userStore.user?._id === comment.author._id"
                                    @click="editComment(comment)"
                                    class="text-gray-500 hover:text-gray-700"
                                  >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button 
                                    v-if="userStore.user?._id === comment.author._id"
                                    @click="deleteComment(comment._id)"
                                    class="text-gray-500 hover:text-red-600"
                                  >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <p class="text-gray-700">{{ comment.content }}</p>
                              <div class="flex items-center gap-4 mt-3">
                                <button 
                                  @click="likeComment(comment)"
                                  class="flex items-center gap-1 text-gray-500 hover:text-orange-500"
                                  :class="{ 'text-orange-500': comment.likes.includes(userStore.user?._id) }"
                                >
                                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                  <span>{{ comment.likeCount }}</span>
                                </button>
                                <button 
                                  @click="toggleReplyForm(comment)"
                                  class="text-gray-500 hover:text-orange-500"
                                >
                                  Reply
                                </button>
                              </div>
                            </div>

                            <!-- Reply Form -->
                            <div v-if="activeReplyTo === comment._id" class="mt-4 ml-4">
                              <div class="flex gap-4">
                                <div class="w-8 h-8 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                                  <img 
                                    :src="userStore.user?.avatar || '/default-avatar.png'" 
                                    :alt="userStore.user?.username"
                                    class="w-full h-full object-cover"
                                    @error="handleAvatarError"
                                  />
                                </div>
                                <div class="flex-1">
                                  <textarea
                                    v-model="newReply"
                                    :placeholder="editingReply ? 'Edit your reply...' : 'Write a reply...'"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                                    rows="2"
                                  ></textarea>
                                  <div class="flex justify-end mt-2 gap-2">
                                    <button
                                      @click="cancelEditing"
                                      class="px-3 py-1 text-gray-600 hover:text-gray-800"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      @click="submitReply(comment)"
                                      :disabled="!newReply.trim()"
                                      class="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {{ editingReply ? 'Update Reply' : 'Reply' }}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- Replies -->
                            <div v-if="comment.replies?.length" class="mt-4 ml-4 space-y-4">
                              <div v-for="reply in comment.replies" :key="reply._id" class="flex gap-4">
                                <div class="w-8 h-8 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                                  <img 
                                    :src="getUserAvatar(reply.author._id)" 
                                    :alt="reply.author.username"
                                    class="w-full h-full object-cover"
                                    @error="handleAvatarError"
                                  />
                                </div>
                                <div class="flex-1">
                                  <div class="bg-gray-50 rounded-xl p-3">
                                    <div class="flex items-center justify-between mb-1">
                                      <div class="flex items-center gap-2">
                                        <span class="font-medium text-gray-900">{{ reply.author.username }}</span>
                                        <span class="text-sm text-gray-500">{{ formatDate(reply.createdAt) }}</span>
                                        <span v-if="reply.isEdited" class="text-sm text-gray-500">(edited)</span>
                                      </div>
                                      <div class="flex items-center gap-2">
                                        <button 
                                          v-if="userStore.user?._id === reply.author._id"
                                          @click="editReply(reply)"
                                          class="text-gray-500 hover:text-gray-700"
                                        >
                                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                          </svg>
                                        </button>
                                        <button 
                                          v-if="userStore.user?._id === reply.author._id"
                                          @click="deleteReply(reply._id)"
                                          class="text-gray-500 hover:text-red-600"
                                        >
                                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                    <p class="text-gray-700">{{ reply.content }}</p>
                                    <div class="flex items-center gap-4 mt-2">
                                      <button 
                                        @click="likeReply(reply)"
                                        class="flex items-center gap-1 text-gray-500 hover:text-orange-500"
                                        :class="{ 'text-orange-500': reply.likes.includes(userStore.user?._id) }"
                                      >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span>{{ reply.likeCount }}</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- No Comments State -->
                    <div v-else class="text-center py-12">
                      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <p class="text-gray-500 mb-4">No comments yet</p>
                      <button 
                        v-if="userStore.isAuthenticated"
                        @click="focusCommentForm"
                        class="px-4 py-2 text-sm font-medium text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        Be the first to comment
                      </button>
                      <NuxtLink
                        v-else
                        to="/auth/login"
                        class="px-4 py-2 text-sm font-medium text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        Sign in to comment
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sidebar -->
              <div class="space-y-6">
                <!-- Category -->
                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="text-sm font-medium text-gray-500 mb-3">Category</h3>
                  <span class="px-4 py-2 text-sm font-medium text-orange-500 bg-orange-50 rounded-full">
                    {{ product.category || 'Uncategorized' }}
                  </span>
                </div>

                <!-- Submitted By -->
                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="text-sm font-medium text-gray-500 mb-3">Submitted By</h3>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                      <img 
                        :src="getUserAvatar(product.submittedBy?._id)" 
                        :alt="product.submittedBy?.username || 'Anonymous'"
                        class="w-full h-full object-cover"
                        @error="handleAvatarError"
                      />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ product.submittedBy?.username || 'Anonymous' }}</p>
                      <p class="text-sm text-gray-500">Product Hunter</p>
                    </div>
                  </div>
                </div>

                <!-- Dates -->
                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="text-sm font-medium text-gray-500 mb-3">Timeline</h3>
                  <div class="space-y-3">
                    <div>
                      <p class="text-xs text-gray-500">Launch Date</p>
                      <p class="text-sm text-gray-900">{{ formatDate(product.launchDate) }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Submission Date</p>
                      <p class="text-sm text-gray-900">{{ formatDate(product.submissionDate) }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Last Updated</p>
                      <p class="text-sm text-gray-900">{{ formatDate(product.lastUpdated) }}</p>
                    </div>
                  </div>
                </div>

                <!-- Social Links -->
                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="text-sm font-medium text-gray-500 mb-3">Links</h3>
                  <div class="space-y-3">
                    <a 
                      v-if="product.website"
                      :href="product.website"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Website</span>
                    </a>
                    <a 
                      v-if="product.github"
                      :href="product.github"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a 
                      v-if="product.twitter"
                      :href="product.twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span>Twitter</span>
                    </a>
                  </div>
                </div>

                <!-- Stats -->
                <div class="bg-gray-50 rounded-xl p-6">
                  <h3 class="text-sm font-medium text-gray-500 mb-3">Stats</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="text-center p-3 bg-white rounded-lg">
                      <p class="text-2xl font-bold text-gray-900">{{ product.upvoteCount || 0 }}</p>
                      <p class="text-xs text-gray-500">Upvotes</p>
                    </div>
                    <div class="text-center p-3 bg-white rounded-lg">
                      <p class="text-2xl font-bold text-gray-900">{{ product.views || 0 }}</p>
                      <p class="text-xs text-gray-500">Views</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const { $axios } = useNuxtApp()
const userStore = useUserStore()

const product = ref(null)
const pending = ref(true)
const error = ref(null)
const currentImageIndex = ref(0)

// Comment state
const comments = ref([])
const newComment = ref('')
const newReply = ref('')
const activeReplyTo = ref(null)
const editingComment = ref(null)
const editingReply = ref(null)

// Fetch product data
const fetchProduct = async () => {
  try {
    const response = await $axios.get(`/api/v1/products/${route.params.id}`)
    product.value = response.data.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load product'
  } finally {
    pending.value = false
  }
}

// Image navigation
const nextImage = () => {
  if (!product.value?.images?.length) return
  currentImageIndex.value = (currentImageIndex.value + 1) % product.value.images.length
}

const prevImage = () => {
  if (!product.value?.images?.length) return
  currentImageIndex.value = (currentImageIndex.value - 1 + product.value.images.length) % product.value.images.length
}

// Handle upvote
const handleUpvote = async () => {
  if (!userStore.isAuthenticated) {
    navigateTo(`/auth/login?redirect=/product/${route.params.id}`)
    return
  }

  try {
    const response = await $axios.post(`/api/v1/products/${route.params.id}/upvote`)
    product.value = response.data.data
  } catch (err) {
    console.error('Upvote error:', err)
  }
}

// Format date
const formatDate = (date) => {
  if (!date) return ''
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

// Error handlers
const handleImageError = (e) => {
  e.target.src = '/placeholder.png'
}

const handleLogoError = (e) => {
  e.target.src = '/placeholder.png'
}

const handleAvatarError = (e) => {
  e.target.src = '/default-avatar.png'
}

const getUserAvatar = (userId) => {
  if (!userId) return '/default-avatar.png'
  
  if (userStore.user?._id === userId) {
    return userStore.user.avatar || '/default-avatar.png'
  }
  
  return '/default-avatar.png'
}

// Image navigation with keyboard support
const handleKeyDown = (e) => {
  if (e.key === 'ArrowLeft') {
    prevImage()
  } else if (e.key === 'ArrowRight') {
    nextImage()
  }
}

// Fetch comments
const fetchComments = async () => {
  try {
    const response = await $axios.get(`/api/v1/comments/product/${route.params.id}`)
    comments.value = response.data.data.comments
  } catch (err) {
    console.error('Error fetching comments:', err)
  }
}

// Submit comment
const submitComment = async () => {
  if (!newComment.value.trim()) return

  try {
    const response = await $axios.post(`/api/v1/comments/product/${route.params.id}`, {
      content: newComment.value,
      parentCommentId: editingComment.value?._id || null
    })

    if (editingComment.value) {
      // Update existing comment
      const index = comments.value.findIndex(c => c._id === editingComment.value._id)
      if (index !== -1) {
        comments.value[index] = response.data.data
      }
      editingComment.value = null
    } else {
      // Add new comment
      comments.value.unshift(response.data.data)
    }
    newComment.value = ''
  } catch (err) {
    console.error('Error submitting comment:', err)
  }
}

// Submit reply
const submitReply = async (comment) => {
  if (!newReply.value.trim()) return

  try {
    const response = await $axios.post(`/api/v1/comments/product/${route.params.id}`, {
      content: newReply.value,
      parentCommentId: editingReply.value?._id || comment._id
    })

    if (editingReply.value) {
      // Update existing reply
      comment.replies = comment.replies.map(reply => 
        reply._id === editingReply.value._id ? response.data.data : reply
      )
      editingReply.value = null
    } else {
      // Add new reply
      comment.replies.push(response.data.data)
    }
    newReply.value = ''
    activeReplyTo.value = null
  } catch (err) {
    console.error('Error submitting reply:', err)
  }
}

// Like comment
const likeComment = async (comment) => {
  try {
    const response = await $axios.post(`/api/v1/comments/${comment._id}/like`)
    const index = comments.value.findIndex(c => c._id === comment._id)
    if (index !== -1) {
      comments.value[index] = response.data.data
    }
  } catch (err) {
    console.error('Error liking comment:', err)
  }
}

// Like reply
const likeReply = async (reply) => {
  try {
    const response = await $axios.post(`/api/v1/comments/${reply._id}/like`)
    // Update reply in comments array
    comments.value.forEach(comment => {
      const replyIndex = comment.replies.findIndex(r => r._id === reply._id)
      if (replyIndex !== -1) {
        comment.replies[replyIndex] = response.data.data
      }
    })
  } catch (err) {
    console.error('Error liking reply:', err)
  }
}

// Edit comment
const editComment = async (comment) => {
  editingComment.value = comment
  newComment.value = comment.content
  // Scroll to comment form
  const textarea = document.querySelector('textarea')
  if (textarea) {
    textarea.focus()
    textarea.scrollIntoView({ behavior: 'smooth' })
  }
}

// Edit reply
const editReply = async (reply) => {
  editingReply.value = reply
  newReply.value = reply.content
  // Find parent comment and show reply form
  const parentComment = comments.value.find(c => 
    c.replies.some(r => r._id === reply._id)
  )
  if (parentComment) {
    activeReplyTo.value = parentComment._id
    // Scroll to reply form
    const textarea = document.querySelector('textarea')
    if (textarea) {
      textarea.focus()
      textarea.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// Delete comment
const deleteComment = async (commentId) => {
  if (!confirm('Are you sure you want to delete this comment?')) return

  try {
    await $axios.delete(`/api/v1/comments/${commentId}`)
    comments.value = comments.value.filter(c => c._id !== commentId)
  } catch (err) {
    console.error('Error deleting comment:', err)
  }
}

// Delete reply
const deleteReply = async (replyId) => {
  if (!confirm('Are you sure you want to delete this reply?')) return

  try {
    await $axios.delete(`/api/v1/comments/${replyId}`)
    comments.value.forEach(comment => {
      comment.replies = comment.replies.filter(r => r._id !== replyId)
    })
  } catch (err) {
    console.error('Error deleting reply:', err)
  }
}

// Toggle reply form
const toggleReplyForm = (comment) => {
  activeReplyTo.value = activeReplyTo.value === comment._id ? null : comment._id
  newReply.value = ''
}

// Cancel reply
const cancelReply = () => {
  activeReplyTo.value = null
  newReply.value = ''
}

// Focus comment form
const focusCommentForm = () => {
  const textarea = document.querySelector('textarea')
  if (textarea) {
    textarea.focus()
  }
}

// Cancel editing
const cancelEditing = () => {
  editingComment.value = null
  editingReply.value = null
  newComment.value = ''
  newReply.value = ''
  activeReplyTo.value = null
}

onMounted(() => {
  fetchProduct()
  fetchComments()
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style> 