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

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const lenis = new Lenis()
  
  // Variables del Motor de Seguimiento Orgánico
  let targetRotation = 0
  let currentRotation = 0
  const lerpState = { factor: 0.1 } // Factor de seguimiento dinámico
  
  // 1. SENSOR de Scroll: Actualiza el objetivo y suaviza la transición de fricción
  lenis.on('scroll', (e) => {
    ScrollTrigger.update()
    
    if (e && typeof e.progress === 'number') {
      targetRotation = e.progress * 5040 // 14 vueltas (punto dulce de velocidad)
      
      const velocity = Math.abs(e.velocity || 0)
      if (velocity > 0.3) {
        // Modo Activo: El logo sigue al usuario con precisión
        gsap.to(lerpState, { factor: 0.12, duration: 0.3, overwrite: true })
      } else {
        // Modo Inercia Profunda: La atracción se debilita masivamente y muy despacio
        // Esto crea el efecto de "giro interminable" y frenada orgánica
        gsap.to(lerpState, { factor: 0.001, duration: 8.0, ease: "power1.out", overwrite: true })
      }
    }
  })

  // 2. MOTOR de Movimiento: Interpolación constante
  gsap.ticker.add(() => {
    const diff = targetRotation - currentRotation
    currentRotation += diff * lerpState.factor
    
    // Aplicar al CSS de la página
    document.documentElement.style.setProperty('--watermark-rotation-num', currentRotation.toString())
  })

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // Sincronización final
  setTimeout(() => {
    lenis.scrollTo(0, { immediate: true })
    ScrollTrigger.refresh()
  }, 1000)
})
</script>
