<template>
  <RouterView />
  <CookieBanner />
</template>

<script setup>
import { RouterView } from 'vue-router'
import CookieBanner from '@/components/layout/CookieBanner.vue'
</script>
