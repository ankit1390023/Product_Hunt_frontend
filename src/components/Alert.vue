<template>
  <Transition name="slide">
    <div v-if="isVisible" class="alert-container">
      <div :class="['alert-box', type]">
        <div class="icon">
          {{ type === 'success' ? '✓' : '✕' }}
        </div>
        <p class="message">{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
});

const emit = defineEmits(['close']);
const isVisible = ref(true);
let timer = null;

onMounted(() => {
  timer = setTimeout(() => {
    isVisible.value = false;
    setTimeout(() => {
      emit('close');
    }, 300);
  }, props.duration);
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<style scoped>
.alert-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.alert-box {
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.alert-box.success {
  background: #f0fdf4;
  border-left: 4px solid #22c55e;
}

.alert-box.error {
  background: #fef2f2;
  border-left: 4px solid #ef4444;
}

.icon {
  font-size: 20px;
}

.success .icon {
  color: #22c55e;
}

.error .icon {
  color: #ef4444;
}

.message {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.success .message {
  color: #166534;
}

.error .message {
  color: #991b1b;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style> 