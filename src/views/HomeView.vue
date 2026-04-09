<template>
  <div class="has-canvas-bg">
    <CanvasVideoBackground />
    <TheNavbar />
    <main>
      <!-- Inicio -->
      <div id="inicio" class="dark-transition-bg">
        <HeroSection />
        <ServicesSection :show-cta="false" />
        <OrdenanzasSection :show-cta="false" />
        <BannerSection />
        <StatsSection />
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
import BannerSection   from '@/components/sections/BannerSection.vue'
import StatsSection    from '@/components/sections/StatsSection.vue'

// New content components
import AboutContent        from '@/components/sections/AboutContent.vue'
import InspeccionesContent from '@/components/sections/InspeccionesContent.vue'
import JuridicaContent     from '@/components/sections/JuridicaContent.vue'
import TecnicaContent      from '@/components/sections/TecnicaContent.vue'
import EconomicaContent    from '@/components/sections/EconomicaContent.vue'
import ContactoContent     from '@/components/sections/ContactoContent.vue'
import CanvasVideoBackground from '@/components/CanvasVideoBackground.vue'

const { t } = useI18n()
</script>

<style scoped>
#inicio {
  background-color: transparent; /* Quitamos !important para permitir la animación de GSAP */
  transition: background-color 0.8s ease;
}

section {
  position: relative;
}
</style>
