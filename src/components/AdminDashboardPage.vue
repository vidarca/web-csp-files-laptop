<template>
  <div id="admin-dashboard-page" class="admin-dashboard-page" v-if="loaded">
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-3 shadow">
      <a class="navbar-brand mr-0 d-flex justify-content-center align-items-center"> 
      <i class="icon flaticon-user-1"></i> 
        <p class="ml-3" v-if="user.name !== ''"> {{user.name}} {{user.apellido}} <br> {{user.cargo}} </p>
        <p class="ml-3" v-else>{{user.correo}}</p>
      </a>
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
        <nav id="sidebarMenu" class="col-md-3 col-lg-3 d-md-block bg-light v-sidebar" ref="sidebarMenu">
          <div class="sidebar-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <div class="nav-link">
                  <i class="icon-mini flaticon-dashboard col-2 pr-1 pr-md-2"></i>
                  <a class="nav-link col-8" @click.prevent="selectComponent('0')">
                    DASHBOARD
                  </a>
                  <span class="col-2 pl-md-2"></span>
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-link">
                  <i class="icon-mini flaticon-user-2 col-2 pr-1 pr-md-2"></i>
                  <a class="nav-link col-8" @click.prevent="selectComponent('3')">
                    EDITAR USUARIO
                  </a>
                  <div class="col-2 pl-md-2"></div>
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-link-collapse-principal">
                  <i class="icon-mini flaticon-newspaper col-2 pr-1 pr-md-2"></i>
                  <a class="nav-link col-8" @click="expandSidebar('listNoticias', 'listNoticiasIcon')">
                    CONTENIDO DE NOTICIAS
                  </a>
                  <span class="icon flaticon-arrowhead-pointing-to-the-right col-2 pl-1 pl-md-2" ref="listNoticiasIcon" @click="expandSidebar('listNoticias', 'listNoticiasIcon')"></span>
                </div>
                <ul class="v-collapsed-side v-collapsed-list" ref="listNoticias">
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('1')">
                      CREAR NOTICIA
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('2')">
                      EDITAR NOTICIAS
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <div class="nav-link-collapse-principal">
                  <i class="icon-mini flaticon-group col-2 pr-1 pr-md-2"></i>
                  <a class="nav-link col-8" @click="expandSidebar('listJunta', 'listJuntaIcon')">
                    JUNTA DIRECTIVA
                  </a>
                  <span class="icon flaticon-arrowhead-pointing-to-the-right col-2 pl-1 pl-md-2" ref="listJuntaIcon" @click="expandSidebar('listJunta', 'listJuntaIcon')"></span>
                </div>
                <ul class="v-collapsed-side v-collapsed-list" ref="listJunta">
                  <li class="nav-item">
                    <a class="nav-link" href="#"> <!-- @click.prevent="selectComponent('')" -->
                      JUNTA ACTUAL
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#"> <!-- @click.prevent="selectComponent('')" -->
                      JUNTAS ANTERIORES
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-9 px-md-4">
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
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

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
    ...mapMutations(['setUser', 'dbUserVal']),
    ...mapActions(['getData']),
    
    logOut(){
      firebase.auth().signOut().then(()=>{
        this.$router.push({name: 'Admin'})
      })
    },
    selectComponent(val){
      this.currentCompon = this.allCompon[val]
    },
    expandSidebar(val, val2){
      this.$refs[`${val}`].classList.toggle('v-collapsed-side');
      this.$refs[`${val2}`].classList.toggle('flaticon-arrowhead-pointing-to-the-right');
      this.$refs[`${val2}`].classList.toggle('flaticon-sort-down');
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
    ...mapState(['user', 'dbWeb']),
    ...mapGetters(['userUpdate']),

  },
  
  created(){
    let values = [];
    const data = setInterval(() => {
      const user = firebase.auth().currentUser
      if(user){
        clearTimeout(data)
        if(this.dbWeb.Usuarios_admin[`${user.uid}`]){
          values = {
            0: this.dbWeb.Usuarios_admin[`${user.uid}`].uadmin_nombre,
            1: this.dbWeb.Usuarios_admin[`${user.uid}`].uadmin_apellido,
            2: this.dbWeb.Usuarios_admin[`${user.uid}`].uadmin_cargo,
            3: this.dbWeb.Usuarios_admin[`${user.uid}`].uadmin_correoVeri,
            4: this.dbWeb.Usuarios_admin[`${user.uid}`].uadmin_correo,
            5: this.dbWeb.Usuarios_admin[`${user.uid}`].uadmin_autori,
            6: this.dbWeb.Usuarios_admin[`${user.uid}`].uadmin_fotoUrl,
            7: this.dbWeb.Usuarios_admin[`${user.uid}`].uadmin_telefono,
          }
          
          this.setUser(values)
          this.loaded = true;
        }else{
          values.push(0);
          values.push(user.uid);
          values.push(user.displayName);
          values.push(user.email);
          values.push(user.emailVerified);
          values.push(user.photoURL);
          values.push(user.phoneNumber);

          this.dbUserVal(values);
          this.loaded = true;
        }
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

  /* watch:{
    userUpdate(){
      this.dataName = this.user.displayName.split('|')
    }
  } */
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
    position: fixed;
    padding: 0 10px;
  }

  .navbar-toggler{
    height: 50px;
    width: 50px;
    font-size: 30px;
    padding: 5px;
    right: 10px;
  }

  .nav-item{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .nav-link{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 100%;
    padding: 8px 0;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }

  .nav-item .icon-mini{
    padding: 8px 0;
    font-size: 24px;
    color: black;
    text-align: right;
  }

  .nav-link-collapse-principal{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 100%;
  }

  .nav-link-collapse-principal .icon{
    padding: 0;
  }

  .nav-link-collapse-principal .icon::before{
    font-size: 15px !important;
  }

  .nav-item .v-collapsed-list{
    overflow: hidden;
    max-height: 400px;
    height: auto !important;
    transition: max-height .7s ease;
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

  .v-collapsed-side{
    max-height: 0 !important;
    height: auto !important;
    position: relative !important;
    transition: all 1s ease;
    overflow: hidden;
  }

  @media screen and (max-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
    
    .v-logOut{
      margin-right: 70px !important;
    }

    .v-collapsed{
      max-height: 0;
      height: auto !important;
      position: relative !important;
      transition: all 1s ease;
      overflow: hidden;
    }
  }
</style>