<template>
  <div class="inspecciones-content">
    <!-- Page hero -->
    <div class="page-hero" :style="{ '--hero-bg': `url(${iaeImage})` }">
      <div class="container">
        <p class="page-hero__label">{{ t('nav.services') }}</p>
        <h1 class="page-hero__title">{{ t('nav.services_list.inspecciones') }}</h1>
      </div>
    </div>

    <section class="section section--white">
      <div class="container service-page__content">
        <span class="section__label">{{ t('inspecciones_page.section1.label') }}</span>
        <h2 class="section__title">{{ t('inspecciones_page.section1.title') }}</h2>
        <span class="divider"></span>

        <section class="inspection-block">
          <div class="inspection-block__content">
            <h3>{{ t('inspecciones_page.section1.block.title') }}</h3>
            <p>{{ t('inspecciones_page.section1.block.p1') }}</p>
            <p>{{ t('inspecciones_page.section1.block.p2') }}</p>
            <p>{{ t('inspecciones_page.section1.block.p3') }}</p>
            <p>{{ t('inspecciones_page.section1.block.p4') }}</p>
          </div>

          <div class="inspection-block__media">
            <img :src="coopImage" :alt="t('inspecciones_page.section1.block.title')" />
          </div>
        </section>

        <span class="section__label">{{ t('inspecciones_page.section2.label') }}</span>
        <h2 class="section__title">{{ t('inspecciones_page.section2.title') }}</h2>
        <span class="divider"></span>

        <section class="inspection-block inspection-block--reverse">
          <div class="inspection-block__content">
            <h3>{{ t('inspecciones_page.section2.iae_block.title') }}</h3>
            <h4>{{ t('inspecciones_page.section2.iae_block.subtitle') }}</h4>
            <p>{{ t('inspecciones_page.section2.iae_block.text') }}</p>
          </div>

          <div class="inspection-block__media">
            <img :src="iaeImage" :alt="t('inspecciones_page.section2.iae_block.title')" />
          </div>
        </section>

        <section class="inspection-block">
          <div class="inspection-block__content">
            <h3>{{ t('inspecciones_page.section2.tasa_block.title') }}</h3>
            <h4>{{ t('inspecciones_page.section2.tasa_block.subtitle') }}</h4>
            <p>{{ t('inspecciones_page.section2.tasa_block.text') }}</p>
            <p>{{ t('inspecciones_page.section2.tasa_block.text2') }}</p>
          </div>

          <div class="inspection-block__media">
            <img :src="tasaImage" :alt="t('inspecciones_page.section2.tasa_block.title')" />
          </div>
        </section>

        <section class="inspection-block inspection-block--reverse">
          <div class="inspection-block__content">
            <h3>{{ t('inspecciones_page.section2.ibi_block.title') }}</h3>
            <h4>{{ t('inspecciones_page.section2.ibi_block.subtitle') }}</h4>
            <p>{{ t('inspecciones_page.section2.ibi_block.text') }}</p>
            <p>{{ t('inspecciones_page.section2.ibi_block.text2') }}</p>
            <p>{{ t('inspecciones_page.section2.ibi_block.text3') }}</p>
          </div>

          <div class="inspection-block__media">
            <img :src="ibiImage" :alt="t('inspecciones_page.section2.ibi_block.title')" />
          </div>
        </section>

        <section class="inspection-block">
          <div class="inspection-block__content">
            <h3>{{ t('inspecciones_page.section2.icio_block.title') }}</h3>
            <h4>{{ t('inspecciones_page.section2.icio_block.subtitle') }}</h4>
            <p>{{ t('inspecciones_page.section2.icio_block.text') }}</p>
            <p>{{ t('inspecciones_page.section2.icio_block.text2') }}</p>
          </div>

          <div class="inspection-block__media">
            <img :src="icioImage" :alt="t('inspecciones_page.section2.icio_block.title')" />
          </div>
        </section>

        <span class="section__label">{{ t('inspecciones_page.section3.label') }}</span>
        <h2 class="section__title">{{ t('inspecciones_page.section3.title') }}</h2>
        <span class="divider"></span>

        <section class="inspection-block inspection-block--reverse">
          <div class="inspection-block__content">
            <h3>{{ t('inspecciones_page.section3.licencias_block.title') }}</h3>

            <h3>{{ t('inspecciones_page.section3.licencias_block.subtitle') }}</h3>
            <h4>{{ t('inspecciones_page.section3.licencias_block.text') }}</h4>
            <p>{{ t('inspecciones_page.section3.licencias_block.text2') }}</p>
          </div>

          <div class="inspection-block__media">
            <img :src="licenciasImage" :alt="t('inspecciones_page.section3.licencias_block.title')" />
          </div>
        </section>

        <section class="inspection-block">
          <div class="inspection-block__content">
            <h3>{{ t('inspecciones_page.section3.canon_block.title') }}</h3>
            <h4>{{ t('inspecciones_page.section3.canon_block.subtitle') }}</h4>
            <p>{{ t('inspecciones_page.section3.canon_block.text') }}</p>
            <p>{{ t('inspecciones_page.section3.canon_block.text2') }}</p>
            <p>{{ t('inspecciones_page.section3.canon_block.text3') }}</p>
          </div>

          <div class="inspection-block__media">
            <img :src="canonImage" :alt="t('inspecciones_page.section3.canon_block.title')" />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
// Using the exact filenames from the disk list with @media alias
import coopImage from '@media/Gestión-de-la-bonificación-del-95-en-el-IAE-de-cooperativas.jpg'
import iaeImage from '@media/IAE-Impuesto-de-Actividades-Económicas.jpg'
import ibiImage from '@media/IBI.-Gestión-de-la-Bonificación-del-50-en-el-IBI-de-Colegios-Concertados.jpg'
import icioImage from '@media/ICIO.jpg'
import licenciasImage from '@media/Licencias-Urbanísticas-.jpg'
import canonImage from '@media/CANON-URBANÍSTICO.jpg'
import tasaImage from '@media/Tasa-1.5.jpg'

const { t } = useI18n()
</script>

<style scoped>
.service-page__content {
  max-width: 800px;
  margin: 0 auto;
}

.inspection-block {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.9fr);
  gap: 34px;
  align-items: center;
  margin: 34px 0 54px;
}

.inspection-block--reverse {
  grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1.15fr);
}

.inspection-block--reverse .inspection-block__content {
  order: 2;
}

.inspection-block--reverse .inspection-block__media {
  order: 1;
}

.inspection-block__media img {
  width: 100%;
  min-height: 360px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 20px 44px rgba(16, 32, 58, 0.14);
}

.service-page__content h3 {
  margin: 0 0 10px;
  font-family: var(--font-heading);
  font-size: 1.35rem;
  color: var(--color-accent-light);
}

.service-page__content h4 {
  margin: 18px 0 10px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-accent-light);
}

@media (max-width: 900px) {
  .inspection-block,
  .inspection-block--reverse {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .inspection-block--reverse .inspection-block__content,
  .inspection-block--reverse .inspection-block__media {
    order: initial;
  }

  .inspection-block__media img {
    min-height: 260px;
  }
}
</style>
