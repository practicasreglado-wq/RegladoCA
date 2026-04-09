<template>
  <section class="section section--light section-servicios-trigger">
    <div class="container text-center services-header">
      <span class="section__label">{{ t('services.label') }}</span>
      <div class="section__reveal-container">
        <h2 class="section__title services-main-title">{{ t('services.title') }}</h2>
      </div>
      <div class="section__reveal-container">
        <p class="section__subtitle services-main-subtitle">{{ t('services.subtitle') }}</p>
      </div>
      <a v-if="showCta" href="/#contacto" @click.prevent="scrollTo('contacto')" class="btn btn--contact">{{ t('services.cta') }}</a>
    </div>

    <div class="container services__grid-wrapper">
      <div class="services__grid">
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
    </div>

    <!-- Nueva parte integrada de Ordenanzas -->
    <div class="container services__ord-overlay" id="ordenanzas">
      <div class="ord__grid">
        <div class="ord__text">
          <span class="section__label">{{ t('ordenanzas.label') }}</span>
          <h2 class="section__title ordenanzas-main-title">{{ t('ordenanzas.title') }}</h2>
          <span class="divider"></span>

          <ul class="ord__list">
            <li v-for="item in ordenanzasItems" :key="item">{{ item }}</li>
          </ul>

          <p class="ord__description">{{ t('ordenanzas.text') }}</p>
        </div>

        <div class="ord__visual">
          <img :src="ordenanzasImage" alt="Revision documental y ordenanzas fiscales" />
        </div>
      </div>
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
import ordenanzasImage from '../../../media/image-section-17-min-e1654644050436.jpg'

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

const ordenanzasItems = computed(() => tm('ordenanzas.items'))

onMounted(() => {
  // 1. Transición de fondo
  gsap.to("#inicio", {
    backgroundColor: "#10203a",
    scrollTrigger: {
      trigger: ".section-servicios-trigger",
      start: "top 20%",
      end: "top top",
      scrub: true
    }
  })

  // 2. MASTER TIMELINE - Conectada directamente a ScrollTrigger
  let isAssisting = false;

  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-servicios-trigger",
      start: "top top",
      end: "+=3800",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (isAssisting) return;
        const p = self.progress;

        // --- ASISTENCIA HACIA ABAJO (Hacia Ordenanzas) ---
        if (self.direction === 1 && p > 0.68) {
          isAssisting = true;
          gsap.to(window, {
            scrollTo: self.end,
            duration: 1.5,
            ease: "power2.inOut",
            onStart: () => {
              gsap.set(".services__grid-wrapper", { pointerEvents: "none" });
            },
            onComplete: () => { isAssisting = false; }
          });
        } 
        // --- ASISTENCIA HACIA ARRIBA (Hacia Tarjetas) ---
        // Al subir, scrolleamos hasta el 40% de la sección, lo que obliga a la línea de tiempo
        // a "des-recorrer" el stagger de las tarjetas una a una.
        else if (self.direction === -1 && p < 0.92 && p > 0.65) {
          isAssisting = true;
          gsap.to(window, {
            scrollTo: self.start + (self.end - self.start) * 0.45,
            duration: 1.2,
            ease: "power2.inOut",
            onStart: () => {
              gsap.set(".services__grid-wrapper", { pointerEvents: "auto", zIndex: 5 });
            },
            onComplete: () => { isAssisting = false; }
          });
        }
      }
    }
  })

  const cards = gsap.utils.toArray(".service-card")

  // FASE 1: Títulos y Tarjetas (0s -> 3s)
  masterTl.fromTo(".services-header .section__label, .services-main-title, .services-main-subtitle", 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
  )

  cards.forEach((card, index) => {
    masterTl.from(card, {
      y: 100,
      opacity: 0,
      rotateX: -15,
      duration: 1.2,
      ease: "power2.out"
    }, `-=${index === 0 ? 0.3 : 0.8}`)
  })
  
  // Espacio muerto para que las tarjetas se queden quietas un momento si el usuario scrollea manual
  masterTl.to({}, { duration: 0.5 })

  // FASE 2: Transición a Ordenanzas (3.5s -> 5s)
  const transStart = 3.5;
  
  masterTl.to(".services__grid-wrapper", { 
    opacity: 0, 
    y: -60, 
    filter: "blur(10px)", 
    duration: 1,
    onStart: () => {
      gsap.set(".services__ord-overlay", { visibility: "visible", zIndex: 10 });
    }
  }, transStart)
  .to(".services-header", { 
    opacity: 0, 
    y: -40, 
    duration: 0.8 
  }, transStart + 0.2)
  .fromTo(".services__ord-overlay", 
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1.5 },
    transStart + 0.4
  )
  .to(".ordenanzas-main-title", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
  }, transStart + 0.6)
})

</script>

<style scoped>
.section-servicios-trigger {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent; 
}

.section__reveal-container {
  overflow: hidden;
  display: block;
  width: 100%;
}

.section__title, .section__subtitle {
  opacity: 0; 
  transform: translateY(30px);
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap);
  margin-top: 100px; /* Aumentado para evitar solapamiento con títulos */
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

.services__grid-wrapper {
  position: relative;
  z-index: 2;
}

.services__ord-overlay {
  position: absolute;
  top: 55%; /* Ajustado para compensar el espacio del título superior que desaparece */
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
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
  background: var(--color-bg-section);
  font-size: 1.6rem;
  margin-bottom: 20px;
  line-height: 1;
}

.service-card__icon :deep(svg) {
  width: 28px;
  height: 28px;
  color: var(--color-accent);
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

/* Estilos Ordenanzas Integradas */
.ord__grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 68px;
  align-items: center;
}

.ord__list {
  margin: 24px 0 32px;
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style: none;
}

.ord__list li {
  padding: 12px 0 12px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.96rem;
  position: relative;
}

.ord__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 19px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 10px var(--color-accent);
}

.ord__description {
  color: rgba(255, 255, 255, 0.82);
  font-size: 1rem;
  margin-bottom: 32px;
  line-height: 1.75;
}

.ord__text .section__title {
  color: #ffffff;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  margin-bottom: 20px;
}

.ord__text .section__label {
  color: var(--color-accent-light);
  margin-bottom: 16px;
  display: block;
}

.ord__visual img {
  width: 100%;
  min-height: 520px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

.divider {
  display: block;
  width: 60px;
  height: 3px;
  background: var(--color-accent);
  margin: 16px 0 24px;
}

@media (max-width: 900px) {
  .ord__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .services__ord-overlay {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    padding: 60px 0;
  }

  .ord__visual img {
    min-height: 380px;
  }
}
</style>
