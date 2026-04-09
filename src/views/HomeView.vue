<template>
  <div>
    <TheNavbar />
    <main>
      <!-- Inicio -->
      <div id="inicio">
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
import OrdenanzasSection from '@/components/sections/OrdenanzasSection.vue'

// New content components
import AboutContent        from '@/components/sections/AboutContent.vue'
import InspeccionesContent from '@/components/sections/InspeccionesContent.vue'
import JuridicaContent     from '@/components/sections/JuridicaContent.vue'
import TecnicaContent      from '@/components/sections/TecnicaContent.vue'
import EconomicaContent    from '@/components/sections/EconomicaContent.vue'
import ContactoContent     from '@/components/sections/ContactoContent.vue'

const { t } = useI18n()
</script>

<style scoped>
/* Ensure each section has clear boundaries if needed, 
   though the components themselves carry their original padding */
section {
  position: relative;
}
</style>
