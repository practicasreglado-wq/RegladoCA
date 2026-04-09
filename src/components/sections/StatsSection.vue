<template>
  <section ref="statsSection" class="stats" :class="{ 'stats--visible': isVisible }">
    <div class="container stats__grid">
      <div v-for="stat in animatedStats" :key="stat.label" class="stat-item">
        <div class="stat-item__number">{{ stat.prefix }}{{ stat.display }}</div>
        <div class="stat-item__label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()

const statsSection = ref(null)
const isVisible = ref(false)
const progress = ref(0)
let observer
let frameId

const rawStats = computed(() => tm('stats'))

const parsedStats = computed(() =>
  rawStats.value.map((item) => {
    const raw = String(item.value)
    const compact = raw.toUpperCase().includes('K')
    const suffix = raw.includes('%') ? '%' : ''
    const numericBase = Number(raw.replace(/[^\d]/g, '')) || 0
    const numeric = compact ? numericBase * 1000 : numericBase
    const prefix = '+'

    return {
      ...item,
      numeric,
      compact,
      suffix,
      prefix
    }
  })
)

const animatedStats = computed(() =>
  parsedStats.value.map((item) => {
    const current = Math.round(item.numeric * progress.value)
    let display = `${current}${item.suffix}`

    if (item.compact) {
      if (progress.value >= 1) {
        display = '1K'
      } else {
        display = `${Math.min(current, 999)}`
      }
    }

    return {
      ...item,
      display
    }
  })
)

function animateStats() {
  const duration = 1500
  const start = performance.now()

  const tick = (now) => {
    const elapsed = now - start
    const ratio = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - ratio, 3)
    progress.value = eased

    if (ratio < 1) {
      frameId = requestAnimationFrame(tick)
    }
  }

  frameId = requestAnimationFrame(tick)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry?.isIntersecting) {
        isVisible.value = true
        animateStats()
        observer?.disconnect()
      }
    },
    { threshold: 0.35 }
  )

  if (statsSection.value) {
    observer.observe(statsSection.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (frameId) cancelAnimationFrame(frameId)
})
</script>

<style scoped>
.stats {
  background: transparent;
  padding: 72px 0;
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  text-align: center;
}

.stat-item {
  padding: 28px 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.stats--visible .stat-item {
  opacity: 1;
  transform: translateY(0);
}

.stats--visible .stat-item:nth-child(2) {
  transition-delay: 0.1s;
}

.stats--visible .stat-item:nth-child(3) {
  transition-delay: 0.2s;
}

.stats--visible .stat-item:nth-child(4) {
  transition-delay: 0.3s;
}

.stat-item__number {
  font-family: var(--font-heading);
  font-size: clamp(2.3rem, 3.6vw, 3.2rem);
  font-weight: 600;
  color: var(--color-accent-light);
  line-height: 1.05;
  min-height: 3.4rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums lining-nums;
  letter-spacing: -0.02em;
}

.stat-item__label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  line-height: 1.4;
  min-height: 2.3em;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .stats__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
}
</style>
