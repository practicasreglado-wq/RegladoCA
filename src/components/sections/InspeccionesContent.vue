<template>
  <div ref="sceneWrapper" class="inspecciones-parallax-wrapper">
    <!-- MOBILE FALLBACK: Standard vertical list -->
    <div class="mobile-only-content">
      <div class="page-hero" :style="{ '--hero-bg': `url(${iaeImage})` }">
        <div class="container">
          <p class="page-hero__label">{{ t('nav.services') }}</p>
          <h1 class="page-hero__title">{{ t('nav.services_list.inspecciones') }}</h1>
        </div>
      </div>
      <section class="section section--dark">
        <div class="container service-page__content">
          <div v-for="(block, idx) in allBlocks" :key="'mob-' + idx" class="mobile-block">
             <span v-if="block.isLabel" class="section__label">{{ t(block.label) }}</span>
             <h2 v-if="block.isLabel" class="section__title">{{ t(block.title) }}</h2>
             <span v-if="block.isLabel" class="divider"></span>
             
             <section v-if="!block.isLabel" class="inspection-block">
                <div class="inspection-block__content">
                  <h3 v-if="block.titleKey">{{ t(block.titleKey) }}</h3>
                  <h4 v-if="block.subtitleKey">{{ t(block.subtitleKey) }}</h4>
                  <p v-for="(p, pIdx) in block.paragraphs" :key="pIdx">{{ t(p) }}</p>
                </div>
                <div class="inspection-block__media">
                  <img :src="block.image" :alt="t(block.titleKey || 'inspecciones')" />
                </div>
             </section>
          </div>
        </div>
      </section>
    </div>

    <!-- DESKTOP IMMERSIVE SCENE -->
    <div class="desktop-immersive-scene">
      <!-- PHASE 1: Expansion Card -->
      <div ref="expansionCard" class="expansion-card">
        <video 
          ref="expansionVideo"
          class="expansion-card__video"
          src="/video/InspeccionesTributarias.mp4"
          muted
          loop
          playsinline
        ></video>
        <div class="expansion-card__overlay"></div>
        
        <div class="expansion-card__inner">
          <div ref="heroVertical" class="intro-box intro-box--vertical">
             <p class="intro-label">{{ t('nav.services') }}</p>
             <h1 class="intro-title">{{ t('nav.services_list.inspecciones') }}</h1>
          </div>
          <div ref="heroHorizontal" class="intro-box intro-box--horizontal">
             <p class="intro-label">{{ t('nav.services') }}</p>
             <h1 class="intro-title">{{ t('nav.services_list.inspecciones') }}</h1>
          </div>
        </div>
      </div>

      <!-- PHASE 2: Vertical Sequential Slides (Stacked) -->
      <div class="slides-stack-container">
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          :ref="el => slideRefs[index] = el"
          class="content-slide-vertical"
        >
          <div class="slide-inner-box">
            <div class="inspection-block-premium" :class="{ 'inspection-block-premium--reverse': index % 2 !== 0 }">
              <div class="inspection-block-premium__content">
                <span class="slide-label" v-if="slide.sectionLabel">{{ t(slide.sectionLabel) }}</span>
                <h3 class="slide-main-title">{{ t(slide.titleKey) }}</h3>
                <h4 v-if="slide.subtitleKey">{{ t(slide.subtitleKey) }}</h4>
                <div class="slide-text">
                  <p v-for="(p, pIdx) in slide.paragraphs" :key="pIdx">{{ t(p) }}</p>
                </div>
              </div>

              <div class="inspection-block-premium__media">
                <div class="frame-premium">
                  <img :src="slide.image" :alt="t(slide.titleKey)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Assets
import coopImage from '@media/Gestión-de-la-bonificación-del-95-en-el-IAE-de-cooperativas.jpg'
import iaeImage from '@media/IAE-Impuesto-de-Actividades-Económicas.jpg'
import ibiImage from '@media/IBI.-Gestión-de-la-Bonificación-del-50-en-el-IBI-de-Colegios-Concertados.jpg'
import icioImage from '@media/ICIO.jpg'
import licenciasImage from '@media/Licencias-Urbanísticas-.jpg'
import canonImage from '@media/CANON-URBANÍSTICO.jpg'
import tasaImage from '@media/Tasa-1.5.jpg'

gsap.registerPlugin(ScrollTrigger)
const { t } = useI18n()

const sceneWrapper = ref(null)
const expansionCard = ref(null)
const expansionVideo = ref(null)
const heroVertical = ref(null)
const heroHorizontal = ref(null)
const slideRefs = ref([])

const slides = [
  {
    sectionLabel: 'inspecciones_page.section1.label',
    titleKey: 'inspecciones_page.section1.block.title',
    paragraphs: [
      'inspecciones_page.section1.block.p1',
      'inspecciones_page.section1.block.p2',
      'inspecciones_page.section1.block.p3',
      'inspecciones_page.section1.block.p4'
    ],
    image: coopImage
  },
  {
    sectionLabel: 'inspecciones_page.section2.label',
    titleKey: 'inspecciones_page.section2.iae_block.title',
    subtitleKey: 'inspecciones_page.section2.iae_block.subtitle',
    paragraphs: ['inspecciones_page.section2.iae_block.text'],
    image: iaeImage
  },
  {
    titleKey: 'inspecciones_page.section2.tasa_block.title',
    subtitleKey: 'inspecciones_page.section2.tasa_block.subtitle',
    paragraphs: ['inspecciones_page.section2.tasa_block.text', 'inspecciones_page.section2.tasa_block.text2'],
    image: tasaImage
  },
  {
    titleKey: 'inspecciones_page.section2.ibi_block.title',
    subtitleKey: 'inspecciones_page.section2.ibi_block.subtitle',
    paragraphs: [
      'inspecciones_page.section2.ibi_block.text',
      'inspecciones_page.section2.ibi_block.text2',
      'inspecciones_page.section2.ibi_block.text3'
    ],
    image: ibiImage
  },
  {
    titleKey: 'inspecciones_page.section2.icio_block.title',
    subtitleKey: 'inspecciones_page.section2.icio_block.subtitle',
    paragraphs: ['inspecciones_page.section2.icio_block.text', 'inspecciones_page.section2.icio_block.text2'],
    image: icioImage
  },
  {
    sectionLabel: 'inspecciones_page.section3.label',
    titleKey: 'inspecciones_page.section3.licencias_block.title',
    subtitleKey: 'inspecciones_page.section3.licencias_block.subtitle',
    paragraphs: ['inspecciones_page.section3.licencias_block.text2'],
    image: licenciasImage
  },
  {
    titleKey: 'inspecciones_page.section3.canon_block.title',
    subtitleKey: 'inspecciones_page.section3.canon_block.subtitle',
    paragraphs: [
      'inspecciones_page.section3.canon_block.text',
      'inspecciones_page.section3.canon_block.text2',
      'inspecciones_page.section3.canon_block.text3'
    ],
    image: canonImage
  }
]

const allBlocks = [
  { isLabel: true, label: 'inspecciones_page.section1.label', title: 'inspecciones_page.section1.title' },
  { titleKey: 'inspecciones_page.section1.block.title', paragraphs: ['inspecciones_page.section1.block.p1', 'inspecciones_page.section1.block.p2', 'inspecciones_page.section1.block.p3', 'inspecciones_page.section1.block.p4'], image: coopImage },
  { isLabel: true, label: 'inspecciones_page.section2.label', title: 'inspecciones_page.section2.title' },
  { titleKey: 'inspecciones_page.section2.iae_block.title', subtitleKey: 'inspecciones_page.section2.iae_block.subtitle', paragraphs: ['inspecciones_page.section2.iae_block.text'], image: iaeImage },
  { titleKey: 'inspecciones_page.section2.tasa_block.title', subtitleKey: 'inspecciones_page.section2.tasa_block.subtitle', paragraphs: ['inspecciones_page.section2.tasa_block.text', 'inspecciones_page.section2.tasa_block.text2'], image: tasaImage },
  { titleKey: 'inspecciones_page.section2.ibi_block.title', subtitleKey: 'inspecciones_page.section2.ibi_block.subtitle', paragraphs: ['inspecciones_page.section2.ibi_block.text', 'inspecciones_page.section2.ibi_block.text2', 'inspecciones_page.section2.ibi_block.text3'], image: ibiImage },
  { titleKey: 'inspecciones_page.section2.icio_block.title', subtitleKey: 'inspecciones_page.section2.icio_block.subtitle', paragraphs: ['inspecciones_page.section2.icio_block.text', 'inspecciones_page.section2.icio_block.text2'], image: icioImage },
  { isLabel: true, label: 'inspecciones_page.section3.label', title: 'inspecciones_page.section3.title' },
  { titleKey: 'inspecciones_page.section3.licencias_block.title', subtitleKey: 'inspecciones_page.section3.licencias_block.subtitle', paragraphs: ['inspecciones_page.section3.licencias_block.text2'], image: licenciasImage },
  { titleKey: 'inspecciones_page.section3.canon_block.title', subtitleKey: 'inspecciones_page.section3.canon_block.subtitle', paragraphs: ['inspecciones_page.section3.canon_block.text', 'inspecciones_page.section3.canon_block.text2', 'inspecciones_page.section3.canon_block.text3'], image: canonImage }
]

let mainTimeline = null

onMounted(() => {
  const mm = gsap.matchMedia()

  mm.add("(min-width: 1025px)", () => {
    // Scroll total: Fase 1 + Slides
    const scrollFactor = slides.length + 1; 

    mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sceneWrapper.value,
        start: "top top",
        end: `+=${scrollFactor * 100}%`,
        pin: true,
        scrub: 1.2
      }
    });

    // ----- FASE 1: Expansión -----
    const overlay = expansionCard.value.querySelector('.expansion-card__overlay');
    
    // Expansion Tween
    mainTimeline.fromTo(expansionCard.value, 
      { width: "22%", left: "0%", autoAlpha: 1 },
      { 
        width: "100%", 
        duration: 1.5, 
        ease: "power2.inOut",
        onStart: () => { if (expansionVideo.value) expansionVideo.value.play(); },
        onReverseComplete: () => { if (expansionVideo.value) expansionVideo.value.pause(); }
      }
    );

    // Sync overlay darkening with expansion
    mainTimeline.to(overlay, { background: "rgba(16, 32, 58, 0.65)", duration: 1.5 }, 0);

    // Initial states for scrub stability
    mainTimeline.set(heroHorizontal.value, { autoAlpha: 0, zIndex: 1 }, 0);
    mainTimeline.set(heroVertical.value, { autoAlpha: 1, zIndex: 2 }, 0);

    // Tightened Cross-fade centered around 50% (0.75s)
    mainTimeline.to(heroVertical.value, { autoAlpha: 0, duration: 0.2 }, 0.65);
    mainTimeline.fromTo(heroHorizontal.value, 
      { autoAlpha: 0, scale: 0.96, zIndex: 1 },
      { autoAlpha: 1, scale: 1, zIndex: 3, duration: 0.2 },
      0.75
    );

    // Fade out for next phase
    mainTimeline.to([heroVertical.value, heroHorizontal.value], { autoAlpha: 0, y: -40, duration: 0.8 }, 1.35);
    mainTimeline.to(expansionCard.value, { 
      autoAlpha: 0, 
      duration: 0.6,
      onStart: () => { if (expansionVideo.value) expansionVideo.value.pause(); },
      onReverseComplete: () => { if (expansionVideo.value) expansionVideo.value.play(); }
    }, 1.55);

    // ----- FASE 2: Revelado Vertical Secuencial -----
    slides.forEach((_, i) => {
      mainTimeline.fromTo(slideRefs.value[i],
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
      
      if (i < slides.length - 1) {
        mainTimeline.to(slideRefs.value[i], {
          autoAlpha: 0,
          y: -50,
          duration: 1,
          delay: 0.2, // Tiempo de lectura
          ease: 'power2.in'
        });
      }
    });

    return () => {
      mainTimeline?.scrollTrigger?.kill();
      mainTimeline?.kill();
    }
  })
})

onBeforeUnmount(() => {
  mainTimeline?.scrollTrigger?.kill();
  mainTimeline?.kill();
})
</script>

<style scoped>
.inspecciones-parallax-wrapper {
  position: relative;
  background-color: var(--color-bg-main);
  overflow: hidden;
  width: 100%;
}

.desktop-immersive-scene { display: none; }
.mobile-only-content { display: block; }

.section--dark {
  background: var(--color-bg-main);
  padding: 60px 0;
}

/* DISEÑO PREMIUM CONTENIDO */
.inspection-block-premium {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.inspection-block-premium--reverse .inspection-block-premium__content { order: 2; }
.inspection-block-premium--reverse .inspection-block-premium__media { order: 1; }

.frame-premium {
  width: 100%;
  max-width: 500px;
  height: 500px;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
}

.frame-premium img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.inspection-block-premium__content h3 {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  color: var(--color-white);
  line-height: 1.1;
  margin-bottom: 16px;
}

.inspection-block-premium__content h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-accent-light);
  margin-bottom: 24px;
}

.inspection-block-premium__content p {
  color: var(--color-text);
  line-height: 1.9;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

@media (min-width: 1025px) {
  .mobile-only-content { display: none; }
  .desktop-immersive-scene {
    display: block;
    height: 100vh;
    width: 100%;
    position: relative;
    background: var(--color-bg-main);
  }

  /* Fase 1 Card */
  .expansion-card {
    position: absolute;
    top: 0;
    height: 100%;
    background: var(--color-bg-main);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    overflow: hidden;
    border-radius: 0 !important;
    container-type: inline-size; /* Enable container queries for dynamic text orientation */
  }

  .expansion-card__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
  }

  .expansion-card__overlay {
    position: absolute;
    inset: 0;
    background: rgba(77, 121, 184, 0.4); /* Matched with AboutContent.vue lighter blue */
    z-index: -1;
  }

  .expansion-card__inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas: "hero";
    place-items: center;
    z-index: 2;
  }

  .intro-box {
    grid-area: hero;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }

  .intro-box--vertical {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    white-space: nowrap;
  }

  .intro-box--horizontal {
    writing-mode: horizontal-tb;
    transform: none;
    white-space: normal;
    text-align: center;
    padding: 20px 40px;
    max-width: 900px;
    margin: 0 auto;
    opacity: 0;
    visibility: hidden;
  }

  .intro-label {
    margin: 0;
    margin-bottom: 24px;
    color: var(--color-accent-light) !important;
    font-size: 0.75rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.25em !important;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .intro-title {
    font-family: var(--font-heading) !important;
    font-size: clamp(2.2rem, 5vw, 3.2rem) !important;
    font-weight: 400 !important;
    line-height: 1.1;
    color: var(--color-white) !important;
    text-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Fase 2: Stack Vertical */
  .slides-stack-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 50;
  }

  .inspection-block-premium {
    width: 100%;
    max-width: 1500px; /* Maximum reach for wide screens */
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.5fr 1fr; /* Text-heavy ratio (60/40) */
    gap: 40px; /* Tighter gap to maximize content space */
    align-items: center;
    padding: 140px 40px 60px; /* Secure distance from navbar */
  }

  .inspection-block-premium--reverse {
    grid-template-columns: 1fr 1.5fr; /* Inverse ratio to keep text wider on the right */
  }

  .inspection-block-premium--reverse .inspection-block-premium__content { order: 2; }
  .inspection-block-premium--reverse .inspection-block-premium__media { order: 1; }

  .frame-premium {
    width: 100%;
    max-width: 600px; /* Controlled size for images */
    aspect-ratio: 1/1;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
    justify-self: center;
  }

  .content-slide-vertical {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10%;
    opacity: 0;
    visibility: hidden;
  }

  .slide-inner-box {
    width: 100%;
    max-width: 1400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slide-label {
    display: block;
    font-size: 0.9rem;
    text-transform: uppercase;
    color: var(--color-accent-light);
    margin-bottom: 20px;
    font-weight: 700;
    letter-spacing: 0.2em;
  }
}

.mobile-block {
  margin-bottom: 80px;
}

@media (max-width: 1024px) {
  .inspection-block-premium {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
