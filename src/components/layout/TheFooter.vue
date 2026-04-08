<template>
  <footer class="footer">
    <div class="container footer__top">
      <div class="footer__brand">
        <RouterLink to="/" class="footer__brand-link">
          <span class="footer__brand-name">REGLADO CONSULTORES Y ABOGADOS</span>
        </RouterLink>

        <p class="footer__brand-desc">
          {{ t('footer.brand_desc') }}
        </p>

        <div class="footer__social">
          <a href="https://www.linkedin.com/in/reglado-consultores-90b7a0233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="footer__social-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/regladoconsultores" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer__social-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
        </div>
      </div>

      <nav class="footer__column" :aria-label="t('footer.nav_title')">
        <h3 class="footer__pill-title">{{ t('footer.nav_title') }}</h3>
        <div class="footer__nav-links">
          <a href="/#sobre-nosotros" @click.prevent="scrollTo('sobre-nosotros')">{{ t('nav.about') }}</a>
          <a href="/#inspecciones-tributarias" @click.prevent="scrollTo('inspecciones-tributarias')">{{ t('nav.services_list.inspecciones') }}</a>
          <a href="/#consultoria-juridica" @click.prevent="scrollTo('consultoria-juridica')">{{ t('nav.services_list.juridica') }}</a>
          <a href="/#consultoria-tecnica" @click.prevent="scrollTo('consultoria-tecnica')">{{ t('nav.services_list.tecnica') }}</a>
          <a href="/#consultoria-economica" @click.prevent="scrollTo('consultoria-economica')">{{ t('nav.services_list.economica') }}</a>
          <a href="/#contacto" @click.prevent="scrollTo('contacto')">{{ t('nav.contact') }}</a>
        </div>
      </nav>

      <div class="footer__column footer__contacts">
        <h3 class="footer__pill-title">{{ t('footer.contact_title') }}</h3>

        <div class="footer__contact-line">
          <span class="footer__contact-label">{{ t('footer.phone_label') }}:</span>
          <a href="tel:+34911462674">+34 911 462 674</a>
        </div>

        <div class="footer__contact-line">
          <span class="footer__contact-label">{{ t('footer.office_label') }}:</span>
          <span>{{ t('footer.office_address') }}</span>
        </div>

        <div class="footer__contact-line">
          <span class="footer__contact-label">{{ t('footer.email_label') }}:</span>
          <a href="mailto:info@regladoconsultores.com">info@regladoconsultores.com</a>
        </div>
      </div>
    </div>

    <div class="container footer__bottom">
      <p class="footer__copy">{{ t('footer.copy') }}</p>

      <div class="footer__bottom-right">
        <div class="footer__links">
          <RouterLink to="/aviso-legal">{{ t('footer.links.legal_privacy') }}</RouterLink>
          <RouterLink to="/politica-cookies">{{ t('footer.links.cookies') }}</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScroll } from '../../composables/useScroll'

const { t } = useI18n()
const { scrollTo } = useScroll()
</script>

<style scoped>
.footer {
  padding: 58px 0 26px;
  background: linear-gradient(180deg, var(--color-navy), var(--color-navy-deep));
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer__top {
  display: grid;
  grid-template-columns: 1.15fr 0.9fr 0.95fr;
  gap: 54px;
  padding-bottom: 28px;
}

.footer__brand-link {
  display: inline-block;
  text-decoration: none;
}

.footer__brand-name {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 38px;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.88);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.96);
}

.footer__brand-desc {
  margin: 22px 0 0;
  max-width: 430px;
  color: rgba(255, 255, 255, 0.74);
  font-size: 0.98rem;
  line-height: 1.7;
}

.footer__column {
  display: grid;
  align-content: start;
}

.footer__pill-title {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 38px;
  margin: 0 0 22px;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.88);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.96);
}

.footer__nav-links {
  display: grid;
  gap: 10px;
}

.footer__nav-links a,
.footer__contact-line span,
.footer__contact-line a {
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.98rem;
  line-height: 1.65;
  text-decoration: none;
  transition: color var(--transition);
}

.footer__nav-links a:hover,
.footer__contact-line a:hover,
.footer__links a:hover {
  color: var(--color-white);
}

.footer__contacts {
  gap: 12px;
}

.footer__contact-line {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 8px;
  align-items: start;
}

.footer__contact-label {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.96);
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  flex-wrap: wrap;
}

.footer__bottom-right {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.footer__social {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-top: 20px;
}

.footer__social-link {
  color: rgba(255, 255, 255, 0.55);
  transition: color var(--transition), transform var(--transition);
  display: flex;
  align-items: center;
}

.footer__social-link:hover {
  color: var(--color-white);
  transform: translateY(-2px);
}

.footer__copy {
  margin: 0;
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.92rem;
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.footer__links a {
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.92rem;
  text-decoration: none;
  transition: color var(--transition);
}

@media (max-width: 1080px) {
  .footer__top {
    grid-template-columns: 1fr 1fr;
  }

  .footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 46px 0 22px;
  }

  .footer__top {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer__brand-name,
  .footer__pill-title {
    font-size: 1rem;
  }

  .footer__brand-desc,
  .footer__nav-links a,
  .footer__contact-line span,
  .footer__contact-line a,
  .footer__copy,
  .footer__links a {
    font-size: 0.92rem;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
