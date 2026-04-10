<template>
  <section class="banner section--white">
    <div class="container banner__content">
      <span class="banner__label">{{ t('banner.label') }}</span>
      <h2 class="banner__title">{{ t('banner.title') }}</h2>
      <span class="divider"></span>
      <p v-for="p in tm('banner.paragraphs')" :key="p" class="banner__text">{{ p }}</p>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<style scoped>
.banner {
  padding: var(--section-py) 0;
  background: transparent;
}

.banner__content {
  max-width: 780px;
}

.banner__label {
  display: inline-block;
  color: var(--color-accent);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.banner__title {
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  color: var(--color-white);
  line-height: 1.28;
  margin-bottom: 20px;
}

.banner__text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.96rem;
  line-height: 1.9;
  margin-bottom: 16px;
}

.banner__text:last-of-type {
  margin-bottom: 0;
}
</style>
