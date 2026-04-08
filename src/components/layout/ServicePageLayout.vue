<template>
  <div>
    <TheNavbar />
    <main>
      <!-- Page hero -->
      <div class="page-hero">
        <div class="container">
          <p class="page-hero__label">{{ label }}</p>
          <h1 class="page-hero__title">{{ title }}</h1>
        </div>
      </div>

      <!-- Content slot -->
      <section class="section section--white">
        <div class="container service-page__content">
          <slot />
        </div>
      </section>

    </main>
    <TheFooter />
  </div>
</template>

<script setup>

import { useI18n }   from 'vue-i18n'
import TheNavbar     from '@/components/layout/TheNavbar.vue'
import TheFooter     from '@/components/layout/TheFooter.vue'

defineProps({
  label: { type: String, default: '' },
  title: { type: String, default: '' }
})

const { t } = useI18n()
</script>

<style scoped>
.service-page__content {
  max-width: 800px;
  font-size: 1rem;
  line-height: 1.85;
  color: var(--color-text-muted);
}

.service-page__content h2 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-navy);
  margin: 40px 0 12px;
}

.service-page__content p { margin-bottom: 16px; }

.service-page__content ul {
  list-style: none;
  margin: 16px 0 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.service-page__content ul li {
  padding-inline-start: 20px;
  position: relative;
  color: var(--color-text-muted);
}
.service-page__content ul li::before {
  content: '▸';
  position: absolute;
  inset-inline-start: 0;
  color: var(--color-gold);
}


</style>
