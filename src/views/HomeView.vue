<template>
  <div class="has-canvas-bg">
    <CanvasVideoBackground />
    <div id="global-dark-overlay" style="position: fixed; inset: 0; background-color: var(--color-bg-main); z-index: -1; opacity: 0; pointer-events: none;"></div>
    <TheNavbar />
    <GlobalWatermark />
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
import { useI18n } from 'vue-i18n'

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
import GlobalWatermark       from '@/components/GlobalWatermark.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { t, tm } = useI18n()

onMounted(() => {
  // Oscurece el video de fondo cuando salimos del Hero
  gsap.to("#global-dark-overlay", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".section-servicios-trigger",
      start: "top 20%",
      end: "top top",
      scrub: true
    }
  })

  // Trigger: Se muestra desde Inspecciones hasta el final de las consultorías
  // (La sección de Servicios controla su propia opacidad en ServicesSection.vue)
  ScrollTrigger.create({
    trigger: "#inspecciones-tributarias",
    start: "top 80%",
    endTrigger: "#consultoria-economica",
    end: "bottom 20%",
    onToggle: self => {
      gsap.to(".global-watermark", { 
        opacity: self.isActive ? 0.16 : 0, 
        duration: 0.4, 
        overwrite: "auto" 
      })
    }
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => {
    if (st.vars.trigger === "#inspecciones-tributarias") {
      st.kill()
    }
  })
})
</script>

<style scoped>
main {
  position: relative;
  z-index: 10;
}

#inicio {
  background-color: transparent; 
  transition: background-color 0.8s ease;
}

section {
  position: relative;
}
</style>
