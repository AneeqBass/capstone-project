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
    path: '/stocks',
    name: 'stocks',
    component: () => import(/* webpackChunkName: "stocks" */ '../views/StocksView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/stockDetail/:id',
    name: 'stockDetail',
    component: () => import(/* webpackChunkName: "stockDetail" */ '../views/StockDetailView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/stockAdd/',
    name: 'stockAdd',
    component: () => import(/* webpackChunkName: "stockAdd" */ '../views/StockAddView.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/stockEdit/:id',
    name: 'stockEdit',
    component: () => import(/* webpackChunkName: "stockEdit" */ '../views/StockEditView.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/checkout/:id',
    name: 'checkout',
    component: () => import(/* webpackChunkName: "checkout" */ '../views/CheckoutView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/orderDetail/:id',
    name: 'orderDetail',
    component: () => import(/* webpackChunkName: "orderDetail" */ '../views/OrderDetailsView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/orderEdit/:id',
    name: 'orderEdit',
    component: () => import(/* webpackChunkName: "orderEdit" */ '../views/OrderEditView.vue'),
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
    component: () => import(/* webpackChunkName: "admin" */ '../views/ReportView.vue'),
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
    meta: { requiresAuth: true }
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { cookies } = useCookies();
  const authToken = cookies.get('authToken')
  const currentUser = cookies.get('user');
  const role = currentUser ? currentUser.role : 'USER';

  if (to.meta.requiresAuth) {
    if (!authToken) {
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