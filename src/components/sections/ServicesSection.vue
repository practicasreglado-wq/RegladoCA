<template>
  <section class="section section--light section-servicios-trigger">
    <div class="container text-center">
      <span class="section__label">{{ t('services.label') }}</span>
      <div class="section__reveal-container">
        <h2 class="section__title">{{ t('services.title') }}</h2>
      </div>
      <div class="section__reveal-container">
        <p class="section__subtitle">{{ t('services.subtitle') }}</p>
      </div>
      <a v-if="showCta" href="/#contacto" @click.prevent="scrollTo('contacto')" class="btn btn--contact">{{ t('services.cta') }}</a>
    </div>

    <div class="container services__grid">
      <a
        v-for="(service, i) in services"
        :key="i"
        :href="service.route"
        @click.prevent="handleServiceClick(service.route)"
        class="service-card"
      >
        <div class="service-card__icon" v-html="getIcon(service.icon)"></div>
        <h3 class="service-card__title">{{ service.title }}</h3>
        <p class="service-card__desc">{{ service.description }}</p>
        <span class="service-card__link">{{ t('services.more') }}</span>
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScroll } from '../../composables/useScroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { t, tm } = useI18n()
const { scrollTo } = useScroll()

function handleServiceClick(route) {
    if (route.startsWith('/#')) {
        scrollTo(route.substring(2))
    } else if (route.startsWith('#')) {
        scrollTo(route.substring(1))
    } else if (route === '/contacto') {
        scrollTo('contacto')
    } else {
        // External or other route handling if needed
        scrollTo(route.replace(/^\//, ''))
    }
}

defineProps({
  showCta: { type: Boolean, default: true }
})

const icons = {
  inspecciones: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`,
  juridica: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
  economica: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`,
  tecnica: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
}

function getIcon(key) {
  return icons[key] || ''
}

const routes = [
  '/inspecciones-tributarias',
  '/consultoria-juridica',
  '/consultoria-economica',
  '/consultoria-tecnica'
]

const services = computed(() =>
  tm('services.items').map((item, i) => ({
    ...item,
    route: routes[i] || '#'
  }))
)

onMounted(() => {
  // 1. Transición de fondo: Empieza mucho más tarde (cuando la sección está bien entrada)
  gsap.to("#inicio", {
    backgroundColor: "#10203a",
    scrollTrigger: {
      trigger: ".section-servicios-trigger",
      start: "top 5%", // Empieza casi al llegar arriba
      end: "bottom top", 
      scrub: true
    }
  })

  // 2. Secuencia de REVELADO: Título (Desde arriba) -> Subtítulo (Desde abajo)
  const tlReveal = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-servicios-trigger",
      start: "top 90%",
      toggleActions: "play none none none"
    }
  })

  tlReveal.fromTo(".section__title", 
    { 
      y: "-110%", 
      opacity: 0,
      filter: "blur(10px)"
    },
    {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      duration: 2.5, // Duración aumentada para mayor dramatismo
      ease: "expo.out"
    }
  )
  .fromTo(".section__subtitle", 
    { 
      y: "110%", 
      opacity: 0,
      filter: "blur(10px)"
    },
    {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      duration: 2.5,
      ease: "expo.out"
    },
    "-=2.1" // "Un instante después" (solapamiento casi total pero con inicio retrasado)
  )

  // 3. Timeline para el anclado y las tarjetas (empieza en top top)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-servicios-trigger",
      start: "top top",
      end: "+=2200", 
      pin: true,
      scrub: 1,
      anticipatePin: 1
    }
  })

  // Solo las tarjetas viven en el anclado
  const cards = gsap.utils.toArray(".service-card")
  cards.forEach((card, index) => {
    tl.from(card, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, index * 0.8) 
  })
})
</script>

<style scoped>
.section-servicios-trigger {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-bg-main); 
}

.section__reveal-container {
  overflow: hidden;
  display: block;
  width: 100%;
}

.section__title, .section__subtitle {
  opacity: 0; /* Asegurar que no hay flash antes de GSAP */
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap);
  margin-top: 56px;
}

@media (max-width: 1024px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services__grid {
    grid-template-columns: 1fr;
  }
}

.service-card {
  display: flex;
  flex-direction: column;
  background: #ffffff !important; /* Forzado blanco */
  border: 1px solid rgba(32, 59, 99, 0.1);
  padding: 34px 28px;
  border-radius: var(--radius-lg);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              background 0.3s ease, 
              border-color 0.3s ease,
              box-shadow 0.3s ease;
  text-decoration: none;
  color: var(--color-navy) !important; /* Forzado azul oscuro */
  height: 100%; 
  min-height: 400px; 
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(16, 32, 58, 0.08);
}

.service-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(77, 121, 184, 0.05), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.service-card:hover {
  transform: translateY(-12px);
  background: var(--color-bg-light);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-lg);
}

.service-card:hover::after {
  opacity: 1;
}

.service-card__icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: #cbd5e1 !important;
  color: #10203a;
  margin-bottom: 24px;
  transition: transform 0.3s ease;
}

.service-card__icon :deep(svg) {
  width: 28px;
  height: 28px;
  opacity: 1;
}

.service-card__title {
  font-family: var(--font-heading);
  font-size: 1.18rem;
  color: #1a335a !important; /* Azul más intenso */
  margin-bottom: 12px;
  line-height: 1.3;
}

.service-card__desc {
  font-size: 0.92rem;
  color: #315784 !important; /* Azul intermedio forzado */
  line-height: 1.8;
  margin-bottom: 20px;
}

.service-card__link {
  display: inline-flex;
  margin-top: auto;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: 0.04em;
  transition: color var(--transition);
}

.service-card:hover .service-card__link {
  color: var(--color-accent-dark);
}
</style>
