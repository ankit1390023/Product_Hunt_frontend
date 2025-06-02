import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const axiosInstance = axios.create({
        baseURL: config.public.apiBase,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    // Request interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            // Only access localStorage on client-side
            if (process.client) {
                const token = localStorage.getItem('token')
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
            }

            console.log('Making request to:', config.baseURL + config.url)
            return config
        },
        (error) => {
            console.error('Request error:', error)
            return Promise.reject(error)
        }
    )

    // Response interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            console.log('Response received:', response.data)
            return response
        },
        (error) => {
            console.error('Response error:', error)
            if (error.response) {
                console.error('Error data:', error.response.data)
                console.error('Error status:', error.response.status)

                // Handle 401 Unauthorized errors
                if (error.response.status === 401 && process.client) {
                    // Clear auth data
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')

                    // Redirect to login if not already there
                    const router = useRouter()
                    if (router.currentRoute.value.path !== '/auth/login') {
                        router.push('/auth/login?redirect=' + router.currentRoute.value.path)
                    }
                }
            }
            return Promise.reject(error)
        }
    )

    return {
        provide: {
            axios: axiosInstance
        }
    }
}) 