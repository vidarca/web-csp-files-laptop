<template>
  <div id="admin-dashboard-page" class="admin-dashboard-page" v-if="loaded">
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-3 shadow">
      <a class="navbar-brand mr-0 d-flex justify-content-center align-items-center"> 
      <i class="icon flaticon-user-1"></i> <p class="ml-3"> {{user.displayName.split('|')[0]}} {{user.displayName.split('|')[1]}} <br> {{user.displayName.split('|')[2]}} </p></a>
      <button class="navbar-toggler position-absolute d-md-none collapsed flaticon-menu" type="button" ta-toggle="collapse" data-target="sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" ia-label="Toggle navigation" @click="expandMenu($event)">
      </button>
      <ul class="navbar-nav px-3 v-logOut">
        <li class="nav-item text-nowrap">
          <a class="nav-link" @click="logOut()">Cerrar sesión</a>
        </li>
      </ul>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light v-sidebar" ref="sidebarMenu">
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
import {mapState, mapMutations, mapGetters} from 'vuex'

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
      loaded: false,
      allCompon: [
        'AdminDashboard',
        'AdminCreateContent',
        'AdminEditContent',
        'AdminEditUser',
      ],
      currentCompon: 'AdminDashboard',
      dataName: [],
    }
  },
  methods:{
    ...mapMutations(['setUser', 'updateUser']),
    logOut(){
      firebase.auth().signOut().then(()=>{
        this.$router.push({name: 'Admin'})
      })
    },
    selectComponent(val){
      this.currentCompon = this.allCompon[val]
    },
    expandMenu(event){
      const refVal = event.target.getAttribute('data-target')

      if(event.target.getAttribute('data-collapsed') === null){
        event.target.setAttribute('data-collapsed', 'true')
      }
      
      let isCollapse = event.target.getAttribute('data-collapsed')

      if(isCollapse === 'true'){
        this.$refs[`${refVal}`].style.maxHeight = '400px'
        event.target.setAttribute('data-collapsed', 'false')
      }else{
        this.$refs[`${refVal}`].style.maxHeight = '0px'
        event.target.setAttribute('data-collapsed', 'true')
      }
    }
  },

  computed:{
    ...mapState(['user']),
    ...mapGetters(['userUpdate'])

  },
  
  created(){
    const data = setInterval(() => {
      const user = firebase.auth().currentUser
        if(user){
          this.setUser(user);
          this.dataName = user.displayName?user.displayName.split('|'):user.email
          this.loaded = true;
          clearTimeout(data)
        }
    }, 500);
  },

  mounted(){

    const waiting = setInterval(() => { 
      if(this.loaded === true){
        if(window.innerWidth >= 768){
          this.$refs.sidebarMenu.classList.remove('v-collapsed')
        }else{
          this.$refs.sidebarMenu.classList.add('v-collapsed')
        }
        
        clearTimeout(waiting)
      }else {
        console.log('Aun no carga');
      }
    }, 500);

    window.addEventListener('resize', ()=>{
      if(window.innerWidth >= 768){
        try {
          this.$refs.sidebarMenu.classList.remove('v-collapsed')
          this.$refs.sidebarMenu.style.maxHeight = 'none'
        }
        catch(e){}
      }else{
        try {
          this.$refs.sidebarMenu.classList.add('v-collapsed')
          if(this.$refs.sidebarMenu.style.maxHeight === 'none'){
            this.$refs.sidebarMenu.style.maxHeight = '0'
          }
        }
        catch(e){}
      }
    })   
  },

  watch:{
    userUpdate(){
      this.dataName = this.user.displayName.split('|')
    }
  }
}

</script>

<style scoped>
  .navbar{
    min-height: 100px;
  }
  
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .v-sidebar{
    height: 760px;
    position: relative;
  }

  .navbar-toggler{
    height: 50px;
    width: 50px;
    font-size: 30px;
    padding: 5px;
    right: 10px;
  }

  .navbar-brand{
    width: auto;
    white-space: normal;
  }

  p{
    margin: 0;
    color: white;
  }

  .icon:before{
    font-size: 50px;
  }

  @media screen and (max-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
    
    .v-logOut{
      margin-right: 70px !important;
    }

    .v-collapsed{
      max-height: 0 ;
      height: auto !important;
      position: relative !important;
      transition: all 1s ease;
      overflow: hidden;
    }
  }
</style>