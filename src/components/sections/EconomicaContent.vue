<template>
  <div class="economica-content-wrapper">
    <!-- Page hero -->
    <div class="page-hero" :style="{ '--hero-bg': `url(${heroBg})` }">
      <div class="container">
        <p class="page-hero__label">{{ t('nav.services') }}</p>
        <h1 class="page-hero__title">{{ t('nav.services_list.economica') }}</h1>
        <p class="page-hero__subtitle">{{ t('economica_page.hero.subtitle') }}</p>
      </div>
    </div>


    <section class="economica-section">
      <div class="container">
        <div class="economica-grid">
          <div class="economica-content">
            <span class="section__label">{{ t('economica_page.section1.eyebrow') }}</span>
            <h2 class="section__title">{{ t('economica_page.section1.title') }}</h2>
            <span class="divider"></span>
            <p class="section__text">{{ t('economica_page.section1.text') }}</p>
          </div>
          <div class="economica-image">
            <img :src="section1Img" alt="Analisis de Ordenanzas Fiscales" />
          </div>
        </div>
      </div>
    </section>

    <section class="economica-section economica-section--alt">
      <div class="container">
        <div class="economica-grid">
          <div class="economica-image">
            <img :src="section2Img" alt="Planes de Inspeccion Tributaria" />
          </div>
          <div class="economica-content">
            <span class="section__label">{{ t('economica_page.section2.eyebrow') }}</span>
            <h2 class="section__title">{{ t('economica_page.section2.title') }}</h2>
            <span class="divider"></span>
            <p class="section__text">{{ t('economica_page.section2.text') }}</p>
            <ul class="economica-list">
              <li v-for="(item, index) in tm('economica_page.section2.items')" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="economica-cards-section">
      <div class="container">
        <div class="economica-cards-grid">
          <div v-for="(card, index) in tm('economica_page.cards')" :key="index" class="economica-card">
            <div class="economica-card__icon" v-html="getCardIcon(index)"></div>
            <h3 class="economica-card__title">{{ card.title }}</h3>
            <p class="economica-card__text">{{ card.text }}</p>
            <div class="economica-card__footer">
              <RouterLink to="/contacto" class="economica-card__arrow">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </RouterLink>
            </div>
            <div class="economica-card__accent"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="economica-section">
      <div class="container">
        <div class="economica-grid">
          <div class="economica-content">
            <span class="section__label">{{ t('economica_page.section3.eyebrow') }}</span>
            <h2 class="section__title">{{ t('economica_page.section3.title') }}</h2>
            <span class="divider"></span>
            <p class="section__text" v-html="t('economica_page.section3.text')"></p>
            <ul class="economica-list">
              <li v-for="(item, index) in tm('economica_page.section3.items')" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="economica-image">
            <img :src="section3Img" alt="Planes Economicos Financieros" />
          </div>
        </div>
      </div>
    </section>

    <section class="economica-section economica-section--alt">
      <div class="container">
        <div class="economica-grid">
          <div class="economica-image">
            <img :src="section4Img" alt="Calculo de Costes de Servicios" />
          </div>
          <div class="economica-content">
            <span class="section__label">{{ t('economica_page.section4.eyebrow') }}</span>
            <h2 class="section__title">{{ t('economica_page.section4.title') }}</h2>
            <span class="divider"></span>
            <p class="section__text">{{ t('economica_page.section4.text') }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import heroBg from '@media/economica_hero_bg.png'
import section1Img from '@media/ordenanzas_fiscales.png'
import section2Img from '@media/inspeccion_tributaria.png'
import section3Img from '@media/planes_economicos.png'
import section4Img from '@media/coste_efectivo.png'

const { t, tm } = useI18n()

const icons = {
  informes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2h10l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M17 2v4h4"/><path d="M3 7v14a2 2 0 0 0 2 2h2"/><path d="M3 12h4"/></svg>`,
  revision: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  auditoria: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`
}

const getCardIcon = (index) => {
  const keys = ['informes', 'revision', 'auditoria']
  return icons[keys[index]] || ''
}
</script>

<style scoped>

.economica-section { padding: 120px 0; overflow: hidden; }
.economica-section--alt { background: var(--color-bg-light); }
.economica-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 80px;
  align-items: center;
}
.economica-section--alt .economica-grid { grid-template-columns: 0.9fr 1.1fr; }
.economica-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.economica-list {
  list-style: none;
  padding: 0;
  margin: 32px 0 12px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.economica-list li {
  position: relative;
  padding-left: 28px;
  font-size: 0.98rem;
  line-height: 1.75;
  color: var(--color-text);
}
.economica-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  background: #4a7bb7;
  border-radius: 50%;
}
.economica-image { position: relative; z-index: 1; }
.economica-image img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 30px 60px rgba(16, 32, 58, 0.15);
}
.economica-cards-section {
  padding: 100px 0;
  background: var(--color-bg-light);
}
.economica-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.economica-card {
  position: relative;
  background: var(--color-white);
  padding: 40px 32px;
  color: #314159;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 440px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.economica-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(23, 45, 82, 0.2);
}
.economica-card__icon {
  width: 64px;
  height: 64px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #cbd5e1;
  border-radius: 12px;
}
.economica-card__icon :deep(svg) {
  width: 32px;
  height: 32px;
  color: #10203a;
}
.economica-card__title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  line-height: 1.3;
  margin-bottom: 24px;
  font-weight: 500;
  color: #10203a;
}
.economica-card__text {
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.85;
  font-weight: 300;
  flex-grow: 1;
}
.economica-card__footer { margin-top: 32px; }
.economica-card__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(16, 32, 58, 0.08);
  border-radius: 50%;
  color: #10203a;
  transition: background 0.3s ease;
}
.economica-card__arrow:hover { background: var(--color-gold); }
.economica-card__accent {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
}
@media (max-width: 1080px) {
  .economica-grid { gap: 40px; }
}
@media (max-width: 991px) {
  .economica-hero { min-height: 480px; padding: 140px 20px 80px; }
  .economica-hero__title { font-size: 2.6rem; }
  .economica-grid, .economica-section--alt .economica-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .economica-cards-grid { grid-template-columns: 1fr; }
}
</style>
