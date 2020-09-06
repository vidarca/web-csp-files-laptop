<template>
  <div id="admin-dasboard-page" v-if="loaded">
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 mr-0 w-auto"> 
      <p> <i class="icon flaticon-user-1"></i> {{user.displayName?user.displayName:user.email}}</p></a>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" ta-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" ia-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" @click="logOut()">Cerrar sesión</a>
        </li>
      </ul>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="sidebar-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" href="#" @click.prevent="selectComponent('0')">
                  <span data-feather="home"></span>
                  DASHBOARD <span class="sr-only" >(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="selectComponent('1')">
                  <span data-feather="file"></span>
                  CREAR CONTENIDO
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="selectComponent('2')">
                  <span data-feather="shopping-cart"></span>
                  EDITAR CONTENIDO
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="selectComponent('3')">
                  <span data-feather="users"></span>
                  EDITAR USUARIO
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 -3 border-bottom">
            <h1 class="h2">Dashboard</h1>
          </div>
          
          <transition name="fade-down" mode="out-in">
            <component :is="currentCompon"></component>
          </transition>
          
          
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import AdminCreateContent from './AdminCreateContent'
import AdminEditUser from './AdminEditUser'
import AdminEditContent from './AdminEditContent'
import AdminDashboard from './AdminDashboard'

export default {
  name: 'AdminDashboardPage',
  props:[
      'AdminCreateContent',
      'AdminEditUser',
      'AdminDashboard',
      'AdminEditContent',
  ],
  components:{
    AdminCreateContent,
    AdminEditUser,
    AdminDashboard,
    AdminEditContent,
  },
  data(){
    return {
      user: null,
      loaded: false,
      allCompon: [
        'AdminDashboard',
        'AdminCreateContent',
        'AdminEditContent',
        'AdminEditUser',
      ],
      currentCompon: 'AdminDashboard'
    }
  },
  methods:{
    logOut(){
      firebase.auth().signOut().then(()=>{
        this.$router.push({name: 'Admin'})
      })
    },
    selectComponent(val){
      this.currentCompon = this.allCompon[val]
    }
  },

  computed:{
  },
  
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.user = user;
        this.loaded = true;
      }else{
        this.user = null;
      }
    })
  },
}

</script>

<style scoped>
  .navbar{
    min-height: 100px;
  }
  .navbar-toggler{
    right: 10px;
  }
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
    .sidebar{
      height: auto;
      position: initial;
    }
  }

  .sidebar{
    height: 100vh;
    position: fixed;
  }

  p{
    height: 50px;
    margin: 0;
    color: white;
    line-height: 50px;
  }

  .icon:before{
    font-size: 50px;
    line-height: 50px;
  }
</style>