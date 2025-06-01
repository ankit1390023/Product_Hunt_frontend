export default defineEventHandler((event) => {
    return {
        message: 'Hello from JavaScript API!',
        timestamp: new Date().toISOString()
    }
}) 