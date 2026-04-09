<template>
  <div class="scroll-scrubber" ref="containerRef">
    <canvas ref="canvasRef" class="scrubber-canvas"></canvas>
    <div v-if="!isReady" class="scrubber-loader">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  name: { type: String, required: true },
  frameCount: { type: Number, required: true },
  startFrame: { type: Number, default: 1 },
  endFrame: { type: Number, default: null },
  trigger: { type: String, default: '.about-law' }
});

const canvasRef = ref(null);
const containerRef = ref(null);
const isReady = ref(false);
const images = [];
const playhead = { frame: props.startFrame };
let lastDrawnFrame = -1;

const preloadImages = async () => {
  const promises = [];
  const limit = props.endFrame !== null ? props.endFrame : props.frameCount;
  for (let i = props.startFrame; i <= limit; i++) {
    const img = new Image();
    const promise = new Promise((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
    img.src = `/frames/${props.name}/frame_${String(i).padStart(4, '0')}.webp`;
    images[i] = img; // maintain index alignment
    promises.push(promise);
  }
  // Cargamos los primeros 20 frames rápido para el render inicial
  await Promise.all(promises.slice(0, 40));
  isReady.value = true;
  
  // Refrescar triggers para asegurar que GSAP reconoce la altura y posición actual
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
};

const render = () => {
  const frame = Math.round(playhead.frame);
  if (frame === lastDrawnFrame || !canvasRef.value || !images[frame]) return;

  const img = images[frame];
  if (!img.complete) return;

  const ctx = canvasRef.value.getContext('2d', { alpha: true });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const canvas = canvasRef.value;

  // Ajuste de aspecto (contain)
  const canvasAspect = canvas.width / canvas.height;
  const imgAspect = img.width / img.height;
  
  let drawWidth, drawHeight, drawX, drawY;
  
  if (canvasAspect > imgAspect) {
    drawHeight = canvas.height;
    drawWidth = canvas.height * imgAspect;
    drawX = (canvas.width - drawWidth) / 2;
    drawY = 0;
  } else {
    drawWidth = canvas.width;
    drawHeight = canvas.width / imgAspect;
    drawX = 0;
    drawY = (canvas.height - drawHeight) / 2;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  lastDrawnFrame = frame;
};

const resize = () => {
  if (!canvasRef.value || !containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  
  canvasRef.value.width = rect.width * dpr;
  canvasRef.value.height = rect.height * dpr;
  
  render();
};

onMounted(async () => {
  await preloadImages();
  window.addEventListener('resize', resize);
  resize();

  const targetFrame = props.endFrame !== null ? props.endFrame : props.frameCount;

  gsap.to(playhead, {
    frame: targetFrame,
    ease: "none",
    scrollTrigger: {
      trigger: canvasRef.value,
      start: "center bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: render
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>

<style scoped>
.scroll-scrubber {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.scrubber-canvas {
  width: 100% !important;
  height: auto !important;
  max-height: 200%;
  object-fit: contain;
  mix-blend-mode: screen; /* Para quitar el fondo negro del video original */
  filter: brightness(1.3) contrast(1.2) saturate(0.5);
  display: block;
}

.scrubber-loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 32, 58, 0.2);
  border-radius: 20px;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: #4d79b8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
