<template>
  <div class="contacto-content-wrapper">
    <div class="page-hero hero--contact" :style="{ '--hero-bg': `url(${contactBg})` }">
      <div class="container">
        <p class="page-hero__label">{{ t('nav.contact') }}</p>
        <h1 class="page-hero__title">{{ t('nav.contact') }}</h1>
        <p class="page-hero__subtitle">{{ t('contact_page.hero_title') }}</p>
      </div>
    </div>

    <section class="section section--white">
      <div class="container contact__grid">

        <!-- Info -->
        <div class="contact__info">
          <h2 class="contact__info-title">{{ t('contact_page.info_title') }}</h2>
          <span class="divider"></span>

          <div class="contact__detail">
            <span class="contact__detail-label">
              <svg class="contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.21-2.21a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {{ t('footer.phone_label') }}
            </span>
            <a href="tel:+34911462674">+34 911 462 674</a>
          </div>
          <div class="contact__detail">
            <span class="contact__detail-label">
              <svg class="contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {{ t('footer.office_label') }}
            </span>
            <span>{{ t('footer.office_address') }}</span>
          </div>
          <div class="contact__detail">
            <span class="contact__detail-label">
              <svg class="contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {{ t('footer.email_label') }}
            </span>
            <a href="mailto:info@regladoconsultores.com">info@regladoconsultores.com</a>
          </div>

          <div class="contact__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.8465492323386!2d-3.617591!3d40.554903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422eb72fca5975%3A0xc0237dfb8f2d57cc!2sC.%20Isla%20Graciosa%2C%207%2C%2028703%20San%20Sebasti%C3%A1n%20de%20los%20Reyes%2C%20Madrid!5e0!3m2!1ses!2ses!4v1712557000000!5m2!1ses!2ses"
              width="100%"
              height="240"
              style="border:0; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Ubicación de Kaelis World S.L."
            ></iframe>
          </div>
        </div>

        <!-- Form -->
        <div class="contact__form-wrap">
          <h2 class="contact__info-title">{{ t('contact_page.form_title') }}</h2>
          <span class="divider"></span>

          <form class="contact__form" @submit.prevent="handleSubmit" novalidate>
            <div class="form-row">
              <div class="form-group" :class="{ error: errors.name }">
                <label for="name">{{ t('contact_page.labels.name') }}</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  :placeholder="t('contact_page.placeholders.name')"
                  @blur="validateField('name')"
                />
                <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
              </div>
              <div class="form-group" :class="{ error: errors.email }">
                <label for="email">{{ t('contact_page.labels.email') }}</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  :placeholder="t('contact_page.placeholders.email')"
                  @blur="validateField('email')"
                />
                <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="phone">{{ t('contact_page.labels.phone') }}</label>
              <input id="phone" v-model="form.phone" type="tel" :placeholder="t('contact_page.placeholders.phone')" />
            </div>

            <div class="form-group">
              <label for="subject">{{ t('contact_page.labels.subject') }}</label>
              <select id="subject" v-model="form.subject">
                <option value="" disabled>{{ t('contact_page.placeholders.subject') }}</option>
                <option value="inspecciones">{{ t('contact_page.subjects.inspecciones') }}</option>
                <option value="juridica">{{ t('contact_page.subjects.juridica') }}</option>
                <option value="tecnica">{{ t('contact_page.subjects.tecnica') }}</option>
                <option value="economica">{{ t('contact_page.subjects.economica') }}</option>
                <option value="otro">{{ t('contact_page.subjects.otro') }}</option>
              </select>
            </div>

            <div class="form-group" :class="{ error: errors.message }">
              <label for="message">{{ t('contact_page.labels.message') }}</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                :placeholder="t('contact_page.placeholders.message')"
                @blur="validateField('message')"
              ></textarea>
              <span v-if="errors.message" class="form-error">{{ errors.message }}</span>
            </div>

            <div class="form-group form-group--checkbox">
              <label class="checkbox-label">
                <input v-model="form.privacy" type="checkbox" />
                <span>{{ t('contact_page.labels.privacy_prefix') }} <RouterLink to="/aviso-legal">{{ t('contact_page.labels.privacy_link') }}</RouterLink></span>
              </label>
            </div>

            <p v-if="sendError" class="form-error" style="margin-bottom: 10px;">{{ sendError }}</p>

            <button
              type="submit"
              class="btn btn--primary btn--lg"
              :disabled="submitted || isSending || !form.privacy"
            >
              <span v-if="isSending">{{ t('contact_page.sending', 'Enviando...') }}</span>
              <span v-else-if="!submitted">{{ t('contact_page.submit') }}</span>
              <span v-else>{{ t('contact_page.success') }}</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import contactBg from '@/assets/images/contact-hero-bg.png'

const { t } = useI18n()
const submitted = ref(false)
const form = reactive({
  name: '', email: '', phone: '', subject: '', message: '', privacy: false
})
const errors = reactive({ name: '', email: '', message: '' })

function validateField(field) {
  if (field === 'name') {
    errors.name = form.name.trim() ? '' : t('contact_page.errors.name')
  }
  if (field === 'email') {
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? ''
      : t('contact_page.errors.email')
  }
  if (field === 'message') {
    errors.message = form.message.trim().length >= 10
      ? ''
      : t('contact_page.errors.message')
  }
}

const isSending = ref(false)
const sendError = ref('')

function handleSubmit() {
  validateField('name')
  validateField('email')
  validateField('message')
  
  if (errors.name || errors.email || errors.message) return
  
  isSending.value = true
  sendError.value = ''

  fetch('/api/contact.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...form })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw new Error(err.message || 'Error en el servidor') })
    }
    return response.json()
  })
  .then(data => {
    if (data.status === 'success') {
      submitted.value = true
      // Limpiar los campos del formulario
      Object.assign(form, {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false
      })
    } else {
      throw new Error(data.message || 'Error al enviar el mensaje')
    }
  })
  .catch(err => {
    console.error('Error enviando formulario:', err)
    sendError.value = err.message || 'Hubo un error al conectar con el servidor.'
  })
  .finally(() => {
    isSending.value = false
  })
}
</script>

<style scoped>
.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 64px;
  align-items: start;
}

.contact__info-title {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--color-navy);
  margin-bottom: 4px;
}

.contact__detail {
  margin-bottom: 24px;
}
.contact__detail-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 8px;
}

.contact__icon {
  width: 16px;
  height: 16px;
  color: var(--color-gold);
}
.contact__detail a,
.contact__detail span {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  transition: color var(--transition);
}
.contact__detail a:hover { color: var(--color-gold); }
.contact__map { margin-top: 32px; }

.contact__form { display: flex; flex-direction: column; gap: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }

.form-group label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-navy);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text);
  background: var(--color-white);
  transition: border-color var(--transition), box-shadow var(--transition);
  outline: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(201,168,76,0.15);
}

.form-group.error input,
.form-group.error textarea { border-color: #e05252; }
.form-error { font-size: 0.78rem; color: #e05252; }
.form-group--checkbox { flex-direction: row; align-items: flex-start; }
.checkbox-label {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 0.88rem;
  color: var(--color-text-muted);
  cursor: pointer;
}
.checkbox-label input { margin-top: 3px; accent-color: var(--color-gold); }
.checkbox-label a { color: var(--color-gold); text-decoration: underline; }

button[disabled] { opacity: 0.55; cursor: not-allowed; }

[dir="rtl"] .form-group input,
[dir="rtl"] .form-group select,
[dir="rtl"] .form-group textarea {
  text-align: right;
  direction: rtl;
}

/* Campos técnicos: Mantener orden de caracteres LTR pero alineación a la derecha */
[dir="rtl"] .form-group #email,
[dir="rtl"] .form-group #phone {
  direction: ltr;
  text-align: right;
}

[dir="rtl"] .form-group input::placeholder,
[dir="rtl"] .form-group textarea::placeholder {
  text-align: right;
}

@media (max-width: 900px) {
  .contact__grid { grid-template-columns: 1fr; gap: 40px; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
