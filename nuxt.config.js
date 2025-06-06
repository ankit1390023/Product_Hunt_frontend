// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['@/styles/main.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    // Explicitly set to use JavaScript
    typescript: {
        strict: false,
        typeCheck: false
    },

    // Set source directory
    srcDir: 'src/',

    // Add compatibility date
    nitro: {
        compatibilityDate: '2025-06-01',
        preset: 'vercel'
    },

    modules: ['@vueuse/motion/nuxt'],

    app: {
        head: {
            title: 'Product Hunt ',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ]
        }
    },

    // Runtime config for API
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE_URL || 'http://localhost:8000'
        }
    },

    // Register plugins
    plugins: [
        '~/plugins/axios.js'
    ],

    router: {
        middleware: ['auth']
    },

    // Add logging configuration
    vite: {
        logLevel: 'error', // Only show errors in production
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vendor': ['vue', 'vue-router', 'pinia']
                    }
                }
            }
        }
    }
}) 