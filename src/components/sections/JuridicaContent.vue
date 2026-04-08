<template>
  <div class="juridica-content-wrapper">
    <!-- Page hero -->
    <div class="page-hero" :style="{ '--hero-bg': `url(${heroBg})` }">
      <div class="container">
        <p class="page-hero__label">{{ t('nav.services') }}</p>
        <h1 class="page-hero__title">{{ t('nav.services_list.juridica') }}</h1>
        <p class="page-hero__subtitle">{{ t('juridica_page.hero.subtitle') }}</p>
      </div>
    </div>


    <section class="juridica-section">
      <div class="container juridica-grid">
        <div class="juridica-content">
          <span class="section__label">{{ t('juridica_page.section1.eyebrow') }}</span>
          <h2 class="section__title">{{ t('juridica_page.section1.title') }}</h2>
          <span class="divider"></span>
          <ul class="juridica-list">
            <li v-for="(item, index) in tm('juridica_page.section1.items')" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="juridica-image">
          <img :src="section1Img" :alt="t('juridica_page.section1.title')" />
        </div>
      </div>
    </section>

    <section class="juridica-section juridica-section--alt">
      <div class="container juridica-grid">
        <div class="juridica-image">
          <img :src="section2Img" :alt="t('juridica_page.section2.title')" />
        </div>
        <div class="juridica-content">
          <span class="section__label">{{ t('juridica_page.section2.eyebrow') }}</span>
          <h2 class="section__title">{{ t('juridica_page.section2.title') }}</h2>
          <span class="divider"></span>
          <ul class="juridica-list">
            <li v-for="(item, index) in tm('juridica_page.section2.items')" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="juridica-section">
      <div class="container juridica-grid">
        <div class="juridica-content">
          <span class="section__label">{{ t('juridica_page.section3.eyebrow') }}</span>
          <h2 class="section__title">{{ t('juridica_page.section3.title') }}</h2>
          <span class="divider"></span>
          <ul class="juridica-list">
            <li v-for="(item, index) in tm('juridica_page.section3.items')" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="juridica-image">
          <img :src="section3Img" :alt="t('juridica_page.section3.title')" />
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import heroBg from '@media/juridica_hero_bg.png'
import section1Img from '@media/procedimientos_admin.png'
import section2Img from '@media/asesoramiento_ayuntamientos.png'
import section3Img from '@media/estrategia_politica.png'

const { t, tm } = useI18n()
</script>

<style scoped>

.juridica-section { padding: 120px 0; overflow: hidden; }
.juridica-section--alt { background: #fcfdfe; }
.juridica-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 80px;
  align-items: center;
}
.juridica-section--alt .juridica-grid { grid-template-columns: 0.9fr 1.1fr; }
.juridica-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.juridica-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.juridica-list li {
  position: relative;
  padding-left: 28px;
  font-size: 0.98rem;
  line-height: 1.75;
  color: #4b5563;
}
.juridica-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  background: #4a7bb7;
  border-radius: 50%;
}
.juridica-image { position: relative; z-index: 1; }
.juridica-image img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 30px 60px rgba(16, 32, 58, 0.15);
}
.juridica-image::before {
  content: '';
  position: absolute;
  inset: -20px;
  border: 1px solid rgba(74, 123, 183, 0.15);
  border-radius: 8px;
  z-index: -1;
  pointer-events: none;
}
@media (max-width: 1080px) {
  .juridica-grid { gap: 40px; }
}
@media (max-width: 991px) {
  .juridica-grid, .juridica-section--alt .juridica-grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }
  .juridica-section--alt .juridica-grid .juridica-image { order: -1; }
  .juridica-image img { aspect-ratio: 16/10; }
  .juridica-content { align-items: center; text-align: center; }
  .juridica-list { align-items: flex-start; text-align: left; }
}
@media (max-width: 768px) {
  .juridica-hero { min-height: 440px; padding: 120px 0 80px; }
  .juridica-section { padding: 80px 0; }
}
</style>
