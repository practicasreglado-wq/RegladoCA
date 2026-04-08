<template>
  <Transition name="slide-up">
    <div v-if="isVisible" class="cookie-banner" :dir="isRTL ? 'rtl' : 'ltr'">
      <div class="container cookie-banner__inner">
        <p class="cookie-banner__text">
          {{ t('cookie_banner.text') }}
          <RouterLink to="/politica-cookies" class="cookie-banner__link">
            {{ t('cookie_banner.more_info') }}
          </RouterLink>
        </p>
        <button class="btn btn--primary cookie-banner__btn" @click="acceptCookies">
          {{ t('cookie_banner.accept') }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t, locale } = useI18n()
const isRTL = computed(() => locale.value === 'ar')

const isVisible = ref(false)

onMounted(() => {
  const hasAccepted = localStorage.getItem('reglado_cookies_accepted')
  if (!hasAccepted) {
    // Pequeño retraso para que la animación sea visible al cargar
    setTimeout(() => {
      isVisible.value = true
    }, 1000)
  }
})

function acceptCookies() {
  localStorage.setItem('reglado_cookies_accepted', 'true')
  isVisible.value = false
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-navy);
  color: var(--color-white);
  padding: 24px 0;
  z-index: 9999;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
}

.cookie-banner__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.cookie-banner__text {
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  opacity: 0.9;
}

.cookie-banner__link {
  color: var(--color-gold);
  text-decoration: underline;
  margin: 0 4px;
  transition: color var(--transition);
}

.cookie-banner__link:hover {
  text-decoration: none;
  color: #e0c266; /* var(--color-gold-light) fallback */
}

.cookie-banner__btn {
  white-space: nowrap;
  padding: 10px 24px;
  font-size: 0.9rem;
}

/* RTL Support */
.cookie-banner[dir="rtl"] .cookie-banner__inner {
  flex-direction: row-reverse;
}

/* Animación */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .cookie-banner__inner {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .cookie-banner[dir="rtl"] .cookie-banner__inner {
    flex-direction: column;
  }
}
</style>
