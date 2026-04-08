<template>
  <div class="about-content">
    <div class="page-hero" :style="{ '--hero-bg': `url(${aboutBg})` }">
      <div class="container">
        <p class="page-hero__label">{{ t('nav.about_label', 'Reglado Consultores') }}</p>
        <h1 class="page-hero__title">{{ t('nav.about') }}</h1>
        <p class="page-hero__subtitle">{{ t('about_page.hero.title') }}</p>
      </div>
    </div>

    <AboutSection :title="' '" :show-cta="false" />

    <section class="about-values">
      <div class="container about-values__header">
        <h2 class="section__title" v-html="t('about_page.truth_header.title').replace('Y La', '<br />Y La')">
        </h2>
        <span class="divider divider--center"></span>
      </div>
      <div class="container about-values__grid">
        <article v-for="item in tm('about_page.values')" :key="item.title" class="about-value-card">
          <h2>{{ item.title }}</h2>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section ref="metricsSection" class="about-law" :class="{ 'about-law--visible': metricsVisible }">
      <div class="container about-law__grid">
        <div class="about-law__content">
          <span class="section__label">{{ t('about_page.law_section.label') }}</span>
          <h2 class="section__title">{{ t('about_page.law_section.title') }}</h2>
          <span class="divider"></span>

          <div class="about-law__metrics">
            <div v-for="item in tm('about_page.metrics')" :key="item.label" class="about-law__metric">
              <div class="about-law__metric-head">
                <span>{{ item.label }}</span>
                <span class="about-law__metric-value">{{ item.value }}%</span>
              </div>
              <div class="about-law__bar">
                <span class="about-law__bar-fill" :style="{ '--target-width': `${item.value}%` }"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="about-law__visual">
          <img :src="ladyJustice" alt="Figura de la justicia" />
        </div>
      </div>
    </section>

    <section class="about-presence">
      <div class="container about-presence__grid">
        <div class="about-presence__content">
          <span class="section__label">{{ t('about_page.presence.label') }}</span>
          <h2 class="section__title">{{ t('about_page.presence.title') }}</h2>
          <span class="divider"></span>

          <p>{{ t('about_page.presence.description') }}</p>

          <div class="about-presence__highlights">
            <article
              v-for="item in tm('about_page.presence.highlights')"
              :key="item.title"
              class="about-presence__highlight"
            >
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>

        <div class="about-presence__map-card">
          <div class="about-presence__map-frame" aria-hidden="true">
            <div class="about-presence__map-grid"></div>
            <div class="about-presence__map-pin about-presence__map-pin--one"></div>
            <div class="about-presence__map-pin about-presence__map-pin--two"></div>
            <div class="about-presence__map-pin about-presence__map-pin--three"></div>
            <div class="about-presence__map-pin about-presence__map-pin--four"></div>
            <div class="about-presence__map-placeholder"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AboutSection from '@/components/sections/AboutSection.vue'
import aboutBg from '@media/image-section-82-min.jpg'
import ladyJustice from '@media/image-section-86-min.png'

const { t, tm } = useI18n()
const metricsVisible = ref(false)
const metricsSection = ref(null)
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry?.isIntersecting) {
        metricsVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.35 }
  )

  if (metricsSection.value) {
    observer.observe(metricsSection.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>


.about-law {
  padding: 24px 0 72px;
  background: var(--color-white);
}

.about-values {
  padding: 80px 0 60px;
  background: var(--color-white);
  text-align: center;
}

.about-values__header {
  margin-bottom: 54px;
}

.about-values__header .section__title {
  margin-bottom: 0;
}

.about-values__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: stretch;
}

.about-value-card {
  height: 100%;
  min-height: 320px;
  padding: 38px 30px 30px;
  border-radius: 14px;
  background: linear-gradient(180deg, #5e8ecf 0%, #4e7fc0 100%);
  color: var(--color-white);
  box-shadow: 0 20px 40px rgba(16, 32, 58, 0.14);
  display: flex;
  flex-direction: column;
}

.about-value-card h2 {
  margin: 0 0 20px;
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 400;
  color: var(--color-white);
  line-height: 1.25;
}

.about-value-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.88rem;
  line-height: 1.85;
}

.about-law__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.95fr);
  gap: 34px;
  align-items: stretch;
}

.about-law__content {
  padding: 26px 0 26px 6px;
}

.about-law__content .section__title {
  margin-bottom: 0;
  max-width: 640px;
}

.about-law__metrics {
  display: grid;
  gap: 22px;
  max-width: 680px;
}

.about-law__metric {
  display: grid;
  gap: 8px;
}

.about-law__metric-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  color: var(--color-navy);
  font-size: 0.92rem;
}

.about-law__metric-value {
  opacity: 0;
  transform: translateY(10px);
}

.about-law--visible .about-law__metric:nth-child(1) .about-law__metric-value,
.about-law--visible .about-law__metric:nth-child(1) .about-law__bar-fill {
  animation-duration: 0.7s, 1.2s;
  animation-delay: 0.15s;
}

.about-law--visible .about-law__metric:nth-child(2) .about-law__metric-value,
.about-law--visible .about-law__metric:nth-child(2) .about-law__bar-fill {
  animation-duration: 0.7s, 1.2s;
  animation-delay: 0.3s;
}

.about-law--visible .about-law__metric:nth-child(3) .about-law__metric-value,
.about-law--visible .about-law__metric:nth-child(3) .about-law__bar-fill {
  animation-duration: 0.7s, 1.2s;
  animation-delay: 0.45s;
}

.about-law--visible .about-law__metric:nth-child(4) .about-law__metric-value,
.about-law--visible .about-law__metric:nth-child(4) .about-law__bar-fill {
  animation-duration: 0.7s, 1.2s;
  animation-delay: 0.6s;
}

.about-law__bar {
  position: relative;
  width: 100%;
  height: 22px;
  background: linear-gradient(90deg, rgba(77, 121, 184, 0.34), rgba(77, 121, 184, 0.22));
  box-shadow: inset 0 0 0 1px rgba(32, 59, 99, 0.08);
  border-radius: 999px;
  overflow: hidden;
}

.about-law__bar-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #5f8ccd 0%, #4775b8 80%, #284a7c 100%);
  width: 0;
}

.about-law--visible .about-law__metric-value {
  animation-name: metricValueIn;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

.about-law--visible .about-law__bar-fill {
  animation-name: metricBarGrow;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes metricBarGrow {
  from {
    width: 0;
    opacity: 0.6;
  }

  to {
    width: var(--target-width);
    opacity: 1;
  }
}

@keyframes metricValueIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-law__visual {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.about-law__visual img {
  width: min(108%, 790px);
  max-height: 620px;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
}

.about-presence {
  padding: 22px 0 90px;
  background:
    radial-gradient(circle at top left, rgba(94, 142, 207, 0.1), transparent 34%),
    linear-gradient(180deg, #f7f9fc 0%, #eef3f9 100%);
}

.about-presence__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(420px, 1.1fr);
  gap: 34px;
  align-items: stretch;
}

.about-presence__content,
.about-presence__map-card {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 24px 60px rgba(16, 32, 58, 0.1);
  backdrop-filter: blur(12px);
}

.about-presence__content {
  padding: 42px;
}

.about-presence__content .section__title {
  margin-bottom: 0;
  max-width: 14ch;
}

.about-presence__content > p {
  margin: 0 0 30px;
  max-width: 64ch;
  color: rgba(16, 32, 58, 0.82);
  line-height: 1.85;
}

.about-presence__highlights {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.about-presence__highlight {
  padding: 22px 20px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(94, 142, 207, 0.12), rgba(40, 74, 124, 0.06));
  border: 1px solid rgba(71, 117, 184, 0.14);
}

.about-presence__highlight h3 {
  margin: 0 0 10px;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--color-navy);
  line-height: 1.3;
}

.about-presence__highlight p {
  margin: 0;
  color: rgba(16, 32, 58, 0.78);
  font-size: 0.94rem;
  line-height: 1.7;
}

.about-presence__map-card {
  padding: 24px;
  display: grid;
  gap: 16px;
  align-content: center;
}

.about-presence__map-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 22px;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(21, 45, 79, 0.96), rgba(79, 122, 184, 0.92)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}

.about-presence__map-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), transparent 100%);
}

.about-presence__map-placeholder {
  position: absolute;
  inset: 24px;
  border-radius: 18px;
  border: 1px dashed rgba(255, 255, 255, 0.34);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
}

.about-presence__map-pin {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #f5c15a;
  box-shadow:
    0 0 0 8px rgba(245, 193, 90, 0.15),
    0 10px 22px rgba(9, 19, 35, 0.24);
}

.about-presence__map-pin::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: inherit;
  background: #fff6db;
}

.about-presence__map-pin--one {
  top: 24%;
  left: 28%;
}

.about-presence__map-pin--two {
  top: 36%;
  right: 24%;
}

.about-presence__map-pin--three {
  bottom: 24%;
  left: 22%;
}

.about-presence__map-pin--four {
  bottom: 18%;
  right: 30%;
}

@media (max-width: 1080px) {
  .about-values__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-law__grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .about-law__content .section__title {
    margin-bottom: 36px;
    max-width: 760px;
  }

  .about-law__visual {
    order: 2;
  }

  .about-presence__grid {
    grid-template-columns: 1fr;
  }

  .about-presence__map-frame {
    max-width: 640px;
  }
}

@media (max-width: 768px) {


  .about-values__grid {
    grid-template-columns: 1fr;
  }

  .about-value-card {
    min-height: auto;
    padding: 28px 24px;
  }

  .about-law {
    padding: 12px 0 56px;
  }

  .about-law__content {
    padding: 10px 0;
  }

  .about-law__bar {
    height: 18px;
  }

  .about-presence {
    padding: 10px 0 64px;
  }

  .about-presence__content,
  .about-presence__map-card {
    padding: 24px;
    border-radius: 20px;
  }

  .about-presence__highlights {
    grid-template-columns: 1fr;
  }

  .about-presence__map-frame {
    max-width: none;
  }

  .about-presence__map-placeholder {
    inset: 16px;
  }
}
</style>
