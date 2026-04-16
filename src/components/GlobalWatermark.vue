<template>
  <div class="global-watermark">
    <div ref="logoRef" class="global-watermark__logo"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const logoRef = ref(null)

onMounted(() => {
  if (logoRef.value) {
    gsap.to(logoRef.value, {
      rotation: 360,
      duration: 18,
      repeat: -1,
      ease: "none"
    })
  }
})
</script>

<style scoped>
.global-watermark {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0; /* Fully behind content */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0; /* Let GSAP control visibility */
  will-change: opacity;
}

.global-watermark__logo {
  width: 480px;
  max-width: 80vw;
  aspect-ratio: 1;
  background-image: url('../assets/images/REGLADO_Blanco_Symbol.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  filter: blur(0.5px); /* Optional softness */
}

@media (max-width: 768px) {
  .global-watermark__logo {
    width: 320px;
  }
}
</style>
