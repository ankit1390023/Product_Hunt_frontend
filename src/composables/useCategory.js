import { ref } from 'vue'
import { useNuxtApp } from '#app'

export function useCategory() {
    const categories = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const fetchCategories = async () => {
        isLoading.value = true
        error.value = null

        try {
            const { $axios } = useNuxtApp()
            const response = await $axios.get('/api/v1/categories')
            categories.value = response.data.data
            return categories.value
        } catch (err) {
            console.error('Error fetching categories:', err)
            error.value = err.response?.data?.message || err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const getCategory = async (categoryId) => {
        isLoading.value = true
        error.value = null

        try {
            const response = await fetch(`http://localhost:8000/api/v1/categories/${categoryId}`, {
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error('Failed to fetch category')
            }

            return await response.json()
        } catch (err) {
            error.value = err.message
            console.error('Error fetching category:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const getTrendingCategories = async () => {
        isLoading.value = true
        error.value = null

        try {
            const response = await fetch('http://localhost:8000/api/v1/categories/trending', {
                credentials: 'include'
            })

            if (!response.ok) throw new Error('Failed to fetch trending categories')

            return await response.json()
        } catch (err) {
            error.value = err.message
            console.error('Error fetching trending categories:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return {
        categories,
        isLoading,
        error,
        fetchCategories,
        getCategory,
        getTrendingCategories
    }
} 