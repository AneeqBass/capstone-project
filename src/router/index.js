import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/ContactView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import(/* webpackChunkName: "equipment" */ '../views/EquipmentView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/supplements',
    name: 'supplements',
    component: () => import(/* webpackChunkName: "supplements" */ '../views/StocksView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/supplementDetail/:id',
    name: 'supplementDetail',
    component: () => import(/* webpackChunkName: "supplementDetail" */ '../views/SupplementDetailView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/supplementAdd/',
    name: 'supplementAdd',
    component: () => import(/* webpackChunkName: "supplementAdd" */ '../views/SupplementAddView.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/supplementEdit/:id',
    name: 'supplementEdit',
    component: () => import(/* webpackChunkName: "supplementEdit" */ '../views/SupplementEditView.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/register/',
    name: 'userAdd',
    component: () => import(/* webpackChunkName: "userAdd" */ '../views/UserRegisterView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/profile/',
    name: 'profile',
    component: () => import(/* webpackChunkName: "userAdd" */ '../views/UserProfile.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/userEdit/:id',
    name: 'userEdit',
    component: () => import(/* webpackChunkName: "userEdit" */ '../views/UserEditView.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminView.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/UserLoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/report',
    name: 'report',
    component: () => import(/* webpackChunkName: "report" */ '../views/ReportView.vue'),
    meta: { requiresAuth: false }
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { cookies } = useCookies();
  const currentUser = cookies.get('user');
  const role = currentUser ? currentUser.role : 'USER';

  if (to.meta.requiresAuth) {
    if (!currentUser) {
      next({ name: 'login' });
      toast.error('Please login to access this page.', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (to.meta.role && role !== to.meta.role) {
      next({ name: 'home' });
      toast.error('Access for Admins only.', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router