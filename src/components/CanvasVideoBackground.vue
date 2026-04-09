<template>
  <div class="canvas-container" :class="{ 'is-loading': !isReady }">
    <div v-if="!isReady" class="canvas-loader">
      <div class="loader-spinner"></div>
    </div>
    <canvas ref="canvas2Ref" class="canvas-bg" :style="{ opacity: opacity2 }"></canvas>
    <canvas ref="canvas1Ref" class="canvas-bg" :style="{ opacity: opacity1 }"></canvas>
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

const canvas1Ref = ref(null);
const canvas2Ref = ref(null);
const opacity1 = ref(0);
const opacity2 = ref(1);
const isReady = ref(false);

const images1 = [];
const images2 = [];
const playhead1 = { frame: 0 };
const playhead2 = { frame: 0 };

let lastDrawnFrame1 = -1;
let lastDrawnFrame2 = -1;

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

const render = (canvas, images, frame, id) => {
  if (!canvas || !images[frame]) return;
  
  // Evitar redibujar el mismo frame
  if (id === 1 && frame === lastDrawnFrame1) return;
  if (id === 2 && frame === lastDrawnFrame2) return;

  const img = images[frame];
  if (!img.complete) return;

  if (id === 1) lastDrawnFrame1 = frame;
  if (id === 2) lastDrawnFrame2 = frame;

  const ctx = canvas.getContext('2d', { alpha: false }); // Optimización: sin alpha si no es necesario
  
  // Guardamos el aspect ratio para no recalcularlo si no ha cambiado el canvas
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
  
  if (canvas1Ref.value) {
    canvas1Ref.value.width = w;
    canvas1Ref.value.height = h;
    render(canvas1Ref.value, images1, Math.round(playhead1.frame));
  }
  if (canvas2Ref.value) {
    canvas2Ref.value.width = w;
    canvas2Ref.value.height = h;
    render(canvas2Ref.value, images2, Math.round(playhead2.frame));
  }
};

onMounted(async () => {
  // Cargamos secuencias
  await Promise.all([
    preloadSequence(props.video2, images2),
    preloadSequence(props.video1, images1)
  ]);

  isReady.value = true;
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Forzar primer render
  render(canvas2Ref.value, images2, 0);

  // Animación VIDEO 2 (Intro -> Servicios)
  gsap.to(playhead2, {
    frame: props.video2.frameCount - 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      endTrigger: "#sobre-nosotros",
      end: "bottom bottom",
      scrub: 1, // Reducimos de 1.5 a 1 para respuesta más directa y menos frames intermedios
      onUpdate: () => render(canvas2Ref.value, images2, Math.round(playhead2.frame), 2)
    }
  });

  // Transición Fade Out Video 2 (Mantenemos hasta servicios)
  gsap.to(opacity2, {
    value: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".section-servicios-trigger",
      start: "top center",
      end: "top top",
      scrub: true,
      onUpdate: (self) => { opacity2.value = 1 - self.progress }
    }
  });

  // Animación VIDEO 1 (Segunda secuencia: Inspecciones -> Jurídica)
  gsap.to(playhead1, {
    frame: props.video1.frameCount - 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#inspecciones-tributarias",
      start: "top bottom",
      endTrigger: "#consultoria-juridica",
      end: "bottom top",
      scrub: 1,
      onUpdate: () => render(canvas1Ref.value, images1, Math.round(playhead1.frame), 1)
    }
  });

  // Transición Fade In Video 1
  gsap.to(opacity1, {
    value: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#inspecciones-tributarias",
      start: "top bottom",
      end: "+=600",
      scrub: true,
      onUpdate: (self) => { opacity1.value = self.progress }
    }
  });

  // Transición Fade Out Video 1 (Desaparece al finalizar Consultoría Jurídica)
  gsap.to(opacity1, {
    value: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "#consultoria-juridica",
      start: "bottom center",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => { opacity1.value = 1 - self.progress }
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
  background-color: #1a335a; /* Cambiado de #000 a Azul corporativo */
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
