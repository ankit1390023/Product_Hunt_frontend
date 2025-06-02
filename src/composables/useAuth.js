import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

export const useAuth = () => {
    const router = useRouter()
    const userStore = useUserStore()
    const user = ref(null)
    const token = ref(null)

    // Check if we're in a browser environment
    const isBrowser = typeof window !== 'undefined'

    // Initialize state from localStorage only in browser
    if (isBrowser) {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        if (storedUser) user.value = JSON.parse(storedUser)
        if (storedToken) token.value = storedToken
    }

    const isAuthenticated = computed(() => {
        if (process.client) {
            return !!localStorage.getItem('token')
        }
        return false
    })

    const login = async (credentials) => {
        try {
            const { $axios } = useNuxtApp()
            const response = await $axios.post('/api/v1/auth/login', credentials)
            const { user: userData, token: authToken } = response.data.data

            user.value = userData
            token.value = authToken

            if (isBrowser) {
                localStorage.setItem('user', JSON.stringify(userData))
                localStorage.setItem('token', authToken)
            }

            return response.data
        } catch (error) {
            // Only log in development environment
            if (process.env.NODE_ENV === 'development') {
                console.error('Login error:', error)
            }
            throw error
        }
    }

    const register = async (userData) => {
        try {
            const { $axios } = useNuxtApp()
            const response = await $axios.post('/api/v1/auth/register', userData)
            return response.data
        } catch (error) {
            // Only log in development environment
            if (process.env.NODE_ENV === 'development') {
                console.error('Registration error:', error)
            }
            throw error
        }
    }

    const logout = () => {
        user.value = null
        token.value = null
        if (isBrowser) {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
        router.push('/login')
        userStore.logout()
    }

    const checkAuth = () => {
        if (process.client) {
            const token = localStorage.getItem('token')
            if (!token) {
                return false
            }
            return true
        }
        return false
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
        user: computed(() => userStore.user)
    }
} 