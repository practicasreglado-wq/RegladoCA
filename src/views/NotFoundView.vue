<template>
  <div>
    <TheNavbar />
    <main class="notfound">
      <div class="container notfound__content">
        <span class="notfound__code">404</span>
        <h1 class="notfound__title">Página no encontrada</h1>
        <p class="notfound__text">La página que busca no existe o ha sido movida.</p>
        <RouterLink to="/" class="btn btn--primary btn--lg">Volver al inicio</RouterLink>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
</script>

<style scoped>
.notfound {
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: var(--color-bg-light);
}
.notfound__content {
  text-align: center;
  padding: 80px 0;
}
.notfound__code {
  display: block;
  font-family: var(--font-heading);
  font-size: 8rem;
  font-weight: 700;
  color: var(--color-gold);
  line-height: 1;
  margin-bottom: 16px;
  opacity: 0.6;
}
.notfound__title {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-navy);
  margin-bottom: 12px;
}
.notfound__text {
  color: var(--color-text-muted);
  margin-bottom: 32px;
}
</style>
