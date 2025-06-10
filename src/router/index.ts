import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/components/ModalDialog.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
