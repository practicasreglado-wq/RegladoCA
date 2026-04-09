<template>
  <RouterView />
  <CookieBanner />
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import CookieBanner from '@/components/layout/CookieBanner.vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

onMounted(() => {
  // Limpiar hash de la URL sin disparar scroll para evitar saltos en el refresh
  if (window.location.hash) {
    setTimeout(() => {
      window.history.replaceState(null, null, window.location.pathname)
    }, 100)
  }

  const lenis = new Lenis()

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  // Refrescar triggers después de que el DOM esté listo
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 500)
})
</script>
