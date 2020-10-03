<template>
  <div id="admin-dashboard-page" class="admin-dashboard-page" v-if="loaded">
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-3 shadow">
      <a class="navbar-brand mr-0 d-flex justify-content-center align-items-center"> 
      <i class="icon flaticon-user-1"></i> 
        <p class="ml-3" v-if="user.nombre !== ''"> {{user.nombre}} {{user.apellido}} <br> {{user.cargo}} </p>
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
        <nav id="sidebarMenu" class="d-md-block bg-light v-sidebar" ref="sidebarMenu">
          <div class="sidebar-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <div class="nav-link">
                  <i class="icon-mini flaticon-dashboard col-2 pr-1 pr-md-2"></i>
                  <a class="nav-link col-8" @click.prevent="selectComponent('0')">
                    Dashboard
                  </a>
                  <span class="col-2 pl-md-2"></span>
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-link-collapse-principal">
                  <i class="icon-mini flaticon-newspaper col-2 pr-1 pr-md-2"></i>
                  <a class="nav-link col-8" @click="expandSidebar('listSeguridad', 'listSeguridadIcon')">
                    Seguridad
                  </a>
                  <span class="icon flaticon-arrowhead-pointing-to-the-right col-2 pl-1 pl-md-2" ref="listSeguridadIcon" @click="expandSidebar('listSeguridad', 'listSeguridadIcon')"></span>
                </div>
                <ul class="v-collapsed-side v-collapsed-list" ref="listSeguridad">
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('1')">
                      Perfil de Usuario
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('2')">
                      Usuarios
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('3')">
                      Contenido Extra
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <div class="nav-link-collapse-principal">
                  <i class="icon-mini flaticon-newspaper col-2 pr-1 pr-md-2"></i>
                  <a class="nav-link col-8" @click="expandSidebar('listContenidoPrincipal', 'listContenidoPrincipalIcon')">
                    Contenido Principal
                  </a>
                  <span class="icon flaticon-arrowhead-pointing-to-the-right col-2 pl-1 pl-md-2" ref="listContenidoPrincipalIcon" @click="expandSidebar('listContenidoPrincipal', 'listContenidoPrincipalIcon')"></span>
                </div>
                <ul class="v-collapsed-side v-collapsed-list" ref="listContenidoPrincipal">
                  <li class="nav-item">
                    <div class="nav-link-collapse-principal">
                      <i class="icon-mini flaticon-newspaper col-2 pr-1 pr-md-2"></i>
                      <a class="nav-link col-8" @click="expandSidebar('listNoticias', 'listNoticiasIcon')">
                        Noticias
                      </a>
                      <span class="icon flaticon-arrowhead-pointing-to-the-right col-2 pl-1 pl-md-2" ref="listNoticiasIcon" @click="expandSidebar('listNoticias', 'listNoticiasIcon')"></span>
                    </div>
                    <ul class="v-collapsed-side v-collapsed-list" ref="listNoticias">
                      <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="selectComponent('4')">
                          Crear Noticia
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="selectComponent('5')">
                          Editar Noticia
                        </a>
                      </li>
                    </ul>
                  </li>
                   <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('6')">
                      Juntas Directivas
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('7')">
                      Sevicios
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('8')">
                      Equipo de Trabajo
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('9')">
                      Profesores
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('10')">
                      Comités Registrados
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <div class="nav-link-collapse-principal">
                  <i class="icon-mini flaticon-newspaper col-2 pr-1 pr-md-2"></i>
                  <a class="nav-link col-8" @click="expandSidebar('listContenidoExtra', 'listContenidoExtraIcon')">
                    Contenido Extra
                  </a>
                  <span class="icon flaticon-arrowhead-pointing-to-the-right col-2 pl-1 pl-md-2" ref="listContenidoExtraIcon" @click="expandSidebar('listContenidoExtra', 'listContenidoExtraIcon')"></span>
                </div>
                <ul class="v-collapsed-side v-collapsed-list" ref="listContenidoExtra">
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="selectComponent('3')">
                      Anunciantes
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" class="main-content">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 -3 border-bottom">
            <h1 class="h2">{{secTitle}}</h1>
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
import AdminDashboard from './AdminPages/AdminDashboard'
import AdminEditUser from './AdminPages/AdminEditUser'
import AdminUsers from './AdminPages/AdminUsers'
import AdminAnunciantes from './AdminPages/AdminAnunciantes'
import AdminEditContent from './AdminPages/AdminEditContent'
import AdminCreateContent from './AdminPages/AdminCreateContent'
import AdminEditJunta from './AdminPages/AdminEditJunta'
import AdminServices from './AdminPages/AdminServices'
import AdminEqWork from './AdminPages/AdminEqWork'
import AdminComites from './AdminPages/AdminComites'
import AdminProfesores from './AdminPages/AdminProfesores'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

export default {
  name: 'AdminDashboardPage',
  props:[
      'AdminDashboard',
      'AdminEditUser',
      'AdminUsers',
      'AdminAnunciantes',
      'AdminCreateContent',
      'AdminEditContent',
      'AdminEditJunta',
      'AdminServices',
      'AdminEqWork',
      'AdminProfesores',
      'AdminComites',
  ],
  components:{
    AdminDashboard,
    AdminEditUser,
    AdminUsers,
    AdminAnunciantes,
    AdminCreateContent,
    AdminEditContent,
    AdminEditJunta,
    AdminServices,
    AdminEqWork,
    AdminProfesores,
    AdminComites,
  },
  data(){
    return {
      loaded: false,
      allCompon: [
        'AdminDashboard',
        'AdminEditUser',
        'AdminUsers',
        'AdminAnunciantes',
        'AdminCreateContent',
        'AdminEditContent',
        'AdminEditJunta',
        'AdminServices',
        'AdminEqWork',
        'AdminProfesores',
        'AdminComites',
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
    ...mapState(['user', 'dbWeb','secTitle']),
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
      console.log('El error es ' + err);
    }
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
}

</script>

<style scoped>
  .admin-dashboard-page{
    background-color: #f0f2f5;;
  }

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
    width: 256px;
    max-width: auto;
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

  .nav-item .nav-link{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    width: 100%;
    padding: 8px 0;
    text-align: left !important;
    font-size: 16px;
    font-weight: bold;
    height: 60px;
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

  .main-content{
    margin-left: 250px;
    width: 100%;
    padding: 15px;
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