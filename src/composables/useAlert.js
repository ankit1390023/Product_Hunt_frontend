import { ref } from 'vue';

const alerts = ref([]);

export function useAlert() {
    const showAlert = (message, type = 'success', duration = 3000) => {
        const id = Date.now();
        alerts.value.push({ id, message, type, duration });
    };

    const removeAlert = (id) => {
        alerts.value = alerts.value.filter(alert => alert.id !== id);
    };

    return {
        alerts,
        showAlert,
        removeAlert
    };
} 