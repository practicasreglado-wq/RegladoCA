<template>
  <div>
    <TheNavbar />
    <main>
      <div class="page-hero">
        <div class="container">
          <p class="page-hero__label">{{ t('nav.contact') }}</p>
          <h1 class="page-hero__title">{{ t('contact_page.hero_title') }}</h1>
        </div>
      </div>

      <section class="section section--white">
        <div class="container contact__grid">

          <!-- Info -->
          <div class="contact__info">
            <h2 class="contact__info-title">{{ t('contact_page.info_title') }}</h2>
            <span class="divider"></span>

            <div class="contact__detail">
              <span class="contact__detail-label">📞 {{ t('footer.phone_label') }}</span>
              <a href="tel:+34911462674">+34 911 462 674</a>
            </div>
            <div class="contact__detail">
              <span class="contact__detail-label">📍 {{ t('footer.office_label') }}</span>
              <span>{{ t('footer.office_address') }}</span>
            </div>
            <div class="contact__detail">
              <span class="contact__detail-label">✉️ {{ t('footer.email_label') }}</span>
              <a href="mailto:info@regladoconsultores.com">info@regladoconsultores.com</a>
            </div>

            <div class="contact__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3033.0!2d-3.627!3d40.548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMyJzUzLjAiTiAzwrAzNyc0MS4yIlc!5e0!3m2!1ses!2ses!4v1600000000000!5m2!1ses!2ses"
                width="100%"
                height="200"
                style="border:0; border-radius: 4px;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación"
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

                  <option value="subvenciones">{{ t('contact_page.subjects.subvenciones') }}</option>
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
                  <span>{{ t('contact_page.labels.privacy_prefix') }} <RouterLink to="/politica-privacidad">{{ t('contact_page.labels.privacy_link') }}</RouterLink></span>
                </label>
              </div>

              <button
                type="submit"
                class="btn btn--primary btn--lg"
                :disabled="submitted || !form.privacy"
              >
                <span v-if="!submitted">{{ t('contact_page.submit') }}</span>
                <span v-else>{{ t('contact_page.success') }}</span>
              </button>
            </form>
          </div>

        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink }    from 'vue-router'
import { useI18n }       from 'vue-i18n'
import TheNavbar         from '@/components/layout/TheNavbar.vue'
import TheFooter         from '@/components/layout/TheFooter.vue'

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

function handleSubmit() {
  validateField('name')
  validateField('email')
  validateField('message')
  if (errors.name || errors.email || errors.message) return
  // TODO: replace with your API call
  console.log('Form data:', { ...form })
  submitted.value = true
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
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 4px;
}
.contact__detail a,
.contact__detail span {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  transition: color var(--transition);
}
.contact__detail a:hover { color: var(--color-gold); }
.contact__map { margin-top: 32px; }

/* Form */
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

.form-error {
  font-size: 0.78rem;
  color: #e05252;
}

.form-group--checkbox { flex-direction: row; align-items: flex-start; }
.checkbox-label {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 0.88rem;
  color: var(--color-text-muted);
  cursor: pointer;
  text-transform: none !important;
  font-weight: 400 !important;
  letter-spacing: 0 !important;
}
.checkbox-label input { margin-top: 3px; accent-color: var(--color-gold); }
.checkbox-label a { color: var(--color-gold); text-decoration: underline; }

button[disabled] { opacity: 0.55; cursor: not-allowed; }

@media (max-width: 900px) {
  .contact__grid { grid-template-columns: 1fr; gap: 40px; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
