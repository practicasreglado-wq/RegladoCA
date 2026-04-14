<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import fallbackImage from '@/assets/images/f1.jpg'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  video: {
    type: Object,
    default: () => ({ name: 'video2', frameCount: 763 })
  }
})

const canvasRef = ref(null)
const opacity = ref(1)
const isReady = ref(false)
const showFallback = ref(false)
const useStaticFallback = ref(false)

const images = []
const playhead = { frame: 0 }

let lastDrawnFrame = -1
let ctx = null
const drawParams = { w: 0, h: 0, x: 0, y: 0 }

let playheadTween = null
let opacityTween = null

const shouldUseStaticFallback = () => {
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const saveData = navigator.connection?.saveData
  const slowConnection = ['slow-2g', '2g'].includes(navigator.connection?.effectiveType || '')
  const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4
  const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4

  return Boolean(reducedMotion || saveData || slowConnection || lowMemory || lowCpu)
}

const preloadSequence = async (video, imagesArray) => {
  const loadPromises = []
  const TOTAL_PRIORITY = 30

  for (let i = 1; i <= video.frameCount; i++) {
    const img = new Image()
    const promise = new Promise((resolve) => {
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
    })

    if (i <= TOTAL_PRIORITY) {
      img.src = `/frames/${video.name}/frame_${String(i).padStart(4, '0')}.webp`
      loadPromises.push(promise)
    } else {
      setTimeout(() => {
        if (!img.src) img.src = `/frames/${video.name}/frame_${String(i).padStart(4, '0')}.webp`
      }, 1000 + (i * 2))
    }

    imagesArray.push(img)
  }

  await Promise.all(loadPromises)
}

const updateDrawParams = (canvas, img, params) => {
  if (!canvas || !img || !img.width || !img.height) return

  const canvasAspect = canvas.width / canvas.height
  const imgAspect = img.width / img.height

  if (canvasAspect > imgAspect) {
    params.w = canvas.width
    params.h = canvas.width / imgAspect
    params.x = 0
    params.y = (canvas.height - params.h) / 2
  } else {
    params.w = canvas.height * imgAspect
    params.h = canvas.height
    params.x = (canvas.width - params.w) / 2
    params.y = 0
  }
}

const render = (canvas, images, frame) => {
  if (!canvas || !images[frame] || !ctx) return
  if (frame === lastDrawnFrame) return

  const img = images[frame]
  if (!img.complete || !img.width || !img.height) return

  updateDrawParams(canvas, img, drawParams)

  lastDrawnFrame = frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, drawParams.x, drawParams.y, drawParams.w, drawParams.h)
}

const resizeCanvas = () => {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = window.innerWidth
  const h = window.innerHeight

  if (canvasRef.value) {
    canvasRef.value.width = w * dpr
    canvasRef.value.height = h * dpr
    canvasRef.value.style.width = `${w}px`
    canvasRef.value.style.height = `${h}px`

    ctx = canvasRef.value.getContext('2d', { alpha: false })
    if (ctx) {
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'medium'
    }

    if (images.length > 0 && images[0]?.complete) {
      updateDrawParams(canvasRef.value, images[0], drawParams)
    }

    lastDrawnFrame = -1
    render(canvasRef.value, images, Math.round(playhead.frame))
  }
}

onMounted(async () => {
  useStaticFallback.value = shouldUseStaticFallback()
  showFallback.value = useStaticFallback.value

  if (useStaticFallback.value) {
    return
  }

  await preloadSequence(props.video, images)
  isReady.value = true

  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()
  render(canvasRef.value, images, 0)

  playheadTween = gsap.to(playhead, {
    frame: props.video.frameCount - 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      endTrigger: '#sobre-nosotros',
      end: 'top top',
      scrub: 1,
      onUpdate: () => render(canvasRef.value, images, Math.round(playhead.frame))
    }
  })

  opacityTween = gsap.to(opacity, {
    value: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-servicios-trigger',
      start: 'top top',
      endTrigger: '#sobre-nosotros',
      end: 'top top',
      scrub: true,
      onUpdate: (self) => {
        opacity.value = 1 - self.progress
      }
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)

  playheadTween?.scrollTrigger?.kill()
  playheadTween?.kill()

  opacityTween?.scrollTrigger?.kill()
  opacityTween?.kill()
})
</script>

<template>
  <div 
    class="video-background-container" 
    :style="{ opacity: opacity }"
    v-show="!useStaticFallback || showFallback"
  >
    <canvas 
      ref="canvasRef" 
      class="video-canvas"
      :class="{ 'is-ready': isReady }"
    ></canvas>
    <div class="video-overlay"></div>
    
    <div 
      v-if="showFallback" 
      class="fallback-image"
      :style="{ backgroundImage: `url(${fallbackImage})` }"
    ></div>
  </div>
</template>

<style scoped>
.video-background-container {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  background-color: #0a0a0a;
  overflow: hidden;
  will-change: opacity;
}

.video-canvas {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.video-canvas.is-ready {
  opacity: 1;
}

.video-overlay {
  position: absolute;
  inset: 0;
  background: rgba(77, 121, 184, 0.4);
  z-index: 1;
}

.fallback-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 1;
}
</style>