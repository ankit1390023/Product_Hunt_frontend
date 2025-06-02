import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        // Initialize state from localStorage if available
        if (process.client) {
            const savedState = localStorage.getItem('user-store')
            if (savedState) {
                return JSON.parse(savedState)
            }
        }
        return {
            user: null,
            isAuthenticated: false
        }
    },

    getters: {
        getUser: (state) => state.user,
        getIsAuthenticated: (state) => state.isAuthenticated
    },

    actions: {
        setUser(userData) {
            this.user = userData
            this.isAuthenticated = !!userData
            // Save to localStorage
            if (process.client) {
                localStorage.setItem('user-store', JSON.stringify({
                    user: this.user,
                    isAuthenticated: this.isAuthenticated
                }))
            }
        },

        clearUser() {
            this.user = null
            this.isAuthenticated = false
            // Clear from localStorage
            if (process.client) {
                localStorage.removeItem('user-store')
            }
        }
    }
}) 