<template>
  <section class="section section--light">
    <div class="container ord__grid">
      <div class="ord__text">
        <span class="section__label">{{ t('ordenanzas.label') }}</span>
        <h2 class="section__title">{{ t('ordenanzas.title') }}</h2>
        <span class="divider"></span>

        <ul class="ord__list">
          <li v-for="item in items" :key="item">{{ item }}</li>
        </ul>

        <p>{{ t('ordenanzas.text') }}</p>
        <RouterLink v-if="showCta" to="/contacto" class="btn btn--contact">{{ t('ordenanzas.cta') }}</RouterLink>
      </div>

      <div class="ord__visual">
        <img :src="ordenanzasImage" alt="Revision documental y ordenanzas fiscales" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ordenanzasImage from '../../../media/image-section-17-min-e1654644050436.jpg'

const { t, tm } = useI18n()
defineProps({
  showCta: { type: Boolean, default: true }
})
const items = computed(() => tm('ordenanzas.items'))
</script>

<style scoped>
.ord__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: center;
}

.ord__list {
  margin: 20px 0 26px;
  display: flex;
  flex-direction: column;
}

.ord__list li {
  padding: 10px 0 10px 22px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.92rem;
  position: relative;
}

.ord__list li::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 17px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
}

.ord__text p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  margin-bottom: 24px;
  line-height: 1.85;
}

.ord__visual img {
  width: 100%;
  min-height: 500px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: var(--shadow);
}

@media (max-width: 900px) {
  .ord__grid {
    grid-template-columns: 1fr;
  }

  .ord__visual img {
    min-height: 320px;
  }
}
</style>
