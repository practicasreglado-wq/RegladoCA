<template>
  <div ref="sceneWrapper" class="inspecciones-parallax-wrapper">
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
            <template v-if="block.isLabel">
              <span class="section__label">{{ t(block.label) }}</span>
              <h2 class="section__title">{{ t(block.title) }}</h2>
              <span class="divider"></span>

              <section
                v-if="block.featured"
                class="inspection-featured"
              >
                <div class="inspection-featured__content">
                  <p>{{ t('inspecciones_page.regularizaciones.text') }}</p>
                </div>

                <ul class="inspection-featured__list">
                  <li v-for="item in tm('inspecciones_page.regularizaciones.items')" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </section>
            </template>

            <section v-else class="inspection-block">
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

    <div class="desktop-immersive-scene">
      <div ref="horizontalViewport" class="slides-horizontal-viewport">
        <div ref="horizontalTrack" class="slides-horizontal-track">
          <section ref="expansionPanel" class="expansion-panel">
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
                  <h1 ref="heroHorizontalTitle" class="intro-title">
                    {{ t('nav.services_list.inspecciones') }}
                  </h1>
                </div>
              </div>
            </div>
          </section>

          <article
            v-for="(slide, index) in slides"
            :key="index"
            class="content-slide-horizontal"
          >
            <div class="slide-inner-box">
              <div
                class="inspection-block-premium"
                :class="{ 'inspection-block-premium--reverse': index % 2 !== 0 }"
              >
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
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import coopImage from '@media/Gestión-de-la-bonificación-del-95-en-el-IAE-de-cooperativas.jpg'
import iaeImage from '@media/IAE-Impuesto-de-Actividades-Económicas.jpg'
import ibiImage from '@media/IBI.-Gestión-de-la-Bonificación-del-50-en-el-IBI-de-Colegios-Concertados.jpg'
import icioImage from '@media/ICIO.jpg'
import licenciasImage from '@media/Licencias-Urbanísticas-.jpg'
import canonImage from '@media/CANON-URBANÍSTICO.jpg'
import tasaImage from '@media/Tasa-1.5.jpg'

gsap.registerPlugin(ScrollTrigger)

const { t, tm, locale } = useI18n()

const sceneWrapper = ref(null)
const horizontalViewport = ref(null)
const horizontalTrack = ref(null)
const expansionPanel = ref(null)
const expansionCard = ref(null)
const expansionVideo = ref(null)
const heroHorizontal = ref(null)
const heroVertical = ref(null)
const heroHorizontalTitle = ref(null)

let resizeObserver = null

function syncHeroOrientation() {
  const panelEl = expansionPanel.value
  const horizontalEl = heroHorizontal.value
  const verticalEl = heroVertical.value
  const titleEl = heroHorizontalTitle.value

  if (!panelEl || !horizontalEl || !verticalEl || !titleEl) return

  const panelWidth = panelEl.getBoundingClientRect().width
  const titleWidth = titleEl.scrollWidth
  const shouldUseVertical = panelWidth < titleWidth + 96

  gsap.set(horizontalEl, { autoAlpha: shouldUseVertical ? 0 : 1 })
  gsap.set(verticalEl, { autoAlpha: shouldUseVertical ? 1 : 0 })
}

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
    paragraphs: [
      'inspecciones_page.section2.tasa_block.text',
      'inspecciones_page.section2.tasa_block.text2'
    ],
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
    paragraphs: [
      'inspecciones_page.section2.icio_block.text',
      'inspecciones_page.section2.icio_block.text2'
    ],
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
  {
    isLabel: true,
    label: 'inspecciones_page.section1.label',
    title: 'inspecciones_page.section1.title'
  },
  {
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
    isLabel: true,
    label: 'inspecciones_page.section2.label',
    title: 'inspecciones_page.section2.title',
    featured: true
  },
  {
    titleKey: 'inspecciones_page.section2.iae_block.title',
    subtitleKey: 'inspecciones_page.section2.iae_block.subtitle',
    paragraphs: ['inspecciones_page.section2.iae_block.text'],
    image: iaeImage
  },
  {
    titleKey: 'inspecciones_page.section2.tasa_block.title',
    subtitleKey: 'inspecciones_page.section2.tasa_block.subtitle',
    paragraphs: [
      'inspecciones_page.section2.tasa_block.text',
      'inspecciones_page.section2.tasa_block.text2'
    ],
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
    paragraphs: [
      'inspecciones_page.section2.icio_block.text',
      'inspecciones_page.section2.icio_block.text2'
    ],
    image: icioImage
  },
  {
    isLabel: true,
    label: 'inspecciones_page.section3.label',
    title: 'inspecciones_page.section3.title'
  },
  {
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

let mainTimeline = null
let mediaContext = null
let scrollDirection = 1
const collapsePhaseEnd = 1.6

function cleanupDesktopScene() {
  resizeObserver?.disconnect()
  resizeObserver = null
  mainTimeline?.scrollTrigger?.kill()
  mainTimeline?.kill()
  mainTimeline = null
  mediaContext?.revert()
  mediaContext = null
}

function syncExpansionVideoPlayback() {
  const videoEl = expansionVideo.value
  if (!videoEl || !mainTimeline) return

  const currentTime = mainTimeline.time()
  const isInCollapsePhase = currentTime > 0.01 && currentTime < collapsePhaseEnd - 0.01

  if (isInCollapsePhase) {
    videoEl.play?.()
  } else {
    videoEl.pause?.()
  }
}

function initDesktopScene() {
  cleanupDesktopScene()
  mediaContext = gsap.matchMedia()

  mediaContext.add('(min-width: 1025px)', () => {
    const isRTL = document.documentElement.dir === 'rtl'
    const xMult = isRTL ? 1 : -1

    const viewportWidth = () => horizontalViewport.value?.offsetWidth || window.innerWidth
    const collapsedPanelWidth = () => Math.max(Math.round(viewportWidth() * 0.22), 220)
    const remainingSlidesDistance = () => Math.max((slides.length - 1) * viewportWidth(), 0)
    const totalTravel = () => collapsedPanelWidth() + remainingSlidesDistance()

    gsap.set(sceneWrapper.value, { '--expansion-width': `${viewportWidth()}px` })
    gsap.set(horizontalTrack.value, { x: 0 })
    gsap.set(heroHorizontal.value, { autoAlpha: 1 })
    gsap.set(heroVertical.value, { autoAlpha: 0 })
    expansionVideo.value?.pause()
    if (expansionVideo.value) expansionVideo.value.currentTime = 0

    resizeObserver = new ResizeObserver(() => {
      syncHeroOrientation()
    })
    resizeObserver.observe(expansionPanel.value)
    syncHeroOrientation()
    syncExpansionVideoPlayback()

    mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sceneWrapper.value,
        start: 'top top',
        end: () => `+=${viewportWidth() + totalTravel()}`,
        pin: true,
        scrub: 1.15,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollDirection = self.direction
          syncExpansionVideoPlayback()
        },
        onLeave: () => expansionVideo.value?.pause(),
        onLeaveBack: () => expansionVideo.value?.pause(),
        snap: {
          snapTo: (progress) => {
            const totalDur = 2.35 + (slides.length - 1)
            const pts = [0]
            for (let i = 0; i < slides.length; i++) {
              pts.push((2.35 + i) / totalDur)
            }

            // Find which segment the progress is in
            let i = 0
            while (i < pts.length - 1 && progress > pts[i + 1]) {
              i++
            }

            if (i >= pts.length - 1) return pts[pts.length - 1]

            const p1 = pts[i]
            const p2 = pts[i + 1]
            const segmentProgress = (progress - p1) / (p2 - p1)

            // 30% threshold logic (Bidirectional)
            if (scrollDirection > 0) {
              return segmentProgress > 0.3 ? p2 : p1
            } else {
              return segmentProgress < 0.7 ? p1 : p2
            }
          },
          duration: { min: 0.4, max: 0.8 },
          delay: 0.1,
          ease: 'power2.inOut'
        }
      }
    })

    const overlay = expansionCard.value.querySelector('.expansion-card__overlay')

    mainTimeline.to(sceneWrapper.value, {
      '--expansion-width': () => `${collapsedPanelWidth()}px`,
      duration: 1.6,
      ease: 'power2.inOut'
    }, 0)

    mainTimeline.to(overlay, {
      background: 'rgba(16, 32, 58, 0.66)',
      duration: 1.6
    }, 0)

    mainTimeline.to(heroHorizontal.value, {
      autoAlpha: 0,
      y: -24,
      duration: 0.45
    }, 0.9)

    mainTimeline.to(horizontalTrack.value, {
      x: () => xMult * collapsedPanelWidth(),
      duration: 1,
      ease: 'power2.inOut'
    }, 1.35)

    mainTimeline.to(horizontalTrack.value, {
      x: () => xMult * totalTravel(),
      duration: slides.length - 1,
      ease: 'none'
    }, 2.35)

    return () => {
      resizeObserver?.disconnect()
      resizeObserver = null
      mainTimeline?.scrollTrigger?.kill()
      mainTimeline?.kill()
      mainTimeline = null
    }
  })
}

onMounted(() => {
  initDesktopScene()
})

watch(locale, async () => {
  await nextTick()
  initDesktopScene()
  ScrollTrigger.refresh()
})

onBeforeUnmount(() => {
  cleanupDesktopScene()
})
</script>

<style scoped>
.inspecciones-parallax-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  --expansion-width: 100vw;
}

.desktop-immersive-scene { display: none; }
.mobile-only-content { display: block; }

.section--dark {
  padding: 60px 0;
}

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

.inspection-featured {
  margin: 10px 0 68px;
  padding: 34px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 42px rgba(16, 32, 58, 0.12);
}

.inspection-featured__content p {
  max-width: 68ch;
}

.inspection-featured__list {
  margin-top: 26px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 24px;
}

.inspection-featured__list li {
  position: relative;
  padding-inline-start: 24px;
  color: var(--color-text);
  line-height: 1.7;
}

.inspection-featured__list li::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 11px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

.inspection-block-premium__content h3 {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  color: var(--color-white);
  line-height: 1.1;
  margin: 0 0 16px;
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
    overflow: hidden;
  }

  .slides-horizontal-viewport {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .slides-horizontal-track {
    display: flex;
    height: 100%;
    will-change: transform;
  }

  .expansion-panel {
    flex: 0 0 var(--expansion-width);
    width: var(--expansion-width);
    height: 100%;
    position: relative;
    overflow: hidden;
    z-index: 6;
    min-width: 0;
    max-width: var(--expansion-width);
    will-change: width;
  }

  .expansion-card {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    container-type: inline-size;
    z-index: 2;
  }

  .expansion-card__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .expansion-card__overlay {
    position: absolute;
    inset: 0;
    background: rgba(77, 121, 184, 0.4);
    z-index: 1;
  }

  .expansion-card__inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    z-index: 2;
    overflow: hidden;
  }

  .intro-box {
    grid-area: 1 / 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 32px 40px;
    overflow: hidden;
  }

  .intro-box--vertical {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    white-space: nowrap;
    place-self: center;
    width: auto;
    opacity: 0;
    visibility: hidden;
    padding: 28px 12px;
  }

  .intro-box--horizontal {
    white-space: nowrap;
    place-self: center;
  }

  .intro-label {
    margin: 0 0 24px;
    color: var(--color-accent-light) !important;
    font-size: 0.75rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.25em !important;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .intro-title {
    font-family: var(--font-heading) !important;
    font-size: clamp(2rem, 8cqw, 4.5rem) !important;
    font-weight: 400 !important;
    line-height: 1.05;
    color: var(--color-white) !important;
    text-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    max-width: none;
  }

  .intro-box--vertical .intro-title {
    font-size: clamp(1.9rem, 5.2cqw, 3rem) !important;
    line-height: 0.92;
    letter-spacing: 0.06em;
  }

  .intro-box--vertical .intro-label {
    margin-bottom: 14px;
    font-size: 0.68rem !important;
  }

  .content-slide-horizontal {
    flex: 0 0 100vw;
    width: 100vw;
    height: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8vw;
  }

  .slide-inner-box {
    width: 100%;
    max-width: 1500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inspection-block-premium {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 56px;
    align-items: center;
    padding: 130px 0 60px;
  }

  .inspection-block-premium--reverse {
    grid-template-columns: 0.9fr 1.1fr;
  }

  .inspection-block-premium--reverse .inspection-block-premium__content { order: 2; }
  .inspection-block-premium--reverse .inspection-block-premium__media { order: 1; }

  .frame-premium {
    width: 100%;
    max-width: 600px;
    aspect-ratio: 1 / 1;
    height: auto;
    justify-self: center;
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

  .inspection-featured {
    padding: 26px 22px;
  }

  .inspection-featured__list {
    grid-template-columns: 1fr;
  }
}
</style>
