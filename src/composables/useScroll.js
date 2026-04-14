import { useRouter, useRoute } from 'vue-router'

export function useScroll() {
  const router = useRouter()
  const route = useRoute()

  /**
   * Smooth scrolls to an element by ID on the home page.
   * If on a different page, it navigates to home with the hash.
   */
  const scrollTo = (anchor) => {
    if (route.path === '/') {
      const el = document.getElementById(anchor)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })

        // Limpiar el hash después del scroll para evitar saltos al recargar
        setTimeout(() => {
          window.history.replaceState(null, null, window.location.pathname)
        }, 700)
      }
    } else {
      router.push({ path: '/', hash: `#${anchor}` })
    }
  }

  /**
   * Scrolls to the top of the page and clears any hash.
   */
  const scrollToTop = () => {
    if (route.path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })

      // Limpiar cualquier hash existente
      if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname)
      }
    } else {
      router.push('/')
    }
  }

  return { scrollTo, scrollToTop }
}
