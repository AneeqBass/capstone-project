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
    path: '/supplements',
    name: 'supplements',
    component: () => import(/* webpackChunkName: "equipment" */ '../views/SupplementsView.vue')
  },
  {
    path: '/supplementDetail/:id',
    name: 'supplementDetail',
    component: () => import(/* webpackChunkName: "supplementDetail" */ '../views/SupplementDetailView.vue')
  },
  {
    path: '/supplementAdd/',
    name: 'supplementAdd',
    component: () => import(/* webpackChunkName: "supplementAdd" */ '../views/SupplementAddView.vue')
  },
  {
    path: '/supplementEdit/:id',
    name: 'supplementEdit',
    component: () => import(/* webpackChunkName: "supplementEdit" */ '../views/SupplementEditView.vue')
  },
  {
    path: '/equipmentDetail/:id',
    name: 'equipmentDetail',
    component: () => import(/* webpackChunkName: "equipmentDetail" */ '../views/EquipmentDetailView.vue')
  },
  {
    path: '/equipmentAdd/',
    name: 'equipmentAdd',
    component: () => import(/* webpackChunkName: "equipmentAdd" */ '../views/EquipmentAddView.vue')
  },
  {
    path: '/equipmentEdit/:id',
    name: 'equipmentEdit',
    component: () => import(/* webpackChunkName: "equipmentEdit" */ '../views/EquipmentEditView.vue')
  },
  {
    path: '/register/',
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
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/report',
    name: 'report',
    component: () => import(/* webpackChunkName: "report" */ '../views/ReportView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router