import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    // Request interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
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