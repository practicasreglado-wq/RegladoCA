<template>
  <section class="section section--light" id="nosotros">
    <div class="container about__grid" :class="{ 'about__grid--reverse': reverse }">
      <div class="about__media">
        <img :src="image || aboutImage" alt="Asesoria corporativa Reglado" />
      </div>

      <div class="about__text">
        <span class="section__label">{{ labelText }}</span>
        <h2 class="section__title">{{ titleText }}</h2>
        <span class="divider"></span>

        <div v-if="showTags" class="about__tags">
          <span v-for="tag in tags" :key="tag" class="about__tag">{{ tag }}</span>
        </div>

        <p v-for="paragraph in resolvedParagraphs" :key="paragraph">{{ paragraph }}</p>
        <RouterLink v-if="showCta" to="/contacto" class="btn btn--primary btn--contact">{{ t('about.cta') }}</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import aboutImage from '../../../media/image-section-18-min-e1654644025371.jpg'

const { t, tm } = useI18n()
const props = defineProps({
  label: { type: String, default: '' },
  title: { type: String, default: '' },
  paragraphs: { type: Array, default: () => [] },
  showTags: { type: Boolean, default: true },
  showCta: { type: Boolean, default: true },
  image: { type: String, default: '' },
  reverse: { type: Boolean, default: false }
})

const tags = computed(() => tm('about.tags'))
const resolvedParagraphs = computed(() => {
  if (props.paragraphs.length) return props.paragraphs
  const content = tm('about.paragraphs')
  return Array.isArray(content) && content.length ? content : [t('about.p1'), t('about.p2')]
})
const labelText = computed(() => props.label || t('about.label'))
const titleText = computed(() => props.title || t('about.title'))
</script>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 56px;
  align-items: center;
}

.about__grid--reverse .about__media {
  order: 2;
}

.about__grid--reverse .about__text {
  order: 1;
}

.about__media {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.about__media img {
  width: 100%;
  min-height: 500px;
  object-fit: cover;
  display: block;
}

.about__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 0 24px;
}

.about__tag {
  display: inline-flex;
  align-items: center;
  padding: 12px 18px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  font-weight: 700;
  color: #10203a;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: var(--shadow-sm);
}

.about__text p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  margin-bottom: 16px;
  line-height: 1.85;
}

.about__text .btn {
  margin-top: 8px;
}

@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .about__media img {
    min-height: 320px;
  }
}
</style>
