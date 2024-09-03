import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/ContactView.vue')
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import(/* webpackChunkName: "equipment" */ '../views/EquipmentView.vue')
  }, 
  {
    path: '/productDetail/:id',
    name: 'productDetail',
    component: () => import(/* webpackChunkName: "productDetail" */ '../views/ProductDetailView.vue')
  },
  {
    path: '/productAdd/',
    name: 'productAdd',
    component: () => import(/* webpackChunkName: "productAdd" */ '../views/ProductAddView.vue')
  },
  {
    path: '/productEdit/:id',
    name: 'productEdit',
    component: () => import(/* webpackChunkName: "productEdit" */ '../views/ProductEditView.vue')
  },
  {
    path: '/userAdd/',
    name: 'userAdd',
    component: () => import(/* webpackChunkName: "userAdd" */ '../views/UserAddView.vue')
  },
  {
    path: '/userEdit/:id',
    name: 'userEdit',
    component: () => import(/* webpackChunkName: "userEdit" */ '../views/UserEditView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router