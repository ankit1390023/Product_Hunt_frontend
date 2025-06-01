import { MotionPlugin } from '@vueuse/motion'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(MotionPlugin, {
        directives: {
            'motion': {
                initial: { opacity: 0, y: 20 },
                enter: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 500,
                        ease: 'easeOut'
                    }
                },
                leave: {
                    opacity: 0,
                    y: 20,
                    transition: {
                        duration: 300,
                        ease: 'easeIn'
                    }
                }
            }
        }
    })
}) 