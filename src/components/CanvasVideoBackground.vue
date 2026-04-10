<template>
  <div class="canvas-container" :class="{ 'is-loading': !isReady }">
    <div v-if="!isReady" class="canvas-loader">
      <div class="loader-spinner"></div>
    </div>
    <canvas ref="canvasRef" class="canvas-bg" :style="{ opacity: opacity }"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  video: {
    type: Object,
    default: () => ({ name: 'video2', frameCount: 763 })
  }
});

const canvasRef = ref(null);
const opacity = ref(1);
const isReady = ref(false);

const images = [];
const playhead = { frame: 0 };
let lastDrawnFrame = -1;

// Caches para optimización
let ctx = null;
const drawParams = { w: 0, h: 0, x: 0, y: 0 };

// Precarga de imágenes inteligente
const preloadSequence = async (video, imagesArray) => {
  const loadPromises = [];
  const TOTAL_PRIORITY = 30; // Primeros frames críticos
  
  for (let i = 1; i <= video.frameCount; i++) {
    const img = new Image();
    const promise = new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
    
    if (i <= TOTAL_PRIORITY) {
      img.src = `/frames/${video.name}/frame_${String(i).padStart(4, '0')}.webp`;
      loadPromises.push(promise);
    } else {
      setTimeout(() => {
        if (!img.src) img.src = `/frames/${video.name}/frame_${String(i).padStart(4, '0')}.webp`;
      }, 1000 + (i * 2)); 
    }
    
    imagesArray.push(img);
  }
  
  await Promise.all(loadPromises);
};

const render = (canvas, images, frame) => {
  if (!canvas || !images[frame]) return;
  if (frame === lastDrawnFrame) return;

  const img = images[frame];
  if (!img.complete) return;

  lastDrawnFrame = frame;
  
  if (!ctx) return;
  ctx.drawImage(img, drawParams.x, drawParams.y, drawParams.w, drawParams.h);
};

const updateDrawParams = (canvas, img, params) => {
  if (!canvas || !img) return;
  
  const canvasAspect = canvas.width / canvas.height;
  const imgAspect = img.width / img.height;
  
  if (canvasAspect > imgAspect) {
    params.w = canvas.width;
    params.h = canvas.width / imgAspect;
    params.x = 0;
    params.y = (canvas.height - params.h) / 2;
  } else {
    params.w = canvas.height * imgAspect;
    params.h = canvas.height;
    params.x = (canvas.width - params.w) / 2;
    params.y = 0;
  }
};

const resizeCanvas = () => {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  if (canvasRef.value) {
    canvasRef.value.width = w * dpr;
    canvasRef.value.height = h * dpr;
    ctx = canvasRef.value.getContext('2d', { alpha: false });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium';
    
    if (images.length > 0) {
      updateDrawParams(canvasRef.value, images[0], drawParams);
    }
    render(canvasRef.value, images, Math.round(playhead.frame));
  }
};

onMounted(async () => {
  await preloadSequence(props.video, images);
  isReady.value = true;
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  render(canvasRef.value, images, 0);

  // Animación VIDEO (Intro -> Servicios)
  gsap.to(playhead, {
    frame: props.video.frameCount - 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      endTrigger: "#sobre-nosotros",
      end: "bottom bottom",
      scrub: 1.8,
      onUpdate: () => render(canvasRef.value, images, Math.round(playhead.frame))
    }
  });

  // Transición Fade Out Video (Mantenemos hasta servicios)
  gsap.to(opacity, {
    value: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".section-servicios-trigger",
      start: "top center",
      end: "top top",
      scrub: true,
      onUpdate: (self) => { opacity.value = 1 - self.progress }
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<style scoped>
.canvas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-color: #10203a; /* Azul marino profundo corporativo */
  pointer-events: none;
  transition: background-color 0.5s ease;
}

.canvas-container.is-loading {
  background-color: #0d1a2f;
}

.canvas-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  will-change: opacity, transform;
  mix-blend-mode: screen; /* Elimina el fondo negro de los frames */
}

.canvas-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.loader-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #4d79b8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
