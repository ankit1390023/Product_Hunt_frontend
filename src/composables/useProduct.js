import { ref } from 'vue'

export function useProduct() {
    const isLoading = ref(false)
    const error = ref(null)

    const submitProduct = async (formData) => {
        isLoading.value = true
        error.value = null

        try {
            const { $axios } = useNuxtApp()

            // Log form data for debugging
            console.log('Submitting form data:', {
                name: formData.get('name'),
                tagline: formData.get('tagline'),
                description: formData.get('description'),
                website: formData.get('website'),
                category: formData.get('category'),
                logo: formData.get('logo')?.name,
                images: formData.getAll('images').map(img => img.name)
            });

            const response = await $axios.post('/api/v1/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })

            return response.data
        } catch (err) {
            console.error('Error submitting product:', err)
            error.value = err.response?.data?.message || err.message || 'Failed to submit product'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const getProduct = async (productId) => {
        isLoading.value = true
        error.value = null

        try {
            const { $axios } = useNuxtApp()
            const response = await $axios.get(`/api/v1/products/${productId}`)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
            console.error('Error fetching product:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const updateProduct = async (productId, formData) => {
        isLoading.value = true
        error.value = null

        try {
            const { $axios } = useNuxtApp()
            const response = await $axios.patch(`/api/v1/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
            console.error('Error updating product:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const deleteProduct = async (productId) => {
        isLoading.value = true
        error.value = null

        try {
            const { $axios } = useNuxtApp()
            const response = await $axios.delete(`/api/v1/products/${productId}`)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
            console.error('Error deleting product:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const upvoteProduct = async (productId) => {
        isLoading.value = true
        error.value = null

        try {
            const { $axios } = useNuxtApp()
            const response = await $axios.post(`/api/v1/products/${productId}/upvote`)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
            console.error('Error upvoting product:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const removeUpvote = async (productId) => {
        isLoading.value = true
        error.value = null

        try {
            const { $axios } = useNuxtApp()
            const response = await $axios.delete(`/api/v1/products/${productId}/upvote`)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
            console.error('Error removing upvote:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        error,
        submitProduct,
        getProduct,
        updateProduct,
        deleteProduct,
        upvoteProduct,
        removeUpvote
    }
} 