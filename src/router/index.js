import firebase from 'firebase'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Nosotros from '../views/Nosotros.vue'
import Servicios from '../views/Servicios.vue'
import Socios from '../views/Socios.vue'
import Contacto from '../views/Contacto.vue'
import Comites from '../views/Comites.vue'
import Actualidad from '../views/Actualidad.vue'
import Admin from '../views/Admin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import errPage from '../views/errPage.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    component: Nosotros
  },
  {
    path: '/servicios',
    name: 'Servicios',
    component: Servicios
  },
  {
    path: '/socios',
    name: 'Socios',
    component: Socios
  },
  {
    path: '/actualidad',
    name: 'Actualidad',
    component: Actualidad
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: Contacto
  },
  {
    path: '/comites',
    name: 'Comites',
    component: Comites
  },
  {
    path: '/v-admin/',
    component: Admin,
    name: 'Admin',
  },
  {
    path: '/v-admin/admin-dashboard/',
    component: AdminDashboard,
    name: 'AdminDashboard',
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: "*",
    component: errPage
  }
  
];

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) =>{
  if(to.matched.some(ruta => ruta.meta.requiresAuth)){
    const user = firebase.auth().currentUser;
    if(user){
      next();
    }else{
      next({
        name: 'Admin',
      });
    }
  }else{
    next();
  }
})

export default router

