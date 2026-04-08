<template>
  <div class="tecnica-content-wrapper">
    <!-- Page hero -->
    <div class="page-hero" :style="{ '--hero-bg': `url(${heroBg})` }">
      <div class="container">
        <p class="page-hero__label">{{ t('nav.services') }}</p>
        <h1 class="page-hero__title">{{ t('nav.services_list.tecnica') }}</h1>
        <p class="page-hero__subtitle">{{ t('tecnica_page.hero.subtitle') }}</p>
      </div>
    </div>


    <section class="tecnica-section">
      <div class="container tecnica-grid">
        <div class="tecnica-content">
          <span class="section__label">{{ t('tecnica_page.section1.eyebrow') }}</span>
          <h2 class="section__title">{{ t('tecnica_page.section1.title') }}</h2>
          <span class="divider"></span>
          <ul class="tecnica-list">
            <li v-for="(item, index) in tm('tecnica_page.section1.items')" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="tecnica-image">
          <img :src="section1Img" :alt="t('tecnica_page.section1.title')" />
        </div>
      </div>
    </section>

    <section class="tecnica-section tecnica-section--alt">
      <div class="container tecnica-grid">
        <div class="tecnica-image">
          <img :src="section2Img" :alt="t('tecnica_page.section2.title')" />
        </div>
        <div class="tecnica-content">
          <span class="section__label">{{ t('tecnica_page.section2.eyebrow') }}</span>
          <h2 class="section__title">{{ t('tecnica_page.section2.title') }}</h2>
          <span class="divider"></span>
          <ul class="tecnica-list">
            <li v-for="(item, index) in tm('tecnica_page.section2.items')" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="tecnica-section">
      <div class="container tecnica-grid">
        <div class="tecnica-content">
          <span class="section__label">{{ t('tecnica_page.section3.eyebrow') }}</span>
          <h2 class="section__title">{{ t('tecnica_page.section3.title') }}</h2>
          <span class="divider"></span>
          <ul class="tecnica-list">
            <li v-for="(item, index) in tm('tecnica_page.section3.items')" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="tecnica-image">
          <img :src="section3Img" :alt="t('tecnica_page.section3.title')" />
        </div>
      </div>
    </section>

    <section class="tecnica-section tecnica-section--alt">
      <div class="container tecnica-grid">
        <div class="tecnica-image">
          <img :src="section4Img" :alt="t('tecnica_page.section4.title')" />
        </div>
        <div class="tecnica-content">
          <span class="section__label">{{ t('tecnica_page.section4.eyebrow') }}</span>
          <h2 class="section__title">{{ t('tecnica_page.section4.title') }}</h2>
          <span class="divider"></span>
          <ul class="tecnica-list">
            <li v-for="(item, index) in tm('tecnica_page.section4.items')" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import heroBg from '@media/tecnica_hero_bg.png'
import section1Img from '@media/consultoria_energetica.png'
import section2Img from '@media/energias_renovables.png'
import section3Img from '@media/image-section-17-min-e1654644050436.jpg'
import section4Img from '@media/coste_efectivo.png'

const { t, tm } = useI18n()
</script>

<style scoped>

.tecnica-section { padding: 120px 0; overflow: hidden; }
.tecnica-section--alt { background: #fcfdfe; }
.tecnica-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 80px;
  align-items: center;
}
.tecnica-section--alt .tecnica-grid { grid-template-columns: 0.9fr 1.1fr; }
.tecnica-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.tecnica-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.tecnica-list li {
  position: relative;
  padding-left: 28px;
  font-size: 0.98rem;
  line-height: 1.75;
  color: #4b5563;
}
.tecnica-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  background: #4a7bb7;
  border-radius: 50%;
}
.tecnica-image { position: relative; z-index: 1; }
.tecnica-image img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 30px 60px rgba(16, 32, 58, 0.15);
}
.tecnica-image::before {
  content: '';
  position: absolute;
  inset: -20px;
  border: 1px solid rgba(74, 123, 183, 0.15);
  border-radius: 8px;
  z-index: -1;
  pointer-events: none;
}
@media (max-width: 1080px) {
  .tecnica-grid { gap: 40px; }
}
@media (max-width: 991px) {
  .tecnica-grid, .tecnica-section--alt .tecnica-grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }
  .tecnica-section--alt .tecnica-grid .tecnica-image { order: -1; }
  .tecnica-image img { aspect-ratio: 16/10; }
  .tecnica-content { align-items: center; text-align: center; }
  .tecnica-list { align-items: flex-start; text-align: left; }
}
@media (max-width: 768px) {
  .tecnica-hero { min-height: 440px; padding: 120px 0 80px; }
  .tecnica-section { padding: 80px 0; }
}
</style>
