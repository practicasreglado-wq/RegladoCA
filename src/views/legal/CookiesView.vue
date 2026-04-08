<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <TheNavbar />
    <main>
      <div class="page-hero">
        <div class="container">
          <p class="page-hero__label">{{ t('cookies_page.title') }}</p>
          <h1 class="page-hero__title">{{ t('cookies_page.title') }}</h1>
        </div>
      </div>

      <section class="section section--white">
        <div class="container legal-content">
          <div v-for="(section, index) in sections" :key="index" class="legal-section">
            <h2 class="legal-section__title">{{ section.title }}</h2>
            <div class="legal-section__text">
              <p v-for="(paragraph, pIndex) in splitParagraphs(section.content)" :key="pIndex">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

const { t, tm, locale } = useI18n()

const isRTL = computed(() => locale.value === 'ar')
const sections = computed(() => tm('cookies_page.sections'))

function splitParagraphs(content) {
  if (!content) return []
  return content.split('\n\n')
}
</script>

<style scoped>
.legal-content {
  max-width: 900px;
  margin: 0 auto;
}

.legal-section {
  margin-bottom: 48px;
}

.legal-section__title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--color-navy);
  margin-bottom: 16px;
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 8px;
}

.legal-section__text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text-muted);
}

.legal-section__text p {
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .legal-section {
    margin-bottom: 32px;
  }
}
</style>
