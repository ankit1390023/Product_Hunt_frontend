import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isAuthenticated: false
    }),

    getters: {
        getUser: (state) => state.user,
        getIsAuthenticated: (state) => state.isAuthenticated
    },

    actions: {
        setUser(userData) {
            this.user = userData
            this.isAuthenticated = true
        },

        clearUser() {
            this.user = null
            this.isAuthenticated = false
            localStorage.removeItem('token')
        },

        logout() {
            this.clearUser()
            navigateTo('/auth/login')
        }
    }
}) 