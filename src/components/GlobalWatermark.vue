<template>
  <div class="global-watermark">
    <div ref="logoRef" class="global-watermark__logo"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const logoRef = ref(null)

let scrollHandler = null
let currentRotation = 0
let lastScrollY = 0

onMounted(() => {
  if (logoRef.value) {
    lastScrollY = window.scrollY
    
    scrollHandler = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY
      lastScrollY = currentScrollY
      
      // Calculate rotation: 0.1 degrees per pixel scrolled (adjust if needed)
      currentRotation += delta * 0.15
      
      // Tween the rotation to provide a buttery smooth 'scrub' inertia effect
      gsap.to(logoRef.value, {
        rotation: currentRotation,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto"
      })
    }
    
    window.addEventListener("scroll", scrollHandler, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler)
  }
})
</script>

<style scoped>
.global-watermark {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0; /* Fully behind content */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0; /* Let GSAP control visibility */
  will-change: opacity;
}

.global-watermark__logo {
  width: 480px;
  max-width: 80vw;
  aspect-ratio: 1;
  background-image: url('../assets/images/REGLADO_Blanco_Symbol.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  filter: blur(0.5px); /* Optional softness */
}

@media (max-width: 768px) {
  .global-watermark__logo {
    width: 320px;
  }
}
</style>
