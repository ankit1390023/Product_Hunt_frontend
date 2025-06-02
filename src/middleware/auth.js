export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    const token = localStorage.getItem('token')

    // If user is not logged in and trying to access protected routes
    if (!token && to.path !== '/auth/login' && to.path !== '/auth/register') {
        return navigateTo('/auth/login')
    }

    // If user is logged in and trying to access auth pages
    if (token && (to.path === '/auth/login' || to.path === '/auth/register')) {
        return navigateTo('/')
    }
}) 