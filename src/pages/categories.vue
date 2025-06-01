<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Category Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- AI & ML Category -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div class="relative h-48">
            <img src="https://picsum.photos/400/300" alt="AI & ML" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6">
              <h2 class="text-2xl font-bold text-white mb-2">AI & ML</h2>
              <p class="text-white/90">Artificial Intelligence and Machine Learning tools</p>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm text-gray-500">24 Products</span>
              <NuxtLink to="/categories/ai" class="text-orange-500 hover:text-orange-600 font-medium">
                View All →
              </NuxtLink>
            </div>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <img src="https://picsum.photos/40/40" alt="Product" class="w-10 h-10 rounded-lg" />
                <div>
                  <h3 class="font-medium text-gray-900">AI Content Generator</h3>
                  <p class="text-sm text-gray-500">By John Doe</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <img src="https://picsum.photos/41/41" alt="Product" class="w-10 h-10 rounded-lg" />
                <div>
                  <h3 class="font-medium text-gray-900">ML Model Builder</h3>
                  <p class="text-sm text-gray-500">By Jane Smith</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Productivity Category -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div class="relative h-48">
            <img src="https://picsum.photos/400/301" alt="Productivity" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6">
              <h2 class="text-2xl font-bold text-white mb-2">Productivity</h2>
              <p class="text-white/90">Tools to boost your productivity</p>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm text-gray-500">18 Products</span>
              <NuxtLink to="/categories/productivity" class="text-orange-500 hover:text-orange-600 font-medium">
                View All →
              </NuxtLink>
            </div>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <img src="https://picsum.photos/42/42" alt="Product" class="w-10 h-10 rounded-lg" />
                <div>
                  <h3 class="font-medium text-gray-900">Task Manager Pro</h3>
                  <p class="text-sm text-gray-500">By Mike Johnson</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <img src="https://picsum.photos/43/43" alt="Product" class="w-10 h-10 rounded-lg" />
                <div>
                  <h3 class="font-medium text-gray-900">Time Tracker</h3>
                  <p class="text-sm text-gray-500">By Sarah Wilson</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Design Tools Category -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div class="relative h-48">
            <img src="https://picsum.photos/400/302" alt="Design Tools" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6">
              <h2 class="text-2xl font-bold text-white mb-2">Design Tools</h2>
              <p class="text-white/90">Creative design and prototyping tools</p>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm text-gray-500">32 Products</span>
              <NuxtLink to="/categories/design" class="text-orange-500 hover:text-orange-600 font-medium">
                View All →
              </NuxtLink>
            </div>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <img src="https://picsum.photos/44/44" alt="Product" class="w-10 h-10 rounded-lg" />
                <div>
                  <h3 class="font-medium text-gray-900">Design Studio Pro</h3>
                  <p class="text-sm text-gray-500">By Alex Brown</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <img src="https://picsum.photos/45/45" alt="Product" class="w-10 h-10 rounded-lg" />
                <div>
                  <h3 class="font-medium text-gray-900">UI Kit Builder</h3>
                  <p class="text-sm text-gray-500">By Emma Davis</p>
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
// Add any necessary logic here
</script> 