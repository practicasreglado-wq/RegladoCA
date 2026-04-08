<template>
  <section class="cta-band">
    <div class="container cta-band__inner">
      <h2 class="cta-band__title">{{ t('hero.cta') }}</h2>
      <RouterLink to="/contacto" class="btn btn--primary btn--contact btn--lg cta-band__button">
        {{ t('nav.contact') }}
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.cta-band {
  background:
    radial-gradient(circle at right, rgba(255, 255, 255, 0.703), transparent 40%),
    linear-gradient(135deg, #417bc2 0%, #92b1d7 100%);
  padding: 64px 0;
  border-top: none;
}
.cta-band__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}
.cta-band__title {
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: var(--color-white);
  max-width: 600px;
}
@media (max-width: 640px) {
  .cta-band__inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
