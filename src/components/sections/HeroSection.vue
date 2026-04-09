<template>
  <section class="hero" :style="{ '--hero-image': `url(${heroImage})` }">
    <div class="hero__media" aria-hidden="true"></div>
    <div class="hero__bg-overlay" aria-hidden="true"></div>

    <div class="container hero__shell">
      <div class="hero__content">
        <aside class="hero__sidebar" aria-label="Contexto">
          <span class="hero__intro-line" aria-hidden="true"></span>
          <div class="hero__reveal-sidebar">
            <p class="hero__eyebrow">{{ t('hero.eyebrow') }}</p>
          </div>
          <span class="hero__intro-line" aria-hidden="true"></span>
        </aside>

        <div class="hero__main">
          <div class="hero__reveal-title">
            <h1 class="hero__title">
              {{ t('hero.title') }}
              <span class="hero__highlight">{{ t('hero.title_highlight') }}</span>
            </h1>
          </div>

          <div class="hero__reveal-subtitle">
            <p class="hero__subtitle">
              {{ t('hero.subtitle') }}
            </p>
          </div>

          <div class="hero__actions">
            <a href="/#contacto" @click.prevent="scrollTo('contacto')" class="btn btn--primary btn--contact btn--lg hero__cta">
              {{ t('hero.cta') }}
            </a>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import heroImage from '../../../media/image-section-82-min.jpg'
import { useScroll } from '../../composables/useScroll'

const { t } = useI18n()
const { scrollTo } = useScroll()

onMounted(() => {
  const tl = gsap.timeline({ 
    defaults: { ease: "expo.out", duration: 1.5 } 
  })

  // Secuencia de entrada: sidebar -> titulo -> subtitulo -> acciones
  tl.fromTo(".hero__eyebrow", 
    { y: "100%", opacity: 0 }, 
    { y: "0%", opacity: 1, delay: 0.6 }
  )
  .fromTo(".hero__title", 
    { y: "60%", opacity: 0 }, 
    { y: "0%", opacity: 1 }, 
    "-=1.1"
  )
  .fromTo(".hero__subtitle", 
    { y: "40%", opacity: 0 }, 
    { y: "0%", opacity: 1 }, 
    "-=1.2"
  )
  .fromTo(".hero__actions", 
    { opacity: 0, scale: 0.95 }, 
    { opacity: 1, scale: 1 }, 
    "-=1.3"
  )
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 132px 0 88px;
  isolation: isolate;
}

.hero__media,
.hero__bg-overlay {
  position: absolute;
  inset: 0;
}

.hero__media {
  background: transparent !important;
}

.hero__bg-overlay {
  background: transparent !important;
}

.hero__shell {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: none;
  margin: 0;
  padding-left: clamp(1.2rem, 3vw, 2.4rem);
  padding-right: 24px;
}

.hero__content {
  max-width: 1220px;
  display: grid;
  grid-template-columns: 72px minmax(0, 920px);
  gap: 28px;
  align-items: start;
  padding-inline-start: 0;
  margin-left: 0;
}

.hero__sidebar,
.hero__title,
.hero__actions {
  opacity: 0;
  /* Animación eliminada a favor de GSAP */
}

.hero__sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding-top: 0.4rem;
  animation-delay: 0.12s;
}

.hero__intro-line {
  width: 1px;
  height: 68px;
  background: rgba(220, 232, 247, 0.72);
  flex: 0 0 auto;
}

.hero__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero__eyebrow,
.hero__title,
.hero__actions {
  margin: 0;
}

.hero__eyebrow {
  color: var(--color-accent-light);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
}

.hero__title {
  font-family: var(--font-heading);
  font-size: clamp(1.42rem, 2.55vw, 2.9rem);
  color: var(--color-white);
  line-height: 1.18;
  margin-bottom: 18px;
  max-width: 980px;
  animation-delay: 0.28s;
}

.hero__highlight {
  color: var(--color-accent-light);
}

.hero__actions {
  display: flex;
  gap: 16px;
  margin-top: 42px;
  animation-delay: 0.46s;
}

.hero__cta {
  box-shadow: 0 18px 40px rgba(32, 59, 99, 0.22);
}

.hero__subtitle {
  font-size: clamp(1rem, 1.2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.82);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 0;
}

.hero__reveal-sidebar,
.hero__reveal-title,
.hero__reveal-subtitle {
  overflow: hidden;
  width: 100%;
}

.hero__reveal-sidebar {
  display: flex;
  justify-content: center;
}

[dir="rtl"] .hero__content {
  grid-template-columns: 84px minmax(0, 920px);
  text-align: right;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translate3d(0, 34px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes heroMediaDrift {
  from {
    transform: scale(1.02) translate3d(0, 0, 0);
  }

  to {
    transform: scale(1.08) translate3d(-1.5%, 0.8%, 0);
  }
}


@media (max-width: 900px) {
  .hero {
    min-height: auto;
    padding: 118px 0 80px;
  }

  .hero__shell {
    padding-left: 24px;
    padding-right: 24px;
  }

  .hero__content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .hero__title {
    max-width: 760px;
    font-size: clamp(1.42rem, 4.9vw, 2.3rem);
  }

  .hero__intro-line {
    width: 44px;
    height: 1px;
  }

  .hero__sidebar {
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding-top: 0;
  }

  .hero__eyebrow {
    writing-mode: initial;
    transform: none;
    white-space: normal;
  }
}

@media (max-width: 768px) {
  .hero__media {
    background-position: 72% center;
  }

  .hero__actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
