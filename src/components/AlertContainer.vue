<template>
  <div class="alert-container">
    <Alert
      v-for="alert in alerts"
      :key="alert.id"
      :message="alert.message"
      :type="alert.type"
      :duration="alert.duration"
      @close="removeAlert(alert.id)"
    />
  </div>
</template>

<script setup>
import { useAlert } from '../composables/useAlert';
import Alert from './Alert.vue';

const { alerts, removeAlert } = useAlert();
</script>

<style scoped>
.alert-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style> 