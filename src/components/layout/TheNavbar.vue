<template>
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }" :dir="isRtl ? 'rtl' : 'ltr'">
    <div class="container navbar__inner">
      <a href="/" @click.prevent="scrollToTop" class="navbar__brand">
        <img
          :src="isScrolled ? symbolDark : symbolLight"
          alt="Reglado simbolo"
          class="navbar__brand-symbol"
        />
        <img
          :src="sloganLight"
          alt="Reglado Consultores & Abogados"
          :class="['navbar__brand-slogan', { 'navbar__brand-slogan--scrolled': isScrolled }]"
        />
      </a>

      <nav class="navbar__nav" :class="{ 'navbar__nav--open': mobileOpen }">
        <a class="navbar__link" @click.prevent="handleScroll('sobre-nosotros')" href="/#sobre-nosotros">
          {{ t('nav.about') }}
        </a>

        <div class="dropdown">
          <button class="navbar__link dropdown__trigger" type="button">
            {{ t('nav.services') }}
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <div class="dropdown__panel">
            <a @click.prevent="handleScroll('inspecciones-tributarias')" href="/#inspecciones-tributarias">{{ t('nav.services_list.inspecciones') }}</a>
            <a @click.prevent="handleScroll('consultoria-juridica')" href="/#consultoria-juridica">{{ t('nav.services_list.juridica') }}</a>
            <a @click.prevent="handleScroll('consultoria-tecnica')" href="/#consultoria-tecnica">{{ t('nav.services_list.tecnica') }}</a>
            <a @click.prevent="handleScroll('consultoria-economica')" href="/#consultoria-economica">{{ t('nav.services_list.economica') }}</a>
          </div>
        </div>

        <a class="navbar__link" @click.prevent="handleScroll('contacto')" href="/#contacto">
          {{ t('nav.contact') }}
        </a>

        <a class="navbar__link" href="https://regladogroup.com" target="_blank">
          {{ t('nav.group') }}
        </a>

        <div class="lang-switcher">
          <button
            v-for="loc in locales"
            :key="loc.code"
            class="lang-btn"
            :class="{ active: locale === loc.code }"
            @click="switchLocale(loc.code)"
          >
            <span class="lang-btn__flag" :class="`lang-btn__flag--${loc.code}`" aria-hidden="true"></span>
          </button>
        </div>
      </nav>

      <button
        class="navbar__burger"
        :class="{ open: mobileOpen }"
        @click="mobileOpen = !mobileOpen"
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import symbolLight from '../../../media/REGLADO_Blanco_Symbol.png'
import symbolDark from '../../../media/REGLADO_Oscuro_Symbol.png'
import sloganLight from '../../../media/REGLADO_Blanco_slogan-e1643969373411.png'

import { useScroll } from '../../composables/useScroll'

const { t, locale } = useI18n()
const { scrollTo, scrollToTop } = useScroll()
const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const mobileOpen = ref(false)

const locales = [
  { code: 'es' },
  { code: 'en' },
  { code: 'ar' }
]

const isRtl = computed(() => locale.value === 'ar')

function switchLocale(code) {
  locale.value = code
  localStorage.setItem('locale', code)
  document.documentElement.setAttribute('dir', code === 'ar' ? 'rtl' : 'ltr')
  document.documentElement.setAttribute('lang', code)
  mobileOpen.value = false
}

function handleScroll(anchor) {
  mobileOpen.value = false
  scrollTo(anchor)
}

// List of selectors for dark sections where the navbar should be transparent (light text)
const darkSelectors = [
  '.hero',
  '.about-showcase',
  '.page-hero',
  '.juridica-hero',
  '.juridica-banner',
  '.tecnica-hero',
  '.tecnica-banner',
  '.economica-hero',
  '.economica-banner',
  '.banner-section',
  '.about-immersive-scene'
]

function onScroll() {
  const scrollPos = window.scrollY
  const navbarHeight = 80
  const checkPoint = scrollPos + (navbarHeight / 2)

  // Por defecto, blanco si hemos bajado más de 20px
  let isOverDark = false

  // Siempre es transparente/claro al inicio absoluto del scroll
  if (scrollPos < 20) {
    isOverDark = true
  } else {
    // Verificamos colisión con secciones oscuras
    for (const selector of darkSelectors) {
      const elements = document.querySelectorAll(selector)
      for (const el of elements) {
        const rect = el.getBoundingClientRect()
        const top = rect.top + scrollPos
        const bottom = rect.bottom + scrollPos
        
        // Margen extra para suavizar la transición
        if (checkPoint >= top - 2 && checkPoint <= bottom + 2) {
          isOverDark = true
          break
        }
      }
      if (isOverDark) break
    }
  }

  isScrolled.value = !isOverDark
}

onMounted(() => {
  window.addEventListener('resize', onScroll, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // Initial check
  const saved = localStorage.getItem('locale') || 'es'
  document.documentElement.setAttribute('dir', saved === 'ar' ? 'rtl' : 'ltr')
  document.documentElement.setAttribute('lang', saved)
})

onUnmounted(() => {
  window.removeEventListener('resize', onScroll)
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: 100;
  padding: 20px 0;
  background: linear-gradient(180deg, rgba(16, 32, 58, 0.82), rgba(16, 32, 58, 0.18));
  transition: background var(--transition), padding var(--transition), box-shadow var(--transition);
}

.navbar--scrolled {
  background: rgba(255, 255, 255, 0.75);
  padding: 12px 0;
  box-shadow: 0 10px 28px rgba(16, 32, 58, 0.08);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.navbar__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
  min-width: 0;
}

.navbar__brand:hover .navbar__brand-symbol {
  transform: rotate(90deg);
}

.navbar__brand-symbol {
  width: 68px;
  height: 68px;
  object-fit: contain;
  flex: 0 0 auto;
  transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.navbar__brand-slogan {
  width: 424px;
  height: 66px;
  object-fit: contain;
  object-position: left center;
  flex: 0 0 auto;
}

.navbar__brand-slogan--scrolled {
  filter: brightness(0) saturate(100%) invert(22%) sepia(27%) saturate(1115%) hue-rotate(179deg) brightness(93%) contrast(93%);
}

.navbar__nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.navbar__link {
  background: none;
  border: none;
  font-size: 0.88rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  letter-spacing: 0.03em;
  cursor: pointer;
  padding: 0;
  transition: color var(--transition);
  text-decoration: none;
}

.navbar__link:hover,
.router-link-active.navbar__link {
  color: var(--color-accent-light);
}

.navbar--scrolled .navbar__link {
  color: var(--color-navy);
}

.navbar--scrolled .navbar__link:hover,
.navbar--scrolled .router-link-active.navbar__link {
  color: var(--color-accent);
}

.dropdown {
  position: relative;
}

.dropdown__trigger {
  display: flex;
  align-items: center;
  gap: 6px;
}

.chevron {
  font-size: 0.9rem;
  line-height: 1;
}

.dropdown__panel {
  display: none;
  position: absolute;
  inset-block-start: calc(100% + 14px);
  inset-inline-start: 0;
  min-width: 260px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.dropdown:hover .dropdown__panel,
.dropdown:focus-within .dropdown__panel {
  display: block;
}

.dropdown__panel a {
  display: block;
  padding: 12px 20px;
  font-size: 0.85rem;
  color: #10203a !important;
  border-bottom: 1px solid var(--color-border);
  transition: background var(--transition), color var(--transition);
}

.dropdown__panel a:last-child {
  border-bottom: none;
}

.dropdown__panel a:hover {
  background: var(--color-navy);
  color: var(--color-white) !important;
}

.lang-switcher {
  display: flex;
  gap: 4px;
  border-inline-start: 1px solid rgba(255, 255, 255, 0.2);
  padding-inline-start: 20px;
}

.navbar--scrolled .lang-switcher {
  border-color: var(--color-border);
}

.lang-btn {
  background: none;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  transition: transform var(--transition), opacity var(--transition);
  cursor: pointer;
  opacity: 0.72;
}

.lang-btn:hover,
.lang-btn.active {
  opacity: 1;
  transform: translateY(-1px);
}

.lang-btn__flag {
  position: relative;
  width: 20px;
  height: 14px;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
}

.navbar--scrolled .lang-btn__flag {
  box-shadow: 0 0 0 1px rgba(32, 59, 99, 0.18);
}

.lang-btn__flag--es {
  background: linear-gradient(
    180deg,
    #c81d25 0%,
    #c81d25 25%,
    #f2c230 25%,
    #f2c230 75%,
    #c81d25 75%,
    #c81d25 100%
  );
}

.lang-btn__flag--en {
  background-color: #012169;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3CclipPath id='t'%3E%3Cpath d='M0,0 v30 h60 v-30 z'/%3E%3C/clipPath%3E%3Cpath d='M0,0 v30 h60 v-30 z' fill='%23012169'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23fff' stroke-width='6' clip-path='url(%23t)'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23C8102E' stroke-width='4' clip-path='url(%23t)'/%3E%3Cpath d='M30,0 v30 M0,15 h60' stroke='%23fff' stroke-width='10'/%3E%3Cpath d='M30,0 v30 M0,15 h60' stroke='%23C8102E' stroke-width='6'/%3E%3C/svg%3E");
  background-size: cover;
  background-position: center;
}

.lang-btn__flag--ar {
  background: #c1272d;
}

.lang-btn__flag--ar::before {
  content: '★';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0b8f49;
  font-size: 10px;
  line-height: 1;
}

.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 6px;
  z-index: 101;
}

.navbar__burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-white);
  border-radius: 2px;
  transition: background var(--transition), transform 0.3s, opacity 0.3s;
}

.navbar--scrolled .navbar__burger span {
  background: var(--color-navy);
}

.navbar__burger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar__burger.open span:nth-child(2) {
  opacity: 0;
}

.navbar__burger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 1080px) {
  .navbar__brand-symbol {
    width: 58px;
    height: 58px;
  }

  .navbar__brand-slogan {
    width: 348px;
    height: 55px;
  }

  .navbar__nav {
    gap: 18px;
  }
}

@media (max-width: 900px) {
  .navbar__burger {
    display: flex;
  }

  .navbar__brand {
    gap: 8px;
  }

  .navbar__brand-symbol {
    width: 48px;
    height: 48px;
  }

  .navbar__brand-slogan {
    width: 282px;
    height: 44px;
  }

  .navbar__nav {
    display: none;
    position: fixed;
    inset: 0;
    background: linear-gradient(180deg, rgba(16, 32, 58, 0.98), rgba(32, 59, 99, 0.98));
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 28px;
    z-index: 100;
  }

  .navbar__nav--open {
    display: flex;
  }

  .navbar__link {
    font-size: 1.05rem;
    color: var(--color-white) !important;
  }

  .lang-switcher {
    border: none;
    padding: 0;
  }

  .lang-btn {
    padding: 2px;
  }

  .lang-btn__flag {
    width: 22px;
    height: 15px;
  }

  .dropdown__panel {
    position: static;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    margin-top: 8px;
  }

  .dropdown__panel a {
    color: rgba(255, 255, 255, 0.8);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .dropdown:hover .dropdown__panel {
    display: block;
  }

}
</style>
