import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Inicio' }
  },
  {
    path: '/sobre-nosotros',
    redirect: { path: '/', hash: '#sobre-nosotros' }
  },
  {
    path: '/inspecciones-tributarias',
    redirect: { path: '/', hash: '#inspecciones-tributarias' }
  },
  {
    path: '/consultoria-juridica',
    redirect: { path: '/', hash: '#consultoria-juridica' }
  },
  {
    path: '/consultoria-tecnica',
    redirect: { path: '/', hash: '#consultoria-tecnica' }
  },
  {
    path: '/consultoria-economica',
    redirect: { path: '/', hash: '#consultoria-economica' }
  },
  {
    path: '/contacto',
    redirect: { path: '/', hash: '#contacto' }
  },
  {
    path: '/aviso-legal',
    component: () => import('@/views/legal/LegalNoticeView.vue'),
    meta: { title: 'Aviso Legal y Privacidad' }
  },
  {
    path: '/politica-cookies',
    component: () => import('@/views/legal/CookiesView.vue'),
    meta: { title: 'Política de Cookies' }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '404' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'Pagina'} - Reglado Consultores & Abogados`
})

export default router
