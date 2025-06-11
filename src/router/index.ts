import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DashBoard from '@/pages/DashBoard.vue' 

const routes = [
  {
    path: '/',
    component: DefaultLayout, 
    children: [
       {
        path: '',
        redirect: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashBoard
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
