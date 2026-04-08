<template>
  <section class="section section--light" id="servicios">
    <div class="container text-center">
      <span class="section__label">{{ t('services.label') }}</span>
      <h2 class="section__title">{{ t('services.title') }}</h2>
      <p class="section__subtitle">{{ t('services.subtitle') }}</p>
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
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScroll } from '../../composables/useScroll'

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
</script>

<style scoped>
.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--gap);
  margin-top: 56px;
}

.service-card {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #3c5f8e 0%, #29496f 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 34px 28px;
  border-radius: var(--radius-lg);
  transition: box-shadow var(--transition), transform var(--transition);
  text-decoration: none;
  color: inherit;
  min-height: 300px;
  box-shadow: var(--shadow-sm);
}

.service-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-5px);
}

.service-card__icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 1.6rem;
  margin-bottom: 20px;
  line-height: 1;
}

.service-card__icon :deep(svg) {
  width: 28px;
  height: 28px;
  color: var(--color-white);
}

.service-card__title {
  font-family: var(--font-heading);
  font-size: 1.18rem;
  color: var(--color-white);
  margin-bottom: 12px;
  line-height: 1.3;
}

.service-card__desc {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.8;
  margin-bottom: 20px;
}

.service-card__link {
  display: inline-flex;
  margin-top: auto;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-accent-light);
  letter-spacing: 0.04em;
  transition: color var(--transition);
}

.service-card:hover .service-card__link {
  color: var(--color-white);
}
</style>
