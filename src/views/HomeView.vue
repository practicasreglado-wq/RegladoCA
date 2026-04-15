<template>
  <div class="has-canvas-bg">
    <CanvasVideoBackground />
    <TheNavbar />

    <!-- Global Fixed Rotating Logo Watermark -->
    <div ref="globalWatermark" class="global-watermark" aria-hidden="true">
      <img :src="logoSvg" alt="" class="global-watermark__img" />
    </div>
    <main>
      <!-- Inicio -->
      <div id="inicio" class="dark-transition-bg">
        <HeroSection />
        <ServicesSection :show-cta="false" />
      </div>

      <!-- Sobre Nosotros -->
      <div id="sobre-nosotros">
        <AboutContent />
      </div>

      <!-- Inspecciones Tributarias -->
      <div id="inspecciones-tributarias">
        <InspeccionesContent />
      </div>

      <!-- Consultoría Jurídica -->
      <div id="consultoria-juridica">
        <JuridicaContent />
      </div>

      <!-- Consultoría Técnica -->
      <div id="consultoria-tecnica">
        <TecnicaContent />
      </div>

      <!-- Consultoría Económica -->
      <div id="consultoria-economica">
        <EconomicaContent />
      </div>

      <!-- Contacto -->
      <div id="contacto">
        <ContactoContent />
      </div>

    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import TheNavbar       from '@/components/layout/TheNavbar.vue'
import TheFooter       from '@/components/layout/TheFooter.vue'
import HeroSection     from '@/components/sections/HeroSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import AboutSection    from '@/components/sections/AboutSection.vue'
import StatsSection    from '@/components/sections/StatsSection.vue'

// New content components
import AboutContent        from '@/components/sections/AboutContent.vue'
import InspeccionesContent from '@/components/sections/InspeccionesContent.vue'
import JuridicaContent     from '@/components/sections/JuridicaContent.vue'
import TecnicaContent      from '@/components/sections/TecnicaContent.vue'
import EconomicaContent    from '@/components/sections/EconomicaContent.vue'
import ContactoContent     from '@/components/sections/ContactoContent.vue'
import CanvasVideoBackground from '@/components/CanvasVideoBackground.vue'
import logoSvg from '../assets/images/logo.svg'

gsap.registerPlugin(ScrollTrigger)

const { t, tm } = useI18n()
const globalWatermark = ref(null)

let showTrigger = null
let hideTrigger = null

onMounted(() => {
  const el = globalWatermark.value
  if (!el) return

  // Initially hidden
  gsap.set(el, { autoAlpha: 0 })

  // Show when the first blue slide of Inspecciones is mostly visible
  showTrigger = ScrollTrigger.create({
    trigger: '#inspecciones-tributarias',
    start: 'top -170%',
    onEnter: () => gsap.to(el, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }),
    onLeaveBack: () => gsap.to(el, { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }),
  })

  // Hide when leaving Económica section
  hideTrigger = ScrollTrigger.create({
    trigger: '#contacto',
    start: 'top 80%',
    end: 'top 20%',
    onEnter: () => gsap.to(el, { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }),
    onLeaveBack: () => gsap.to(el, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }),
  })
})

onUnmounted(() => {
  showTrigger?.kill()
  hideTrigger?.kill()
})
</script>

<style scoped>
#inicio {
  background-color: transparent; 
  transition: background-color 0.8s ease;
  overflow: hidden;
  position: relative;
}

#sobre-nosotros,
#consultoria-juridica,
#consultoria-tecnica,
#consultoria-economica,
#contacto,
#inspecciones-tributarias {
  position: relative;
}

/* Global Fixed Watermark */
.global-watermark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
}

.global-watermark__img {
  width: 600px;
  height: 600px;
  object-fit: contain;
  opacity: 0.12;
  transform: rotate(calc(var(--watermark-rotation-num, 0) * 1deg));
}

@media (max-width: 768px) {
  .global-watermark__img {
    width: 300px;
    height: 300px;
  }
}
</style>
