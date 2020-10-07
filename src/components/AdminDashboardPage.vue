<template>
  <div id="admin-dashboard-page" class="admin-dashboard-page flex-row align-items-start justify-content-center" v-if="loaded">
    <div class="d-flex flex-column align-items-center justify-content-center left-screen-container">
      <nav id="sidebarMenu" class="d-md-block bg-light v-sidebar" ref="sidebarMenu">
        <div class="sidebar-sticky h-100">
          <ul class="nav d-flex flex-column justify-content-center h-100">
            <div class="logo-container">
              <div class="m-auto d-flex w-85 h-100 flex-row align-items-center justify-content-between">
                <div class="image bg-white d-flex align-items-center justify-content-center">
                  <img :src="Object.values(dbWeb.Miscellaneous)[0].misc_logo.url">
                </div>
                <p class="text-center" style="font-weight: bold; font-size: 17px;">Club Santa Paula</p>
              </div>
            </div>
            <div class="nav-items-container">
              <li class="nav-item d-flex flex-row align-items-center justify-content-start">
                  <i class="icon icon-mini flaticon-dashboard"></i>
                  <a class="nav-link" @click.prevent="selectComponent('0')">
                    Dashboard
                  </a>
              </li>
              <div style="padding: 0 10px;">
                <div class="border-bottom-white"></div>
              </div>
              <li class="nav-item">
                <div class="nav-link-collapse-principal">
                  <a class="nav-link" @click="expandSidebar('listSeguridad', 'listSeguridadIcon')">
                    Seguridad
                  </a>
                  <span class="icon icon-collapse flaticon-up-chevron" ref="listSeguridadIcon" @click="expandSidebar('listSeguridad', 'listSeguridadIcon')"></span>
                </div>
                <ul class="v-collapsed-side v-collapsed-list" ref="listSeguridad">
                  <li class="nav-item">
                    <i class="icon flaticon-user"></i>
                    <a class="nav-link" href="#" @click.prevent="selectComponent('1')">
                      Perfil de Usuario
                    </a>
                  </li>
                  <li class="nav-item">
                    <i class="icon flaticon-group"></i>
                    <a class="nav-link" href="#" @click.prevent="selectComponent('2')">
                      Usuarios Registrados
                    </a>
                  </li>
                </ul>
                <div class="border-bottom-white"></div>
              </li>
              <li class="nav-item">
                <div class="nav-link-collapse-principal">
                  <a class="nav-link" @click="expandSidebar('listContenidoPrincipal', 'listContenidoPrincipalIcon')">
                    Contenido Principal
                  </a>
                  <span class="icon icon-collapse flaticon-up-chevron" ref="listContenidoPrincipalIcon" @click="expandSidebar('listContenidoPrincipal', 'listContenidoPrincipalIcon')"></span>
                </div>
                <ul class="v-collapsed-side v-collapsed-list" ref="listContenidoPrincipal">
                  <li class="nav-item">
                    <i class="icon flaticon-newspaper"></i>
                    <a class="nav-link" href="#" @click.prevent="selectComponent('3')">
                      Noticias
                    </a>
                  </li>
                  <li class="nav-item">
                    <i class="icon flaticon-jefe"></i>
                    <a class="nav-link" href="#" @click.prevent="selectComponent('4')">
                      Juntas Directivas
                    </a>
                  </li>
                  <li class="nav-item">
                    <i class="icon flaticon-apoyo-tecnico"></i>
                    <a class="nav-link" href="#" @click.prevent="selectComponent('5')">
                      Sevicios
                    </a>
                  </li>
                  <li class="nav-item">
                    <i class="icon flaticon-seleccionar"></i>
                    <a class="nav-link" href="#" @click.prevent="selectComponent('6')">
                      Equipo de Trabajo
                    </a>
                  </li>
                  <li class="nav-item">
                    <i class="icon flaticon-entrenador"></i>
                    <a class="nav-link" href="#" @click.prevent="selectComponent('7')">
                      Profesores
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('8')">
                      Comités Registrados
                    </a>
                  </li>
                </ul>
                <div class="border-bottom-white"></div>
              </li>
              <li class="nav-item">
                <div class="nav-link-collapse-principal">
                  <a class="nav-link" @click="expandSidebar('listContenidoExtra', 'listContenidoExtraIcon')">
                    Contenido Extra
                  </a>
                  <span class="icon icon-collapse flaticon-up-chevron" ref="listContenidoExtraIcon" @click="expandSidebar('listContenidoExtra', 'listContenidoExtraIcon')"></span>
                </div>
                <ul class="v-collapsed-side v-collapsed-list" ref="listContenidoExtra">
                  <li class="nav-item">
                    <i class="icon flaticon-marketing"></i>
                    <a class="nav-link" href="#" @click.prevent="selectComponent('9')">
                      Anunciantes
                    </a>
                  </li>
                  <li class="nav-item">
                    <i class="icon flaticon-corredizo"></i>
                    <a class="nav-link" href="#" @click.prevent="selectComponent('10')">
                      Banners
                    </a>
                  </li>
                  <li class="nav-item">
                    <i class="icon flaticon-archivo"></i>
                    <a class="nav-link" href="#" @click.prevent="selectComponent('11')">
                      Miscellaneous
                    </a>
                  </li>
                </ul>
                <div class="border-bottom-white"></div>
              </li>
            </div>
            <li class="nav-item v-logOut text-nowrap align-self-end">
              <a class="nav-link" @click="logOut()">Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="right-screen-container position-relative">
      <nav class="navbar sticky-top w-100 flex-md-nowrap p-2">
        <button class="navbar-toggler position-absolute d-md-none collapsed flaticon-menu" type="button" ta-toggle="collapse" data-target="sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" ia-label="Toggle navigation" @click="expandMenu($event)">
        </button>
        <div class="w-100 text-right">
          <p class="text" v-if="user.nombre !== ''"> {{user.nombre}} {{user.apellido}}</p>
          <p class="text" v-else>{{user.correo}}</p>
        </div>
      </nav>
      <div class="d-flex align-items-center justify-content-center">
        <div class="border-bottom pl-2 pr-2" style="width: calc(100% - (2 * 0.5rem)) !important"></div>
      </div>
      <main role="main" class="main-content overflow-scroll pl-2 pr-2">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2">
          <h1 class="h2">{{secTitle}}</h1>
        </div>
        <div class="border-bottom pb-2"></div>
        
        <transition name="fade-down" mode="out-in">
          <component :is="currentCompon" class="component-view mt-3"></component>
        </transition>
        
        
      </main>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import AdminDashboard from './AdminPages/AdminDashboard'
import AdminEditUser from './AdminPages/AdminEditUser'
import AdminUsers from './AdminPages/AdminUsers'
import AdminNoticias from './AdminPages/AdminNoticias'
import AdminEditJunta from './AdminPages/AdminEditJunta'
import AdminServices from './AdminPages/AdminServices'
import AdminEqWork from './AdminPages/AdminEqWork'
import AdminProfesores from './AdminPages/AdminProfesores'
import AdminComites from './AdminPages/AdminComites'
import AdminAnunciantes from './AdminPages/AdminAnunciantes'
import AdminBanners from './AdminPages/AdminBanners'
import AdminMiscellaneous from './AdminPages/AdminMiscellaneous'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

export default {
  name: 'AdminDashboardPage',
  props:[
      'AdminDashboard',
      'AdminEditUser',
      'AdminUsers',
      'AdminNoticias',
      'AdminEditJunta',
      'AdminServices',
      'AdminEqWork',
      'AdminProfesores',
      'AdminComites',
      'AdminAnunciantes',
      'AdminBanners',
      'AdminMiscellaneous',
  ],
  components:{
    AdminDashboard,
    AdminEditUser,
    AdminUsers,
    AdminNoticias,
    AdminEditJunta,
    AdminServices,
    AdminEqWork,
    AdminProfesores,
    AdminComites,
    AdminAnunciantes,
    AdminBanners,
    AdminMiscellaneous,
  },
  data(){
    return {
      loaded: false,
      allCompon: [
        'AdminDashboard',
        'AdminEditUser',
        'AdminUsers',
        'AdminNoticias',
        'AdminEditJunta',
        'AdminServices',
        'AdminEqWork',
        'AdminProfesores',
        'AdminComites',
        'AdminAnunciantes',
        'AdminBanners',
        'AdminMiscellaneous',
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
      this.$refs[`${val2}`].classList.toggle('flaticon-up-chevron');
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
    ...mapState(['user', 'dbWeb', 'secTitle']),
    ...mapGetters(['userUpdate']),

  },
  
  created(){
    try {
    let values = [];
    this.getData().then(()=>{
      const data = setInterval(() => {
          const user = firebase.auth().currentUser
        if(user){
          clearTimeout(data)
          if(this.dbWeb.Usuarios[`${user.uid}`]){
            values = {
              activo: this.dbWeb.Usuarios[`${user.uid}`].user_activo,
              apellido: this.dbWeb.Usuarios[`${user.uid}`].user_apellido,
              autori: this.dbWeb.Usuarios[`${user.uid}`].user_autori,
              cargo: this.dbWeb.Usuarios[`${user.uid}`].user_cargo,
              correo: this.dbWeb.Usuarios[`${user.uid}`].user_correo,
              correoVeri: this.dbWeb.Usuarios[`${user.uid}`].user_correoVeri,
              fotoUrl: this.dbWeb.Usuarios[`${user.uid}`].user_fotoUrl,
              id: this.dbWeb.Usuarios[`${user.uid}`].user_id,
              nombre: this.dbWeb.Usuarios[`${user.uid}`].user_nombre,
              telefono: this.dbWeb.Usuarios[`${user.uid}`].user_telefono,
              accion: this.dbWeb.Usuarios[`${user.uid}`].user_accion,
            }
  
            this.setUser(values)
            this.loaded = true;
          }else{
            
            values = {
              activo: true,
              apellido: '',
              autori: '',
              cargo: '',
              correo: user.email,
              correoVeri: user.emailVerified,
              photoUrl: '',
              id: user.uid,
              nombre: user.displayName,
              telefono: '',
              accion: '',
            }
  
            this.dbUserVal(values);
            this.loaded = true;
          }
        }
      }, 500);

    })
    }catch(err){
    }
  },

  mounted(){

    const waiting = setInterval(() => { 
      if(this.loaded === true){
        if(window.innerWidth >= 769){
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
}

</script>

<style scoped>
  .admin-dashboard-page{
    background-color: #f0f2f5;
    display: flex;
    max-height: 100vh;
    overflow: hidden;
  }

  .admin-dashboard-page .right-screen-container .navbar{
    min-height: 40px;
  }

  .admin-dashboard-page .right-screen-container .navbar .text{
    color: black !important;
    font-size: 20px;
    font-weight: 400;
  }

  .admin-dashboard-page .right-screen-container{
    width: calc(100% - 256px);

  }
  
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .admin-dashboard-page .left-screen-container{
    width: 256px;
  }

  .v-sidebar{
    height: 100vh;
    width: 100%;
    max-width: auto;
    flex-wrap: nowrap;
    background-color: rgb(0, 0, 36) !important;
  }

  .v-sidebar a, .v-sidebar i, .v-sidebar .icon{
    color: white !important;
    font-weight: 400 !important;
  }
  
  .v-sidebar .logo-container{
    height: 15% !important;
    border-bottom: 1px solid rgba(255,255,255,.4);
    -webkit-box-shadow: 0px 6px 15px -10px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 6px 15px -10px rgba(0,0,0,0.75);
    box-shadow: 0px 6px 15px -10px rgba(0,0,0,0.75);
  }

  .v-sidebar .logo-container .image{
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .v-sidebar .logo-container .image img{
    width: 60px;
    height: 40px;
  }

  .v-sidebar .nav-items-container{
    height: 70% !important;
    max-height: 70%;
    width: 100%;
    overflow: auto;
  }

  .v-sidebar .nav-items-container::-webkit-scrollbar {
    width: 5px;
  }
  .v-sidebar .nav-items-container::-webkit-scrollbar-track {
    background: transparent; 
  }
  .v-sidebar .nav-items-container::-webkit-scrollbar-thumb {
    background: rgb(201, 201, 201);
    border-radius: 5px;
  }
  .v-sidebar .nav-items-container::-webkit-scrollbar-thumb:hover {
    background: rgb(160, 160, 160); 
  }
    
  .v-sidebar .v-logOut{
    height: 15% !important;
    width: 100% !important;
    border-top: 1px solid rgba(255,255,255,.4);
    -webkit-box-shadow: 0px -6px 15px -10px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px -6px 15px -10px rgba(0,0,0,0.75);
    box-shadow: 0px -6px 15px -10px rgba(0,0,0,0.75);
  }

  .navbar-toggler{
    height: 50px;
    width: 50px;
    font-size: 30px;
    padding: 5px;
    right: 10px;
  }

  .v-sidebar .nav-items-container .nav-item{
    min-height: 80px;
    max-height: 5000px;
    padding: 0 10px 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .v-sidebar .nav-items-container .nav-item .icon.icon-mini{
    position: relative !important;
    height: 40px;
    line-height: 40px;
    min-width: 40px !important;
    width: 40px !important;
  }

  .v-sidebar .nav-items-container .nav-item .icon.icon-mini::before{
    position: absolute;
    top: 0;
    left: 7px;
    font-size: 30px;
    height: 40px;
    line-height: 40px;
    width: 40px;
  }

  .v-sidebar .nav-items-container .nav-item .nav-link::after{
    position: absolute;
    cursor: pointer;
    z-index: 60000;
    left: 0;
    top: 0;
    content: '';
    height: 80px;
    width: 100% !important;
    background-color: rgba(255,255,255,0) !important;
    transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -webkit-transition: all .2s ease;
  }

  .v-sidebar .nav-items-container .nav-item .nav-link:hover::after{
    background-color: rgba(255,255,255,0.2) !important;
  }

  .v-sidebar .nav-items-container .nav-item .nav-link-collapse-principal{
    width: 100%;
    height: 100%;
  }

  .v-sidebar .nav-items-container .nav-item .nav-link{
    display: inline-block;
    width: 100%;
    text-align: left !important;
    padding: 0 0 0 15px;
    font-size: 16px;
    font-weight: bold;
    height: 80px;
    line-height: 80px;
    white-space: nowrap;
  }

  .v-sidebar .nav-items-container .nav-item .icon.icon-collapse{
    position: absolute;
    cursor: pointer;
    right: 20px;
    height: 20px;
    line-height: 20px;
    width: 15px;
    top: 30px;
  }

  .v-sidebar .nav-items-container .nav-item .icon::before{
    position: absolute;
    height: 20px;
    line-height: 20px;
    top: 0;
    left: 0;
    font-size: 15px;
  }

  .nav-item .v-collapsed-list{
    width: 100%;
    overflow: hidden;
    max-height: 400px;
    height: auto !important;
    transition: max-height .7s ease;
  }

  .v-sidebar .nav-items-container .nav-item .v-collapsed-list .nav-item{
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .v-sidebar .nav-items-container .nav-item .v-collapsed-list .nav-item .icon{
    position: relative;
    height: 40px;
    line-height: 40px;
    min-width: 40px !important;
  }

  .v-sidebar .nav-items-container .nav-item .v-collapsed-list .nav-item .icon::before{
    position: absolute;
    top: 0;
    left: 7px;
    font-size: 30px;
    height: 40px;
    line-height: 40px;
    width: 40px;
  }

  .navbar-brand{
    width: auto;
    white-space: normal;
  }

  p{
    margin: 0;
    color: white;
  }

  .v-collapsed-side{
    max-height: 0 !important;
    height: auto !important;
    position: relative !important;
    transition: all 1s ease;
    overflow: hidden;
  }

  .main-content{
    width: 100%;
  }

  .main-content .component-view{
    height: calc(100vh - 115px);
    max-height: calc(100vh - 115px);
    overflow: scroll;
  }

  .main-content .component-view::-webkit-scrollbar {
    width: 5px;
  }
  .main-content .component-view::-webkit-scrollbar-track {
    background: transparent; 
  }
  .main-content .component-view::-webkit-scrollbar-thumb {
    background: rgb(201, 201, 201);
    border-radius: 5px;
  }
  .main-content .component-view::-webkit-scrollbar-thumb:hover {
    background: rgb(160, 160, 160); 
  }

  @media screen and (max-width: 767px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }

    .admin-dashboard-page .right-screen-container{
      width: 100vw;
    }

    .admin-dashboard-page .left-screen-container{
      position: absolute;
    }

    .v-collapsed{
      max-height: 0;
      height: auto !important;
      position: relative !important;
      transition: all 1s ease;
      overflow: hidden;
    }

    .v-sidebar{
      width: auto;
    }

    .main-content{
      margin-left: 0;
      width: 100%;
      padding: 15px;
    }
  }
</style>