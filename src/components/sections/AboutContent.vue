<template>
  <div class="about-content">
    <section ref="sceneRef" class="about-immersive-scene">
      <!-- FIXED BACKGROUND -->
      <div ref="bgContainer" class="scene-background">
        <video
          ref="heroVideo"
          muted
          loop
          playsinline
          class="scene-video"
        >
          <source src="/video/nosotros3.mp4" type="video/mp4" />
        </video>
        <div ref="overlayRef" class="scene-overlay"></div>
      </div>

      <!-- SEQUENTIAL CONTENT LAYERS -->
      <div class="scene-content">
        <!-- Layer 1: Global Hero -->
        <div ref="layer1" class="scene-layer scene-layer--hero">
          <div class="container text-center">
            <p class="page-hero__label">{{ t('nav.about_label', 'Reglado Consultores') }}</p>
            <h1 class="page-hero__title">{{ t('nav.about') }}</h1>
            <p class="page-hero__subtitle">{{ t('about_page.hero.title') }}</p>
          </div>
        </div>

        <!-- Layer 2: Especialistas -->
        <div ref="layer2" class="scene-layer">
          <AboutSection :title="' '" :show-cta="false" :image="aboutBg" :reverse="true" />
        </div>

        <!-- Layer 3: Valores -->
        <div ref="layer3" class="scene-layer">
          <section class="about-values no-bg">
            <div class="container about-values__header">
              <h2 class="section__title" v-html="t('about_page.truth_header.title').replace('Y La', '<br />Y La')"></h2>
              <span class="divider divider--center"></span>
            </div>
            <div class="container about-values__grid">
              <article v-for="item in tm('about_page.values')" :key="item.title" class="about-value-card">
                <h2>{{ item.title }}</h2>
                <p>{{ item.text }}</p>
              </article>
            </div>
          </section>
        </div>

        <!-- Layer 4: Métricas / Temis -->
        <div ref="layer4" class="scene-layer">
          <section class="about-law no-bg">
            <div class="container about-law__grid">
              <div class="about-law__content">
                <span class="section__label">{{ t('about_page.law_section.label') }}</span>
                <h2 class="section__title">{{ t('about_page.law_section.title') }}</h2>
                <span class="divider"></span>
                <div class="about-law__metrics">
                  <div v-for="item in tm('about_page.metrics')" :key="item.label" class="about-law__metric">
                    <div class="about-law__metric-head">
                      <span>{{ item.label }}</span>
                      <span class="about-law__metric-value">{{ item.value }}%</span>
                    </div>
                    <div class="about-law__bar">
                      <span class="about-law__bar-fill" :data-width="`${item.value}%`" style="width: 0%"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="about-law__visual">
                <ScrollScrubber name="Temis" :frame-count="240" :progress="temisProgress" />
              </div>
            </div>
          </section>
        </div>

        <!-- Layer 5: Presencia -->
        <div ref="layer5" class="scene-layer">
           <section class="about-presence no-bg">
            <div class="container about-presence__grid">
              <div class="about-presence__content">
                <span class="section__label">{{ t('about_page.presence.label') }}</span>
                <h2 class="section__title">{{ t('about_page.presence.title') }}</h2>
                <span class="divider"></span>
                <p>{{ t('about_page.presence.description') }}</p>
              </div>
              <div class="about-presence__map-card">
                <div class="about-presence__map-frame">
                  <div class="about-presence__map-grid"></div>
                  <div class="about-presence__map-pin about-presence__map-pin--one"></div>
                  <div class="about-presence__map-pin about-presence__map-pin--two"></div>
                  <div class="about-presence__map-pin about-presence__map-pin--three"></div>
                  <div class="about-presence__map-pin about-presence__map-pin--four"></div>
                  <div class="about-presence__map-placeholder"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AboutSection from '@/components/sections/AboutSection.vue'
import aboutBg from '@media/image-section-82-min.jpg'
import ScrollScrubber from '@/components/ScrollScrubber.vue'

gsap.registerPlugin(ScrollTrigger)

const { t, tm } = useI18n()
const metricsVisible = ref(false)
const heroVideo = ref(null)
const sceneRef = ref(null)
const bgContainer = ref(null)
const overlayRef = ref(null)
const layer1 = ref(null)
const layer2 = ref(null)
const layer3 = ref(null)
const layer4 = ref(null)
const layer5 = ref(null)
const temisProgress = ref(0)

onMounted(() => {
  if (sceneRef.value && heroVideo.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sceneRef.value,
        start: "top top",
        end: "+=3800",
        pin: true,
        scrub: 1,
        snap: {
          snapTo: (value, self) => {
            const labels = tl.labels;
            // Aseguramos que el 0 y el 1 (inicio y fin) entren en el cálculo del snap
            const values = [0, ...Object.values(labels).map(l => l / tl.duration()), 1];
            const uniqueValues = [...new Set(values)].sort((a, b) => a - b);
            
            // Encontrar el segmento actual [i, i+1]
            let i = 0;
            while (i < uniqueValues.length - 1 && value >= uniqueValues[i+1] - 0.001) i++;
            
            const start = uniqueValues[i];
            const end = uniqueValues[i+1];
            if (end === undefined) return start;
            
            const dist = end - start;
            if (dist <= 0) return start;
            const progressInSegment = (value - start) / dist;
            
            // Umbral asimétrico avanzado:
            // - Para avanzar (bajar): Pedimos un 40% de intención (más deliberado).
            // - Para regresar (subir): Solo un 15% de retroceso dispara el snap (muy sensible para evitar puntos muertos).
            const threshold = self.direction > 0 ? 0.4 : 0.85;
            return progressInSegment > threshold ? end : start;
          },
          duration: { min: 0.3, max: 0.6 },
          delay: 0.1,
          ease: "power2.inOut"
        },
        onEnter: () => heroVideo.value?.play(),
        onEnterBack: () => heroVideo.value?.play(),
        onLeave: () => heroVideo.value?.pause(),
        onLeaveBack: () => heroVideo.value?.pause()
      }
    });

    // 1. Estado inicial y expansión (ahora forzamos el estado encogido al inicio)
    tl.set(layer1.value, { opacity: 1, scale: 1 });

    tl.fromTo(bgContainer.value, 
      { width: "100%", height: "480px", borderRadius: "0px" },
      { 
        width: "100%", 
        height: "100vh", 
        borderRadius: "0px", 
        duration: 1.5,
        ease: "power2.inOut"
      }
    ).addLabel("L1");

    // 2. Oscurecimiento sutil y fundido de L1 (Hero)
    tl.to(overlayRef.value, { background: "rgba(16, 32, 58, 0.65)", duration: 0.5 }, "-=0.5")
      .to(layer1.value, { opacity: 0, scale: 1.05, duration: 1, delay: 0.5 });

    // 3. L2: Especialistas
    tl.fromTo(layer2.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .addLabel("L2")
      .to(layer2.value, { opacity: 0, y: -30, duration: 1, delay: 0.4 });

    // 4. L3: Valores
    tl.fromTo(layer3.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .addLabel("L3")
      .to(layer3.value, { opacity: 0, y: -30, duration: 1, delay: 0.4 });

    // 5. L4: Métricas (Temis y Barras sincronizadas)
    tl.fromTo(layer4.value, { opacity: 0, y: 30 }, { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        onStart: () => {
          metricsVisible.value = true;
          // Animación de parámetros "una vez" al entrar
          gsap.fromTo(".about-law__bar-fill", 
            { width: "0%" }, 
            { 
              width: (i, target) => target.getAttribute('data-width') || "80%", 
              duration: 1.5, 
              stagger: 0.1,
              ease: "power2.out",
              overwrite: "auto"
            }
          );
          gsap.fromTo(".about-law__metric-value", 
            { opacity: 0, y: 10 }, 
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              overwrite: "auto"
            }
          );
        }
      })
      .addLabel("L4");
    
    // La estatua inicia su giro EXACTAMENTE en la etiqueta L4 para que esté de frente al aterrizar
    tl.to(temisProgress, { value: 1, duration: 2, ease: "none" }, "L4");

    tl.to(layer4.value, { opacity: 0, y: -30, duration: 1, delay: 0.4 });

    // 6. L5: Presencia
    tl.fromTo(layer5.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .addLabel("L5");


  }
})

onBeforeUnmount(() => {
  // Limpieza adicional si fuera necesaria
})
</script>

<style scoped>
.about-immersive-scene {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: var(--color-navy); /* Solid background to cover the global canvas transition */
}

.scene-background {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%; /* Changed from 420px to 100% to avoid gaps */
  overflow: hidden;
  z-index: 1;
}

.scene-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scene-overlay {
  position: absolute;
  inset: 0;
  background: rgba(77, 121, 184, 0.4);
  z-index: 2;
}

.scene-content {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 10;
}

.scene-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  padding: 120px 0 60px;
}

.scene-layer--hero {
  opacity: 1;
}

.scene-layer :deep(.section),
.scene-layer .no-bg {
  background: transparent !important;
  box-shadow: none !important;
  color: white !important;
  padding: 0 !important;
  border: none !important;
  width: 100%;
  max-width: 1400px;
}

.scene-layer :deep(.about__media) {
  display: block !important;
}

.scene-layer :deep(.about__grid) {
  grid-template-columns: 1fr 1fr !important;
  max-width: 1200px;
  margin: 0 auto;
}

.about-immersive-scene :deep(.section__title),
.about-immersive-scene :deep(.section__label),
.about-immersive-scene :deep(p) {
  color: white !important;
}

.about-immersive-scene :deep(.divider) {
  /* Restored original gradient */
}

/* Permitir clics cuando está visible */
.scene-layer[style*="opacity: 1"] {
  pointer-events: auto;
}

.no-bg {
  background: transparent !important;
}

.about-values__header {
  margin-bottom: 54px;
}

.about-values__header .section__title {
  margin-bottom: 0;
}


.about-values__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: stretch;
}

.about-value-card {
  height: 100%;
  min-height: 340px;
  padding: 40px 32px;
  border-radius: 20px;
  background: var(--color-white) !important;
  color: #314159 !important;
  box-shadow: 0 20px 50px rgba(16, 32, 58, 0.12);
  position: relative;
  z-index: 20;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-value-card h2 {
  margin: 0 0 20px;
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 500;
  color: #10203a !important;
  line-height: 1.25;
}

.about-value-card p {
  margin: 0;
  color: #314c7a !important;
  font-size: 0.94rem;
  line-height: 1.7;
}

.about-law__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 80px;
  align-items: center;
  width: 100%;
}

.about-law__content {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.about-law__content .section__title {
  margin-bottom: 0;
  max-width: 640px;
}

.about-law__metrics {
  display: grid;
  gap: 22px;
  max-width: 680px;
}

.about-law__metric {
  display: grid;
  gap: 8px;
}

.about-law__metric-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  color: var(--color-white);
  font-size: 0.92rem;
}

.about-law__metric-value {
  opacity: 0;
  transform: translateY(10px);
  color: white !important;
  font-weight: 600;
}

.about-law__bar {
  position: relative;
  width: 100%;
  height: 18px;
  background: rgba(77, 121, 184, 0.15);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  overflow: hidden;
}

.about-law__bar-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #5f8ccd 0%, #4775b8 80%, #284a7c 100%);
  width: 0;
}

.about-law__visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 20;
}

.about-law__visual :deep(.scroll-scrubber) {
  width: 160%;
  flex-shrink: 0;
  margin-left: 0;
  height: 900px;
  max-height: none;
}

.about-presence {
  padding: 22px 0 90px;
  background: var(--color-bg-main);
}

.about-presence__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(420px, 1.1fr);
  gap: 34px;
  align-items: stretch;
}

.about-presence__content,
.about-presence__map-card {
  border-radius: 24px;
  background: var(--color-white) !important;
  box-shadow: 0 30px 70px rgba(16, 32, 58, 0.12);
  position: relative;
  z-index: 20;
}

.about-presence__content .section__title {
  color: #10203a !important;
}

.about-presence__content p {
  color: #314c7a !important;
}

.about-presence__content .section__label {
  color: var(--color-accent) !important;
}

.about-presence__content {
  padding: 42px;
  backdrop-filter: blur(12px);
}

.about-presence__content .section__label {
  color: var(--color-accent);
}

.about-presence__content .section__title {
  color: #10203a;
  margin-bottom: 0;
  max-width: 14ch;
}

.about-presence__content > p {
  margin: 0 0 30px;
  max-width: 64ch;
  color: #314159;
  line-height: 1.85;
}

.about-presence__highlights {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.about-presence__highlight {
  padding: 22px 20px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(94, 142, 207, 0.12), rgba(40, 74, 124, 0.06));
  border: 1px solid rgba(71, 117, 184, 0.14);
}

.about-presence__highlight h3 {
  margin: 0 0 10px;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 400;
  color: #10203a;
  line-height: 1.3;
}

.about-presence__highlight p {
  margin: 0;
  color: #314159;
  font-size: 0.94rem;
  line-height: 1.7;
}

.about-presence__map-card {
  padding: 24px;
  display: grid;
  gap: 16px;
  align-content: center;
}

.about-presence__map-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 22px;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(21, 45, 79, 0.96), rgba(79, 122, 184, 0.92)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}

.about-presence__map-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), transparent 100%);
}

.about-presence__map-placeholder {
  position: absolute;
  inset: 24px;
  border-radius: 18px;
  border: 1px dashed rgba(255, 255, 255, 0.34);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
}

.about-presence__map-pin {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #f5c15a;
  box-shadow:
    0 0 0 8px rgba(245, 193, 90, 0.15),
    0 10px 22px rgba(9, 19, 35, 0.24);
}

.about-presence__map-pin::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: inherit;
  background: #fff6db;
}

.about-presence__map-pin--one {
  top: 24%;
  left: 28%;
}

.about-presence__map-pin--two {
  top: 36%;
  right: 24%;
}

.about-presence__map-pin--three {
  bottom: 24%;
  left: 22%;
}

.about-presence__map-pin--four {
  bottom: 18%;
  right: 30%;
}

@media (max-width: 1080px) {
  .about-values__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-law__grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .about-law__content .section__title {
    margin-bottom: 36px;
    max-width: 760px;
  }

  .about-law__visual {
    order: 2;
  }

  .about-presence__grid {
    grid-template-columns: 1fr;
  }

  .about-presence__map-frame {
    max-width: 640px;
  }
}

@media (max-width: 768px) {


  .about-values__grid {
    grid-template-columns: 1fr;
  }

  .about-value-card {
    min-height: auto;
    padding: 28px 24px;
  }

  .about-law {
    padding: 12px 0 56px;
  }

  .about-law__content {
    padding: 10px 0;
  }

  .about-law__bar {
    height: 18px;
  }

  .about-presence {
    padding: 10px 0 64px;
  }

  .about-presence__content,
  .about-presence__map-card {
    padding: 24px;
    border-radius: 20px;
  }

  .about-presence__highlights {
    grid-template-columns: 1fr;
  }

  .about-presence__map-frame {
    max-width: none;
  }

  .about-presence__map-placeholder {
    inset: 16px;
  }
}
</style>
