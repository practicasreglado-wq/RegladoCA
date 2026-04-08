<template>
  <section class="hero" :style="{ '--hero-image': `url(${heroImage})` }">
    <div class="hero__media" aria-hidden="true"></div>
    <div class="hero__bg-overlay" aria-hidden="true"></div>

    <div class="container hero__shell">
      <div class="hero__content">
        <aside class="hero__sidebar" aria-label="Contexto">
          <span class="hero__intro-line" aria-hidden="true"></span>
          <p class="hero__eyebrow">Reglado . Consultores & Abogados</p>
          <span class="hero__intro-line" aria-hidden="true"></span>
        </aside>

        <div class="hero__main">
          <h1 class="hero__title">
            {{ t('hero.title') }}
            <span class="hero__highlight">{{ t('hero.title_highlight') }}</span>
          </h1>

          <div class="hero__actions">
            <a href="/#contacto" @click.prevent="scrollTo('contacto')" class="btn btn--primary btn--contact btn--lg hero__cta">
              {{ t('hero.cta') }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span class="hero__scroll-line"></span>
      <span class="hero__scroll-text">Scroll</span>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import heroImage from '../../../media/image-section-82-min.jpg'
import { useScroll } from '../../composables/useScroll'

const { t } = useI18n()
const { scrollTo } = useScroll()
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
  background-image: var(--hero-image);
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
  animation: heroMediaDrift 18s ease-in-out infinite alternate;
}

.hero__bg-overlay {
  background:
    linear-gradient(90deg, rgba(16, 32, 58, 0.94) 0%, rgba(16, 32, 58, 0.86) 38%, rgba(16, 32, 58, 0.5) 100%),
    linear-gradient(180deg, rgba(77, 121, 184, 0.12), transparent 45%),
    radial-gradient(circle at 85% 24%, rgba(220, 232, 247, 0.18), transparent 24%);
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
  transform: translate3d(0, 34px, 0);
  animation: heroFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
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

.hero__scroll {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0;
  animation: heroScrollIn 0.9s ease forwards 1s;
}

.hero__scroll-line {
  width: 1px;
  height: 44px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.72));
  animation: heroScrollPulse 1.8s ease-in-out infinite;
}

.hero__scroll-text {
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
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

@keyframes heroScrollIn {
  from {
    opacity: 0;
    transform: translate3d(-50%, 12px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
  }
}

@keyframes heroScrollPulse {
  0%,
  100% {
    transform: scaleY(1);
    opacity: 0.7;
  }

  50% {
    transform: scaleY(0.7);
    opacity: 1;
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

  .hero__scroll {
    bottom: 18px;
  }
}
</style>
