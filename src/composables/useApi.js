
import { useFetch } from '#app'

export const useApi = () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase

    const get = async (endpoint) => {
        return await useFetch(`${baseURL}${endpoint}`, {
            method: 'GET',
            credentials: 'include'
        })
    }

    const post = async (endpoint, data) => {
        return await useFetch(`${baseURL}${endpoint}`, {
            method: 'POST',
            body: data,
            credentials: 'include'
        })
    }

    const put = async (endpoint, data) => {
        return await useFetch(`${baseURL}${endpoint}`, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
    }

    const del = async (endpoint) => {
        return await useFetch(`${baseURL}${endpoint}`, {
            method: 'DELETE',
            credentials: 'include'
        })
    }

    return {
        get,
        post,
        put,
        del
    }
} 