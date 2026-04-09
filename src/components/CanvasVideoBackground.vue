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
  video2: {
    type: Object,
    default: () => ({ name: 'video2', frameCount: 763 })
  },
  video1: {
    type: Object,
    default: () => ({ name: 'video', frameCount: 240 })
  }
});

const canvasRef = ref(null);
const opacity = ref(1);
const isReady = ref(false);

const images = [];
const playhead = { frame: 0 };

let lastDrawnFrame = -1;

// Precarga de imágenes inteligente: carga inicial mínima y diferida del resto
const preloadSequence = async (video, imagesArray) => {
  const loadPromises = [];
  const TOTAL_PRIORITY = 30; // Primeros frames críticos
  
  for (let i = 1; i <= video.frameCount; i++) {
    const img = new Image();
    const promise = new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
    
    // No asignamos src inmediatamente a todo
    if (i <= TOTAL_PRIORITY) {
      img.src = `/frames/${video.name}/frame_${String(i).padStart(4, '0')}.webp`;
      loadPromises.push(promise);
    } else {
      // Diferir la carga del resto un poco para dejar respirar al hilo principal
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
  
  // Evitar redibujar el mismo frame
  if (frame === lastDrawnFrame) return;

  const img = images[frame];
  if (!img.complete) return;

  lastDrawnFrame = frame;

  const ctx = canvas.getContext('2d', { alpha: false });
  
  const canvasAspect = canvas.width / canvas.height;
  const imgAspect = img.width / img.height;
  
  let drawWidth, drawHeight, drawX, drawY;
  
  if (canvasAspect > imgAspect) {
    drawWidth = canvas.width;
    drawHeight = canvas.width / imgAspect;
    drawX = 0;
    drawY = (canvas.height - drawHeight) / 2;
  } else {
    drawWidth = canvas.height * imgAspect;
    drawHeight = canvas.height;
    drawX = (canvas.width - drawWidth) / 2;
    drawY = 0;
  }
  
  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
};

const resizeCanvas = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  if (canvasRef.value) {
    canvasRef.value.width = w;
    canvasRef.value.height = h;
    render(canvasRef.value, images, Math.round(playhead.frame));
  }
};

onMounted(async () => {
  // Solo cargamos la secuencia del video2 (Hero y Servicios)
  await preloadSequence(props.video2, images);

  isReady.value = true;
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Forzar primer render
  render(canvasRef.value, images, 0);

  // Animación VIDEO PRINCIPAL (Intro -> Servicios)
  gsap.to(playhead, {
    frame: props.video2.frameCount - 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      endTrigger: "#sobre-nosotros",
      end: "top top", // Termina justo al llegar a Sobre Nosotros
      scrub: 1,
      onUpdate: () => render(canvasRef.value, images, Math.round(playhead.frame))
    }
  });

  // Transición Fade Out Video (Se desvanece al terminar servicios)
  gsap.to(opacity, {
    value: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".section-servicios-trigger",
      start: "center top", // Empieza a desvanecerse a mitad de servicios
      end: "bottom top",    // Desaparece al llegar a Sobre Nosotros
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
  background-color: #10203a; /* Azul corporativo base */
  pointer-events: none;
  transition: background-color 0.5s ease;
}

.canvas-container.is-loading {
  background-color: #10203a; /* Azul marino profundo */
}

.canvas-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  will-change: opacity, transform;
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
