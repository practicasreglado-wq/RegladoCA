<template>
  <div class="canvas-container">
    <div v-if="!isReady && !showFallback" class="canvas-loader">
      <div class="loader-spinner"></div>
    </div>

    <div
      v-if="showFallback"
      class="canvas-fallback"
      :style="{ backgroundImage: `url(${fallbackImage})` }"
    ></div>

    <template v-else>
      <canvas
        ref="canvasRef"
        class="canvas-bg"
        :style="{ opacity: isReady ? opacity : 0 }"
      ></canvas>

      <div
        class="canvas-overlay"
        :style="{ opacity: isReady ? opacity : 0 }"
      ></div>
    </template>
  </div>
</template>

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
        if (!img.src) {
          img.src = `/frames/${video.name}/frame_${String(i).padStart(4, '0')}.webp`
        }
      }, 1000 + i * 2)
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
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    if (images.length > 0 && images[0]?.complete) {
      updateDrawParams(
        {
          width: w,
          height: h
        },
        images[0],
        drawParams
      )
    }

    lastDrawnFrame = -1
    render(
      {
        width: w,
        height: h
      },
      images,
      Math.round(playhead.frame)
    )
  }
}

onMounted(async () => {
  useStaticFallback.value = shouldUseStaticFallback()
  showFallback.value = useStaticFallback.value

  if (useStaticFallback.value) return

  await preloadSequence(props.video, images)
  isReady.value = true

  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()
  render(
    {
      width: window.innerWidth,
      height: window.innerHeight
    },
    images,
    0
  )

  playheadTween = gsap.to(playhead, {
    frame: props.video.frameCount - 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      endTrigger: '#sobre-nosotros',
      end: 'top top',
      scrub: 1,
      onUpdate: () => {
        render(
          {
            width: window.innerWidth,
            height: window.innerHeight
          },
          images,
          Math.round(playhead.frame)
        )
      }
    }
  })

  opacityTween = gsap.to(opacity, {
    value: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-servicios-trigger',
      start: 'top top',
      endTrigger: '#sobre-nosotros',
      end: 'top 20%',
      scrub: true,
      onUpdate: (self) => {
        opacity.value = 1 - self.progress

        if (canvasRef.value) {
          if (self.progress >= 1) {
            gsap.set(canvasRef.value, { visibility: 'hidden' })
          } else {
            gsap.set(canvasRef.value, { visibility: 'visible' })
          }
        }
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

<style scoped>
.canvas-container {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-color: #10203a;
  pointer-events: none;
  overflow: hidden;
}

.canvas-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  transition: opacity 0.8s ease;
}

.canvas-overlay {
  position: absolute;
  inset: 0;
  background: rgba(77, 121, 184, 0.4);
  pointer-events: none;
  transition: opacity 0.8s ease;
}

.canvas-fallback {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
  to {
    transform: rotate(360deg);
  }
}
</style>