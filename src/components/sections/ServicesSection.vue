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

    <!-- Fase 2: Identidad y Estadísticas -->
    <div class="container services__identity-overlay" id="identidad">
      <div class="identity__grid">
        <div class="identity__text">
          <span class="section__label">{{ t('home_page.about.label') }}</span>
          <h2 class="section__title">{{ t('home_page.about.title') }}</h2>
          <span class="divider"></span>
          <p v-for="(p, index) in tm('home_page.about.paragraphs')" :key="index">{{ p }}</p>
        </div>

        <div class="identity__visual">
          <canvas 
            ref="identityCanvasRef"
            class="identity__canvas"
          ></canvas>
        </div>
      </div>

      <!-- Estadísticas integradas (Restauradas debajo del grid completo) -->
      <div class="identity__stats">
        <div v-for="(stat, index) in parsedStats" :key="index" class="identity-stat">
          <div class="identity-stat__number" :data-target="stat.numeric" :data-suffix="stat.suffix">{{ displayedIdentityStats[index] }}</div>
          <div class="identity-stat__label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- Fase 3: Banner Informativo IAE (Capa independiente) -->
    <div class="container services__banner-overlay" id="banner-fase3">
      <div class="banner-dynamic">
        <span class="banner-dynamic__label">{{ t('banner.label') }}</span>
        <h2 class="banner-dynamic__title">{{ t('banner.title') }}</h2>
        <span class="divider divider--center"></span>
        <div class="banner-dynamic__text">
          <p v-for="(p, index) in tm('banner.paragraphs')" :key="index">{{ p }}</p>
        </div>
      </div>
    </div>

    <!-- Fase 4: Ordenanzas y Regularizaciones (A lo último de todo) -->
    <div class="container services__ordenanzas-overlay" id="banner-fase4">
      <div class="banner-dynamic">
        <span class="banner-dynamic__label">{{ t('ordenanzas.label') }}</span>
        <h2 class="banner-dynamic__title">{{ t('ordenanzas.title') }}</h2>
        <span class="divider divider--center"></span>
        <div class="banner-dynamic__grid">
          <div class="banner-dynamic__text">
            <p>{{ t('ordenanzas.text') }}</p>
          </div>
          <ul class="banner-dynamic__list">
            <li v-for="(item, index) in tm('ordenanzas.items')" :key="index">
              <span class="dot"></span> {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScroll } from '../../composables/useScroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const identityCanvasRef = ref(null)
const identityImages = []
const identityPlayhead = { frame: 0 }
const H4_FRAME_COUNT = 79

const { t, tm, locale } = useI18n()
const { scrollTo } = useScroll()

let backgroundTween = null
let masterTl = null

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

// Datos para las estadísticas
const rawStats = computed(() => tm('stats'))
const parsedStats = computed(() =>
  rawStats.value.map((item) => {
    const raw = String(item.value)
    const compact = raw.toUpperCase().includes('K')
    const suffix = raw.includes('%') ? '%' : ''
    const numericBase = Number(raw.replace(/[^\d]/g, '')) || 0
    const numeric = compact ? numericBase * 1000 : numericBase
    const prefix = '+'

    return {
      ...item,
      numeric,
      compact,
      suffix,
      prefix
    }
  })
)

const displayedIdentityStats = ref([])

function formatStatDisplay(stat, numericValue) {
  let displayVal = Math.floor(numericValue)

  if (stat.compact) {
    displayVal = displayVal >= 1000 ? '1K' : displayVal
  }

  return `${stat.prefix}${displayVal}${stat.suffix}`
}

function resetIdentityStats() {
  displayedIdentityStats.value = parsedStats.value.map((stat) => `${stat.prefix}0${stat.suffix}`)
}

resetIdentityStats()



// Lógica de precarga para el Canvas de h4 (61 frames)
const preloadIdentityFrames = () => {
  for (let i = 1; i <= H4_FRAME_COUNT; i++) {
    const img = new Image()
    img.src = `/frames/h4/frame_${String(i).padStart(4, '0')}.webp`
    if (i === 1) {
      img.onload = () => renderIdentityFrame(0)
    }
    identityImages.push(img)
  }
}

const renderIdentityFrame = (index) => {
  const canvas = identityCanvasRef.value
  if (!canvas || !identityImages[index]) return
  
  const ctx = canvas.getContext('2d', { alpha: false })
  const img = identityImages[index]
  
  if (!img.complete) return

  const canvasAspect = canvas.width / canvas.height
  const imgAspect = img.width / img.height
  
  let drawWidth, drawHeight, drawX, drawY
  
  if (canvasAspect > imgAspect) {
    drawWidth = canvas.width
    drawHeight = canvas.width / imgAspect
    drawX = 0
    drawY = (canvas.height - drawHeight) / 2
  } else {
    drawWidth = canvas.height * imgAspect
    drawHeight = canvas.height
    drawX = (canvas.width - drawWidth) / 2
    drawY = 0
  }
  
  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
}

const resizeIdentityCanvas = () => {
  if (identityCanvasRef.value) {
    const canvas = identityCanvasRef.value
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    renderIdentityFrame(Math.round(identityPlayhead.frame))
  }
}

onMounted(() => {
  resetIdentityStats()
  preloadIdentityFrames()
  window.addEventListener('resize', resizeIdentityCanvas)
  setTimeout(resizeIdentityCanvas, 100)

  // 1. Transición de fondo
  backgroundTween = gsap.to("#inicio", {
    backgroundColor: "#10203a",
    scrollTrigger: {
      trigger: ".section-servicios-trigger",
      start: "top 20%",
      end: "top top",
      scrub: true
    }
  })

  // 2. TIMELINE - Triple Swap Cinematic Animation (Estandarizada)
  masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-servicios-trigger",
      start: "top top",
      end: "+=4500", // Aumentado para asegurar el scroll completo de frames
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (self.progress > 0.20 && self.progress < 0.40) {
          animateNumbers()
        }
      }
    }
  })

  const cards = gsap.utils.toArray(".service-card")

  // FASE 1: Títulos y Tarjetas (Lectura inicial hasta t=2.0)
  masterTl.fromTo(".services-header .section__label, .services-main-title, .services-main-subtitle", 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" }
  )

  cards.forEach((card, index) => {
    masterTl.from(card, {
      y: 100,
      opacity: 0,
      rotateX: -15,
      duration: 1.2,
      ease: "power2.out"
    }, `-=${index === 0 ? 0.4 : 0.8}`)
  })
  
  // TRANSICIÓN 1 -> 2 (t=3.0 -> t=4.5)
  const t1to2 = 3.0;
  
  // Entrada Fase 2
  masterTl.fromTo(".services__identity-overlay", 
    { opacity: 0, y: 50, visibility: "hidden" }, 
    { opacity: 1, y: 0, visibility: "visible", zIndex: 10, duration: 1.5, ease: "power2.out" },
    t1to2
  )
  .fromTo(".identity__text .section__label, .identity__text .section__title, .identity__text .divider, .identity__text p, .identity__visual, .identity__stats",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" },
    t1to2 + 0.5
  )

  // Sincronización del VIDEO h4 (Frames) - Se completa antes de pasar a Fase 3
  masterTl.to(identityPlayhead, {
    frame: H4_FRAME_COUNT - 1,
    duration: 5.0, // Gran espacio para asegurar el scroll total sin prisas
    ease: "none",
    onUpdate: () => renderIdentityFrame(Math.round(identityPlayhead.frame))
  }, t1to2 + 0.8)

  // Salida Fase 1
  .to(".services__grid-wrapper", { 
    opacity: 0, y: -100, filter: "blur(14px)", duration: 1.0
  }, t1to2 + 0.1)
  .to(".services-header", { 
    opacity: 0, y: -80, duration: 0.8 
  }, t1to2 + 0.2)

  // FASE 2 STILL (Lectura rápida hasta t=4.2)


  // TRANSICIÓN 2 -> 3 (t=10.0 -> t=11.5)
  const t2to3 = 10.0;

  // Entrada Fase 3
  masterTl.fromTo(".services__banner-overlay",
    { opacity: 0, y: 60, visibility: "visible", zIndex: 1 },
    { opacity: 1, y: 0, zIndex: 12, duration: 1.2, ease: "power2.out" },
    t2to3
  )
  .fromTo(".banner-dynamic__label, .banner-dynamic__title, .divider--center, .banner-dynamic__text p",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power2.out" },
    t2to3 + 0.2
  )

  // Salida Fase 2
  .to(".services__identity-overlay", {
    opacity: 0, y: -40, filter: "blur(12px)", duration: 1.2, zIndex: 1, visibility: "hidden"
  }, t2to3 + 0.1);

  // FASE 3 STILL (Lectura rápida hasta t=6.4)


  // TRANSICIÓN 3 -> 4 (t=14.0 -> t=15.5)
  const t3to4 = 14.0;

  // Entrada Fase 4
  masterTl.fromTo(".services__ordenanzas-overlay",
    { opacity: 0, y: 60, visibility: "visible", zIndex: 1 },
    { opacity: 1, y: 0, zIndex: 13, duration: 1.2, ease: "power2.out" },
    t3to4
  )
  .fromTo(".services__ordenanzas-overlay .banner-dynamic__label, .services__ordenanzas-overlay .banner-dynamic__title, .services__ordenanzas-overlay .divider--center, .services__ordenanzas-overlay .banner-dynamic__grid",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power2.out" },
    t3to4 + 0.2
  )

  // Salida Fase 3
  .to(".services__banner-overlay", {
    opacity: 0, y: -40, filter: "blur(12px)", duration: 1.2, zIndex: 1, visibility: "hidden"
  }, t3to4 + 0.1)
  
  .to(".services__ordenanzas-overlay", { opacity: 0, duration: 0.8, y: -50 }, 16.5);

})

watch(locale, async () => {
  numbersAnimated = false
  resetIdentityStats()

  await nextTick()

  const identityOverlay = document.querySelector('.services__identity-overlay')
  if (!identityOverlay) return

  const style = window.getComputedStyle(identityOverlay)
  const isIdentityVisible = style.visibility !== 'hidden' && style.opacity !== '0'

  if (isIdentityVisible) {
    gsap.set(
      '.identity__text .section__label, .identity__text .section__title, .identity__text .divider, .identity__text p, .identity__visual, .identity__stats',
      { opacity: 1, y: 0 }
    )
    animateNumbers()
  }
})

onBeforeUnmount(() => {
  backgroundTween?.scrollTrigger?.kill()
  backgroundTween?.kill()

  masterTl?.scrollTrigger?.kill()
  masterTl?.kill()

  gsap.set("#inicio", { clearProps: "backgroundColor" })

  numbersAnimated = false
})

let numbersAnimated = false
function animateNumbers() {
  if (numbersAnimated) return
  numbersAnimated = true

  parsedStats.value.forEach((stat, index) => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: stat.numeric,
      duration: 2.5,
      ease: "power2.out",
      onUpdate: () => {
        displayedIdentityStats.value[index] = formatStatDisplay(stat, obj.val)
      }
    })
  })
}
</script>

<style scoped>
.section-servicios-trigger {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-bg-main); 
}

.services-header {
  padding-top: 50px; /* Bajamos los títulos según petición */
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
  margin-top: 25px; /* Subimos aún más las tarjetas según petición */
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

/* Estilos de la nueva sección de Identidad y Estadísticas */
.services__identity-overlay {
  position: absolute;
  top: 56%; /* Bajado del 50% al 56% según feedback para que se sienta centrado */
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Aún más compacto */
}

.identity__stats {
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  margin: 45px auto 0; /* Ajustado para mantener separación sin exceder la altura de la pantalla */
  width: 100%;
  gap: 20px;
}

.identity-stat {
  flex: 1;
  text-align: center;
  padding: 24px 16px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  transition: transform 0.3s ease, border-color 0.3s ease;
  min-width: 180px;
}

.identity-stat:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
}

.identity-stat__number {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--color-accent-light);
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
}

.identity-stat__label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.identity__grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr; /* Volvemos a dar importancia al texto para no estirar tanto el alto */
  gap: 60px;
  align-items: center;
}

.identity__text {
  text-align: start;
}

.identity__text .section__title {
  color: #ffffff;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  margin-bottom: 20px;
  opacity: 0; /* Asegurar que GSAP tome el control */
}

.identity__text p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 16px;
  opacity: 0;
}

.identity__canvas {
  width: 100%;
  height: 450px; /* Tamaño equilibrado que no desplaza el centro visual hacia abajo */
  display: block;
  border-radius: var(--radius-lg);
  box-shadow: 0 25px 60px rgba(0,0,0,0.4);
}

.divider {
  display: block;
  width: 60px;
  height: 3px;
  background: var(--color-accent);
  margin: 16px 0 24px;
}

@media (max-width: 1024px) {
  .identity__stats {
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
  }
}

@media (max-width: 900px) {
  .identity__grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .services__identity-overlay {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    padding: 60px 0;
  }
}

.service-card {
  display: flex;
  flex-direction: column;
  background: #ffffff !important;
  border: 1px solid rgba(32, 59, 99, 0.1);
  padding: 34px 28px;
  border-radius: var(--radius-lg);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              background 0.3s ease, 
              border-color 0.3s ease,
              box-shadow 0.3s ease;
  text-decoration: none;
  color: var(--color-navy) !important;
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
  color: #1a335a !important;
  margin-bottom: 12px;
  line-height: 1.3;
}

.service-card__desc {
  font-size: 0.92rem;
  color: #315784 !important;
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

/* Estilos del Banner Dinámico Integrado */
.services__banner-overlay {
  position: absolute;
  top: 54%; /* Bajamos también el banner un poco más para que sea coherente con la fase anterior */
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 900px;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
  text-align: center;
}

.banner-dynamic__label {
  display: inline-block;
  color: var(--color-accent);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.banner-dynamic__title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 24px;
}

.banner-dynamic__text p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.05rem;
  line-height: 1.9;
  max-width: 800px;
  margin: 0 auto;
}

.divider--center {
  margin: 24px auto 32px;
}

/* Estilos específicos para la Fase 4 */
.services__ordenanzas-overlay {
  position: absolute;
  top: 54%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1100px;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
  text-align: center;
}

.banner-dynamic__grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  align-items: center;
  text-align: start;
  margin-top: 20px;
}

.banner-dynamic__list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 30px;
}

.banner-dynamic__list li {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.92rem;
  display: flex;
  align-items: center;
  gap: 12px;
}

.banner-dynamic__list .dot {
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  border-radius: 50%;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .banner-dynamic__grid {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }
  
  .banner-dynamic__list {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
    text-align: start;
  }
}
</style>
