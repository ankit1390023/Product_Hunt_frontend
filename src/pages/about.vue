<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-16">
      <!-- Our Story -->
      <div class="max-w-3xl mx-auto mb-20">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
        <p class="text-gray-600 text-lg leading-relaxed mb-6">
          ProductHunt was born from a simple idea: to help makers launch their products and get feedback from the community. 
          What started as a small community has grown into a global platform where thousands of products are discovered every day.
        </p>
        <p class="text-gray-600 text-lg leading-relaxed">
          Today, we're proud to be the go-to platform for product launches, connecting makers with early adopters and helping 
          innovative products find their audience.
        </p>
      </div>

      <!-- Mission & Values -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div class="bg-white rounded-xl p-8 shadow-sm">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p class="text-gray-600">
            To help makers build and launch products that people love. We believe in the power of community and the impact 
            that great products can have on people's lives.
          </p>
        </div>
        <div class="bg-white rounded-xl p-8 shadow-sm">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
          <ul class="space-y-3 text-gray-600">
            <li class="flex items-start">
              <svg class="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Community First
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Innovation & Creativity
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Transparency & Trust
            </li>
          </ul>
        </div>
      </div>

      <!-- Team Section -->
      <div class="mb-20">
        <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Team Member 1 -->
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <img
              src="https://picsum.photos/200/200"
              alt="Team Member"
              class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="text-xl font-bold text-gray-900 mb-2">John Doe</h3>
            <p class="text-orange-500 mb-4">Founder & CEO</p>
            <p class="text-gray-600">
              Passionate about building products that make a difference in people's lives.
            </p>
          </div>

          <!-- Team Member 2 -->
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <img
              src="https://picsum.photos/201/201"
              alt="Team Member"
              class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="text-xl font-bold text-gray-900 mb-2">Jane Smith</h3>
            <p class="text-orange-500 mb-4">Head of Product</p>
            <p class="text-gray-600">
              Dedicated to creating amazing user experiences and building great products.
            </p>
          </div>

          <!-- Team Member 3 -->
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <img
              src="https://picsum.photos/202/202"
              alt="Team Member"
              class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="text-xl font-bold text-gray-900 mb-2">Mike Johnson</h3>
            <p class="text-orange-500 mb-4">Lead Developer</p>
            <p class="text-gray-600">
              Expert in building scalable and innovative technology solutions.
            </p>
          </div>
        </div>
      </div>

      <!-- Join Us Section -->
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-12 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">Join Our Community</h2>
        <p class="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
          Be part of a community of makers, innovators, and early adopters. Launch your product or discover the next big thing.
        </p>
        <div class="flex justify-center space-x-4">
          <NuxtLink
            to="/auth/register"
            class="px-8 py-3 bg-white text-orange-500 rounded-lg font-medium hover:bg-orange-50 transition-colors duration-200"
          >
            Sign Up
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
          >
            Explore Products
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Add any necessary logic here
</script> 